@extends('welcome')

@section('title', 'Dados cadastrais')

@section('content')
    <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Dados cadastrais</h4>

        <form action="{{ route('storeData') }}" class="needs-validation" method="POST" novalidate>
            @csrf
            <div class="row g-3">
                <div class="col-12">
                    <label for="name" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="" value="" required />
                    <div class="invalid-feedback">
                        É necessário um nome válido.
                    </div>
                </div>

                <div class="col-12">
                    <label for="username" class="form-label">Login</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text">@</span>
                        <input type="text" class="form-control" id="username" name="username"  placeholder="Username" required />
                        <div class="invalid-feedback">
                            Seu nome de usuário é obrigatório.
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <label for="email" class="form-label">Email <span
                            class="text-body-secondary">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" name="email" />
                    <div class="invalid-feedback">
                        Insira um endereço de e-mail válido para atualizações de envio.
                    </div>
                </div>


                <div class="col-md-6">
                    <label for="docid" class="form-label">CPF</label>
                    <input type="text" class="form-control cpfMask" id="docid" name="docid" />
                </div>

                <div class="col-md-6">
                    <label for="mobile" class="form-label">Celular<span
                            class="text-body-secondary"></span></label>
                    <input type="text" class="form-control cellphoneMask" id="mobile" name="mobile" />
                </div>

                <div class="col-md-6">
                    <label for="zipcode" class="form-label">CEP</label>
                    <div class="input-group has-validation">
                        <input type="text" class="form-control cepMask" id="zipcode" name="zipcode" placeholder="" required />
                        <span class="input-group-text"><i class="fa fa-search getCEP" zip-prefix="" zip-control=""></i></span>
                        <div class="invalid-feedback">
                            Seu nome de usuário é obrigatório.
                        </div>
                    </div>
                    <div class="invalid-feedback">
                        CEP válido
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="address" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="address" name="address"  required />
                    <div class="invalid-feedback">
                        Favor inserir seu endereço de entrega.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="number" class="form-label">Número</label>
                    <input type="text" class="form-control" id="number" name="number" />
                </div>

                <div class="col-md-6">
                    <label for="complement" class="form-label">Complemento<span
                            class="text-body-secondary">(Opcional)</span></label>
                    <input type="text" class="form-control" id="complement" name="complement" placeholder="casa ou apartamento" />
                </div>

                <div class="col-md-6">
                    <label for="district" class="form-label">Bairro</label>
                    <input type="text" class="form-control" id="district" name="district" require />
                    <div class="invalid-feedback">
                        Informe um Bairro válido.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="city" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="city" name="city" />
                    <div class="invalid-feedback">
                        Informe uma Cidade válida.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="state" class="form-label">Estado</label>
                    <input type="text" class="form-control" id="state" name="state" />
                    <div class="invalid-feedback">
                        Informe uma UF válida.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="country" class="form-label">País</label>
                    <input type="text" class="form-control" id="country" name="country" />
                    <div class="invalid-feedback">
                        Informe um País válido.
                    </div>
                </div>
            </div>

            <hr class="my-4">

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="same-address" name="same_address" />
                <label class="form-check-label" for="same-address">O endereço de entrega é igual ao meu endereço de
                    cobrança</label>
            </div>

            <hr class="my-4">

            <button class="w-100 btn btn-primary btn-lg" type="submit">Continue para finalizar compra</button>
        </form>
    </div>
@endsection
