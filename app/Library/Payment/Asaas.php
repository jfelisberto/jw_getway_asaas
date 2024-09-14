<?php

namespace App\Library\Payment;

use App\Models\ApiLogs;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Log;

class Asaas
{
    private $endpoint;
    private $method = 'get';
    private $url;
    private $sk_key;
    private $origin_id;
    private $origin_type;

    public function __construct()
    {
        $this->url = env('ASAAS_URL');
        $this->sk_key = env('ASAAS_API_KEY');
    }

    protected function setMethod($method)
    {
        $this->method = $method;
    }

    protected function setEndpoint($endpoint)
    {
        $this->endpoint = $endpoint;
    }

    protected function setOriginId($origin_id)
    {
        $this->origin_id = $origin_id;
    }

    protected function setOriginType($origin_type)
    {
        $this->origin_type = $origin_type;
    }

    protected function callWs($data = [])
    {
        $log['origin_id'] = $this->origin_id;
        $log['origin_type'] = $this->origin_type;
        $log['api_name'] = 'asaas';
        $log['payload'] = json_encode($data);
        $log['endpoint'] = $this->url . $this->endpoint;

        try {
            $payload = $data;

            $method = $this->method;

            $guzzleClient = new Client();

            $guzzleData = [
                'headers'      => [
                    'accept' => 'application/json',
                    'access_token' => $this->sk_key,
                    'content-type' => 'application/json',
                ],
                'curl.options' => [
                    'CURLOPT_SSLVERSION' => 'CURL_SSLVERSION_TLSv1_3',
                ]
            ];

            if ($method <> 'GET' && $data) {
                $guzzleData['body'] = json_encode($data);
            }

            $response = $guzzleClient->$method($this->url . $this->endpoint, $guzzleData);
            // $response = $guzzleClient->$method($this->url . $this->endpoint, [
            //     'headers'      => [
            //         'accept' => 'application/json',
            //         'access_token' => $this->sk_key,
            //         'content-type' => 'application/json',
            //     ],
            //     'curl.options' => [
            //         'CURLOPT_SSLVERSION' => 'CURL_SSLVERSION_TLSv1_3',
            //     ],
            //     'body'         => json_encode($data),
            // ]);

            $status = 'SUCCESS';

            $response = json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {

            if (!empty($e->getResponse())) {
                $response = json_decode($e->getResponse()->getBody(true), true);

                if (is_null($response)) {
                    $response = $e->getResponse()->getReasonPhrase();
                }

            } else {
                $response = $e->getMessage();
            }

            $status = 'ERROR';

        } catch (Exception $e) {
            $response = $e->getMessage();

            $status = 'ERROR';

            if ($e->getCode() >= 500) {
                Log::error(['arquivo' => $e->getFile(), 'erro' => $e->getMessage(), 'linha' => $e->getLine(), 'payload' => $data, 'response' => $response, 'trace' => $e->getTraceAsString()]);
            }
        }

        $log['response'] = json_encode($response);
        $log['status'] = $status;

        $api_logs = ApiLogs::create($log);

        $return = (object) [
            'status'    => $status,
            'response'  => (object) $response
        ];

        return $return;
    }
}
