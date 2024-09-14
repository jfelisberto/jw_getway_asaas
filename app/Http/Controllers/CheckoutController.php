<?php

namespace App\Http\Controllers;

use App\Components\FlashMessages;
use App\Http\Controllers\Controller;
use App\Library\Payment\Asaas\Charge;
use App\Library\Payment\Asaas\Customer;
use App\Models\People;
use App\Models\PeopleCredit;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    use FlashMessages;

    public function storeData(Request $request)
    {

        $data = [
            'name'         => $request->name,
            'username'     => $request->username,
            'email'        => $request->email,
            'docid'        => $request->docid,
            'mobile'       => $request->mobile,
            'same_address' => $request->same_address,
            'zipcode'      => $request->zipcode,
            'address'      => $request->address,
            'number'       => $request->number,
            'complement'   => $request->complement,
            'district'     => $request->district,
            'city'         => $request->city,
            'state'        => $request->state,
            'country'      => $request->country,
        ];

        $people = People::create($data);

        $customer = new Customer();
        $customerData = $customer->getIDcustomer($people->id);

        return view('pages.form_paymentmethod', [
            'people'        => $people,
            'customerData'  => $customerData,
            'cart'          => true,
            'month'         => Carbon::now()->format('m'),
            'year'          => Carbon::now()->format('Y')
        ]);
    }

    public function storePayment(Request $request)
    {
        $charge = new Charge();
        $people = People::where('customer_id', $request->customer_id)
            ->first();

        if ($request->paymentMethod == 'BOLETO') {
            $paymentDate = Carbon::now()->addDays(7)->format('Y-m-d');
            $charge->paymentInterest = 2;
            $charge->paymentFine = "3,75";
        } elseif ($request->paymentMethod == 'PIX') {
            $paymentDate = Carbon::now()->addDays(1)->format('Y-m-d');
        } else {
            $paymentDate = Carbon::now()->format('Y-m-d');
            $charge->paymentInstallmentCount = $request->cc_installment_count;

            $creditcard_token = PeopleCredit::where('people_id', $people->id)
                ->where('customer_id', $request->customer_id)
                ->where('status', 'active')
                ->select('creditcard_token')
                ->first();

            $charge->cardToken = null;
            if (isset($creditcard_token) && !empty($creditcard_token)) {
                $charge->cardToken = $creditcard_token->creditcard_token;
            }
        }

        $charge->people = $people;
        $charge->customer = $request->customer_id;
        $charge->cardName = $request->cc_name;
        $charge->cardNumber = str_replace(' ', '', $request->cc_number);
        $charge->cardExpirationMonth = $request->cc_expiration_month;
        $charge->cardExpirationYear = $request->cc_expiration_year;
        $charge->cardCvv = $request->cc_cvv;
        $charge->paymentDescription = "Pedido ALFA01";
        $charge->paymentDate = $paymentDate;
        $charge->paymentValue = $request->value;
        $charge->paymentMethod = $request->paymentMethod;

        $payment = $charge->set_charge();

        return view('pages.tanks', [
            'payment'       => $payment->response,
            'status'        => $payment->status,
            'paymentMethod' => $request->paymentMethod,
            'cart'          => false
        ]);

    }
}
