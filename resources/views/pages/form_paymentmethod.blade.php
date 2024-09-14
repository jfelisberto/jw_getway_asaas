@extends('welcome')

@section('title', 'Meio de pagamento')

@section('content')
    <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Dados do pagamento</h4>

        <form action="{{ route('storePayment') }}" class="needs-validation" method="POST" novalidate>
            @csrf
            <input type="hidden" id="customer_id" name="customer_id" value="{{ $customerData }}" />
            <input type="hidden" id="value" name="value" value="123.88" />
            <hr class="my-4">

            <div class="my-3">
                <div class="form-check">
                    <input id="credit" name="paymentMethod" type="radio" class="form-check-input paymentMethod" value="CREDIT_CARD" required />
                    <label class="form-check-label" for="credit" data-target="paymentMethodCard">
                        <i class="fa-solid fa-credit-card"></i> Cartão de Crédito
                    </label>
                </div>

                <div class="form-check">
                    <input id="boleto" name="paymentMethod" type="radio" class="form-check-input paymentMethod" value="BOLETO" required />
                    <label class="form-check-label" for="boleto" data-target="paymentMethodBillet">
                        <i class="fa-solid fa-barcode"></i> Boleto
                    </label>
                </div>

                <div class="form-check">
                    <input id="pix" name="paymentMethod" type="radio" class="form-check-input paymentMethod" value="PIX" required />
                    <label class="form-check-label" for="pix" data-target="paymentMethodPix">
                        <i class="fa-brands fa-pix"></i> Pix
                    </label>
                </div>
            </div>

            <div class="my-4"><div class="col-md-6"></div></div>

            <div id="paymentMethodCard" class="collapse">
                <div class="col-md-6">
                    <label for="cc-name" class="form-label">Condições de pagamento</label>
                    <select class="form-control" id="cc-installment-count" name="cc_installment_count">
                        <option value="1">1x R$123,88</option>
                        <option value="2">2x R$61,94</option>
                        <option value="3">3x R$41,29</option>
                        <option value="4">4x R$30,97</option>
                        <option value="5">5x R$24,77</option>
                        <option value="6">6x R$20,64</option>
                        <option value="7">7x R$17,69</option>
                        <option value="8">8x R$15,48</option>
                        <option value="9">9x R$13,76</option>
                        <option value="10">10x R$12,38</option>
                        <option value="11">11x R$11,26</option>
                        <option value="12">12x R$10,32</option>
                    </select>
                    <small class="text-body-secondary">A vista ou Parcelamento</small>
                    <div class="invalid-feedback">
                        A Condição de Pagamento é obrigatória
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="cc-name" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="cc-name" name="cc_name" placeholder="" />
                    <small class="text-body-secondary">Nome completo conforme exibido no cartão</small>
                    <div class="invalid-feedback">
                        O nome no cartão é obrigatório
                    </div>
                </div>

                <div class="col-md-6">
                    {{-- 5184019740373151 (Mastercard) ou 4916561358240741 (Visa) --}}
                    <label for="cc-number" class="form-label">Número do cartão de crédito</label>
                    <input type="text" class="form-control" id="cc-number" name="cc_number" placeholder="" />
                    <div class="invalid-feedback">
                        O número do cartão de crédito é obrigatório
                    </div>
                </div>

                <div class="col-md-3">
                    <label for="cc-expiration" class="form-label">Expiração</label>
                    <div class="row">
                        <div class="col-6">
                            <input type="text" class="form-control" id="cc-expiration-month" name="cc_expiration_month" maxlength="2" placeholder="{{ $month }}" />
                            <div class="invalid-feedback">
                                Mês de validade necessário
                            </div>
                        </div>
                        <div class="col-6">
                            <input type="text" class="form-control" id="cc-expiration-year" name="cc_expiration_year" maxlength="4" placeholder="{{ $year }}" />
                            <div class="invalid-feedback">
                                Ano de validade necessário
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" name="cc_cvv" placeholder="" />
                    <div class="invalid-feedback">
                        Código de segurança obrigatório
                    </div>
                </div>
            </div>

            <div id="paymentMethodBillet" class="collapse">
                <div class="col-md-6">
                    Você esta pagando com BOLETO
                </div>
            </div>

            <div id="paymentMethodPix" class="collapse">
                <div class="col-md-6">
                    Você esta pagando com PIX
                </div>
            </div>


            <hr class="my-4">

            <button class="w-100 btn btn-primary btn-lg" type="submit">Continue para finalizar compra</button>
        </form>
    </div>
@endsection
