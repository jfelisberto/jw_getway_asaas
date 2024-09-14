@extends('welcome')

@section('title', 'Obrigado!')

@section('content')
    <div class="row">
        <div class="col">
            @if($status == 'SUCCESS')
            <h4 class="mb-3">Obrigado por comprar conosco.</h4>
            @endif

            @if($paymentMethod == 'BOLETO')
            <a href="{{ $payment->link }}" class="btn btn-sm btn-primary" target="_blanck">Acesse aqui o seu boleto</a>
            @endif

            @if($paymentMethod == 'PIX')
            <div class="row">
                <div class="col-md-6">
                    <img src="data:image/jpeg;base64, {{ $payment->encoded_image }}" height="160px" width="160px" />
                </div>
                <div class="col-md-6">
                    Acesse seu APP de pagamentos e faça a leitura do QR Code ao lado para efetuar o pagamento de forma rápida e segura.
                </div>
            </div>

            <h5>Código Pix Copia e Cola</h5>
            <div class="row">
                <div class="col-md-6">{{ $payment->payload }}</div>
            </div>
            @endif

            @if($paymentMethod == 'CREDIT_CARD')
                @if($status == 'ERROR')
                <h4>Houve um erro ao processar sua transação</h4>
                <div class="row">
                    <div class="col-6 text-danger">
                        {{ $payment->description }}
                    </div>
                </div>
                @endif
            @endif

        </div>
    </div>

    <div class="row">
        <div class="col">&nbsp;</div>
    </div>

    <div class="row">
        <div class="col text-center">
            @if($status == 'SUCCESS')
            <a href="{{ route('home') }}" class="btn btn-sm btn-secondary">Voltar</a>
            @else
            <a href="javascript:void(0)" onClick="history.go(-1); return false;" class="btn btn-sm btn-secondary">Voltar</a>
            @endif
        </div>
    </div>
@endsection
