<?php

namespace App\Library\Payment\Asaas;

use App\Library\Payment\Asaas;
use App\Models\InvoiceCharge;
use App\Models\People;
use App\Models\PeopleCredit;

class Charge extends Asaas
{
    public $customer;
    public $cardName;
    public $cardNumber;
    public $cardExpirationMonth;
    public $cardExpirationYear;
    public $cardCvv;
    public $cardToken;
    public $paymentDate;
    public $paymentDescription;
    public $paymentFine;
    public $paymentInterest;
    public $paymentInstallmentCount;
    public $paymentInstallmentValue;
    public $paymentMethod;
    public $paymentValue;
    public $people;

    public function __construct()
    {
        parent::__construct();
    }

    public function set_charge()
    {
        $this->setEndpoint('payments');
        $this->setMethod('POST');
        $this->setOriginId($this->people->id);
        $this->setOriginType('charge');

        $charge_body = [
            "customer"          => $this->customer,
            "billingType"       => $this->paymentMethod,
            "value"             => $this->paymentValue,
            "dueDate"           => $this->paymentDate,
            "description"       => $this->paymentDescription,
            "externalReference" => $this->customer,
        ];

        if ($this->paymentMethod == 'BOLETO') {
            $charge_body["interest"] = ["value" => $this->paymentInterest];
            $charge_body["fine"] = ["value" => $this->paymentFine];
        }

        if ($this->paymentMethod == 'CREDIT_CARD') {
            if (isset($this->paymentInstallmentCount) && $this->paymentInstallmentCount >= 2) {
                $charge_body["installmentCount"] = $this->paymentInstallmentCount;
                $charge_body["installmentValue"] = ($this->paymentValue / $this->paymentInstallmentCount);
            }

            if (isset($this->cardToken) && !empty($this->cardToken)) {
                $charge_body["creditCardToken"] = $this->cardToken;
            } else {

                $charge_body["creditCard"] = [
                    "holderName"  => $this->cardName,
                    "number"      => $this->cardNumber,
                    "expiryMonth" => $this->cardExpirationMonth,
                    "expiryYear"  => $this->cardExpirationYear,
                    "ccv"         => $this->cardCvv,
                ];
                $charge_body["creditCardHolderInfo"] = [
                    "name"          => $this->people->name,
                    "email"         => $this->people->email,
                    "cpfCnpj"       => $this->people->docid,
                    "postalCode"    => $this->people->zipcode,
                    "addressNumber" => $this->people->number,
                    "phone"         => $this->people->mobile,
                ];
            }

        }

        $result = $this->callWs($charge_body);

        $status = $result->status;

        if ($status == 'SUCCESS') {

            $nosso_numero = $result->response->nossoNumero;
            $bank_slip_url = $result->response->bankSlipUrl;

            if ($this->paymentMethod == 'PIX') {

                $this->setEndpoint("payments/{$result->response->id}/pixQrCode");
                $this->setMethod('GET');
                $this->setOriginType('pixQrCode');
                $pix_qrcode = $this->callWs();

                if ($pix_qrcode->status == 'SUCCESS') {
                    $bank_slip_url = $pix_qrcode->response->encodedImage;
                    $nosso_numero = $pix_qrcode->response->payload;
                }
            }

            if ($this->paymentMethod == 'CREDIT_CARD') {
                $bank_slip_url = $result->response->transactionReceiptUrl;

                if (empty($this->cardToken)) {
                    $people_credit_data = [
                        'people_id' => $this->people->id,
                        'customer_id'=> $this->customer,
                        'status' => 'active',
                        'creditcard_token' => $result->response->creditCard['creditCardToken'],
                        'card_holder_name'=> $this->cardName,
                        'first_six'=> substr($this->cardNumber, 0, 6),
                        'last_four'=> substr($this->cardNumber, -4),
                        'expiration_month'=> $this->cardExpirationMonth,
                        'expiration_year'=> $this->cardExpirationYear,
                        'security_code'=> $this->cardCvv
                    ];

                    $people_credit = PeopleCredit::create($people_credit_data);
                }
            }

            $charge = [
                'charge'              => $result->response->id,
                'payment_method'      => $result->response->billingType,
                'date_created'        => $result->response->dateCreated,
                'people_id'           => $this->people->id,
                'customer'            => $result->response->customer,
                'payment_link'        => $result->response->paymentLink,
                'value'               => $result->response->value,
                'net_value'           => $result->response->netValue,
                'status'              => $result->response->status,
                'due_date'            => $result->response->dueDate,
                'original_due_date'   => $result->response->originalDueDate,
                'payment_date'        => $result->response->paymentDate,
                'client_payment_date' => $result->response->clientPaymentDate,
                'installment_number'  => $result->response->installmentNumber,
                'invoice_number'      => $result->response->invoiceNumber,
                'invoice_url'         => $result->response->invoiceUrl,
                'nosso_numero'        => $nosso_numero,
                'bank_slip_url'       => $bank_slip_url,
            ];
            $invoice = InvoiceCharge::create($charge);

            if ($this->paymentMethod == 'BOLETO') {
                $result = (object) [
                    'link' => $result->response->bankSlipUrl,
                ];
            }

            if ($this->paymentMethod == 'PIX') {
                $result = (object) [
                    'encoded_image'   => $pix_qrcode->response->encodedImage,
                    'payload'         => $pix_qrcode->response->payload,
                    'expiration_date' => $pix_qrcode->response->expirationDate,
                ];
            }

            if ($this->paymentMethod == 'CREDIT_CARD') {
                $result = $result->response->transactionReceiptUrl;
            }

        } else {
            if ($this->paymentMethod == 'CREDIT_CARD') {
                $description = '';

                foreach ($result->response->errors as $key => $value) {
                    if ($value['description']) {
                        $description .= "{$value['description']}\n";
                    }
                }

                $result = (object) [
                    'description' => $description
                ];
            }
        }

        return (object) [
            'response' => $result,
            'status'   => $status,
        ];
    }

}
