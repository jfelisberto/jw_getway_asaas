// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

$(document).ready(function () {

    $(document).on('click', '.form-check-label', function () {
        let target = $(this).attr('data-target');

        if (target == 'paymentMethodCard') {
            $('#cc-brand').attr('required', true);
            $('#cc-name').attr('required', true);
            $('#cc-number').attr('required', true);
            $('#cc-expiration-month').attr('required', true);
            $('#cc-expiration-year').attr('required', true);
            $('#cc-cvv').attr('required', true);
        } else {
            $('#cc-brand').removeAttr('required');
            $('#cc-name').removeAttr('required');
            $('#cc-number').removeAttr('required');
            $('#cc-expiration-month').removeAttr('required');
            $('#cc-expiration-year').removeAttr('required');
            $('#cc-cvv').removeAttr('required');
        }
        $('.collapse').hide();
        $('#' + target + '.collapse').show();
    });
});
