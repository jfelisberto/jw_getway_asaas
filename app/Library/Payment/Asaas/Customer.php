<?php

namespace App\Library\Payment\Asaas;

use App\Library\Payment\Asaas;
use App\Models\People;
class Customer extends Asaas
{
    protected $name;
    protected $email;
    protected $address;
    public $customer;

    public function __construct()
    {
        parent::__construct();
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * NOTE: Obtem o ID do cliente
     */

    public function getCustomer($id)
    {
        $customer = People::find($id);
        $this->customer = $customer;
    }

    public function getIDcustomer($id)
    {
        $this->getCustomer($id);

        if (isset($this->customer)) {
            if (isset($this->customer['customer_id'])) {
                return $this->customer['customer_id'];
            } else {
                $customer = $this->createCustomer();

                if (isset($customer->status) && $customer->status == 'ERROR') {
                    return $customer;
                }

                if (isset($customer->response) && !empty($customer->response->id)) {
                    return $customer->response->id;
                }
            }
        }

        return false;
    }

    public function createCustomer()
    {

        $this->setEndpoint('customers');
        $this->setMethod('POST');
        $this->setOriginId($this->customer->id);
        $this->setOriginType('people');
        $message = '';

        $data = [
            'name'              => $this->customer->name,
            'cpfCnpj'           => $this->customer->docid,
            'email'             => $this->customer->email,
            'phone'             => $this->customer->mobile,
            'mobilePhone'       => $this->customer->mobile,
            'address'           => $this->customer->address,
            'addressNumber'     => $this->customer->number,
            'complement'        => $this->customer->complement,
            'province'          => $this->customer->district,
            'postalCode'        => $this->customer->zipcode,
            'externalReference' => $this->customer->id,
        ];

        $result = $this->callWs($data);
        if ($result->status == 'SUCCESS') {
            if(isset($result->response) && !empty($result->response->id)) {
                $people = People::find($this->customer->id);
                $people->customer_id = $result->response->id;
                $people->save();
            }
        }
        return $result;
    }
}
