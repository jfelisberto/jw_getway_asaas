/*
 * Copyright (C) 2020  JEFWeb  <julianoeloi1@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
(function ($) {
    $.unserialize = function (serializedString) {
        var str = decodeURI(serializedString);
        var pairs = str.split('&');
        var obj = {}, p, idx, val;
        for (var i = 0, n = pairs.length; i < n; i++) {
            p = pairs[i].split('=');
            idx = p[0];

            if (idx.indexOf("[]") == (idx.length - 2)) {
                // Eh um vetor
                var ind = idx.substring(0, idx.length - 2)
                if (obj[ind] === undefined) {
                    obj[ind] = [];
                }
                obj[ind].push(p[1]);
            }
            else {
                obj[idx] = p[1];
            }
        }
        return obj;
    };
})(jQuery);

/*
 * Variaveis
 */
var address, array, classCSS, checklist, content, control, data, exitAfterSave, field, fieldID, form, functionName, id, newAfterSave, options, page, pageTitle, pre_text, ref, rowid, text, url, userid, value, zipControl; // text variables
var count, exito, margin, percent, price, price_min, price_org, qtd, result, sum, sumMG, sumPC, sumTT, total, valor = 0; // numeric variables

// Variaveis para maskMoney - passalas como configuracao no modulo lyosolutions
var prefix = 'R$ ';
var thousands = '.';
var decimal = ',';
var precision = 2;
var allowNegative = true;

var translate = new Array();
translate["confirmButtonText"] = "OK";
translate["cancelButtonText"] = "Cancelar";
translate["titles_error"] = "Erro";
translate["titles_success"] = "Sucesso";
translate["titles_warning"] = "Cuidado";
translate["label_yes"] = "Sim";
translate["label_no"] = "Não";
translate["global_neterror"] = "Houve um erro de rede durante o processamento da sua solicitação.";
translate["error_fill_filed"] = "Todos os campos devem ser preenchidos.";
translate["error_formsubmit"] = "Houve um erro ao processar seu formulário.";
translate["login_error"] = "Houve um erro ao processar seu login.";
translate["save_error"] = "Houve um erro ao salvar seus dados.";
translate["txt_pwdSuccess"] = "E-mail de recuperação de senha enviado com sucesso.<br />Por favor, verifique sua caixa de entrada para obter instruções.";
translate["txt_pwdError"] = "Houve um erro ao enviar o email de recuperação de senha. Por favor, <a href=\'#\' class=\'recoverPWD abortDT\'>tente novamente</a>.";

/*
 * Funcoes
*/

function checkNotNull(term) {
    term = $.trim(term);
    term = term.replace(/\s+/g, '');
    // console.log('trem', term);
    if (term === 'undefined' || term === undefined || term === 'NaN' || term === '' || term === ' ' || term === false || term === null || term == 0) {
        return false;
    } else {
        return true;
    }
}

function checkIsNull(term) {
    term = $.trim(term);
    term = term.replace(/\s+/g, '');
    // console.log('trem', term);
    if (term === 'undefined' || term === undefined || term === 'NaN' || term === '' || term === ' ' || term === false || term === null || term == 0) {
        return true;
    } else {
        return false;
    }
}

//**** Alerts START ****//
/*
** start Bootstrap notify
** Displays messages on the screen instead of the alert window
*/
var icon;
function sa(type, title, text, timer, callbackFunction, callbackParams, showProgressbar) {

    if (type === 'success') {
        icon = 'fas fa-check-circle';
    }
    if (type === 'danger' || type === 'error') {
        icon = 'fas fa-exclamation-circle';
        if (type === 'error') type = 'danger';
    }
    if (type === 'warning') {
        icon = 'fas fa-exclamation-triangle';
    }
    if (type === 'info') {
        icon = 'fas fa-info-circle';
    }

    $.notify({
        // options
        title: '<strong>' + title + '</strong>',
        message: '<br />' + text,
        icon: icon,
        //url: 'https://github.com/mouse0270/bootstrap-notify',
        //target: '_blank'
    }, {
        // settings
        element: 'body',
        //position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: showProgressbar,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 3300,
        timer: timer,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated zoomInDown',
            exit: 'animated zoomOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
    });

    if ((typeof (callbackFunction) == 'string') && (typeof (window[callbackFunction]) == 'function')) {
        window[callbackFunction](callbackParams);
    }
}

/*
** start Sweetalert2
** Displays messages on the screen instead of the alert window for user interaction
*/
const swalBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success btn-js',
        cancelButton: 'btn btn-danger btn-js'
    },
    buttonsStyling: false,
});
function sad(type, title, text, confirmButtonText, cancelButtonText, callbackFunction, callbackParams) {
    //function sad(type, title, text, callbackFunction, callbackParams) {
    // console.log('sad', type, title, text, confirmButtonText, cancelButtonText, callbackFunction, callbackParams)
    if (checkIsNull(confirmButtonText)) {
        confirmButtonText = 'OK';
    }
    if (checkIsNull(cancelButtonText)) {
        cancelButtonText = 'Cancelar';
    }
    swalBootstrapButtons.fire({
        'title': title,
        'text': text,
        'type': type,
        'showCancelButton': true,
        'confirmButtonText': confirmButtonText,
        'cancelButtonText': cancelButtonText,
        'reverseButtons': false
    }).then(function (result) {
        if (result.value) {
            if (callbackFunction === 'sendForm') {
                window[callbackFunction](callbackParams[0], callbackParams[1], callbackParams[2], callbackParams[3], callbackParams[4], callbackParams[5]);
            } else if (checkNotNull(callbackFunction)) {
                window[callbackFunction](callbackParams);
            }
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
    });
}
//**** Alerts - END ****//

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

//**** Funcoes para formularios ****//
function sendForm(form, path, target, allertSuccess, allertError, validate, type) {
    form = $.trim(form);
    path = $.trim(path);
    if (checkIsNull(type)) {
        type = 'POST';
    }
    //console.log('target', target);
    //console.log('allertSuccess', allertSuccess);
    //console.log('allertError', allertError);
    //console.log('validate', validate);

    if (checkNotNull(form) && checkNotNull(path)) {
        if (validate) {
            validate = validate_form(form);
        } else {
            validate = true;
        }

        if (validate === true) {
            var formData = new FormData($(form)[0]);
            $.ajax({
                url: basePath + path,
                type: type,
                typeData: 'json',
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    console.log(data);

                    if (data.status === 'success') {
                        if (allertSuccess === true) {
                            if (target !== 'download') {
                                sa('success', translate.titles_success, data.message, 1000, 'succesReturn', [target, data]);
                            }
                        } else {
                            succesReturn([target, data]);
                        }
                        setTimeout(function () {
                            $(form).removeClass('was-validated');
                        }, 1100);
                    } else {
                        if (target != 'download') {
                            if (data.status === 'error' && data.warning === true) {
                                sa('warning', translate.titles_warning, data.message, 2000, 'errorReturn', [target, data]);
                            } else if (data.status === 'error') {
                                sa('error', translate.titles_error, data.message, 2000, 'errorReturn', [target, data]);
                            } else {
                                //console.log('ERROR network after process ajax');
                                sa('error', translate.titles_error, translate.global_neterror, 3500);
                            }
                        }
                    }
                },
                error: function (data) {
                    document.title = pageTitle;
                    if (target != 'download') sa('error', translate.titles_error, translate.save_error, 3500);
                }
            }).fail(function () {
                document.title = pageTitle;
                //console.log('ERROR network');
                if (target != 'download') sa('error', translate.titles_error, translate.global_neterror, 3500);
            });
        } else {
            //console.log('ERROR campos em branco');
            if (target != 'download') sa('error', translate.titles_error, translate.error_fill_filed, 2000);
        }
    } else {
        //console.log('ERROR process form');
        if (target != 'download') sa('error', translate.titles_error, translate.error_formsubmit, 3500);
    }
}

function validate_form(form) {
    var result = new Array();
    var i = 0;
    var itemiD, returned;

    if ($('input').hasClass('validate') || $('select').hasClass('validate') || $('textarea').hasClass('validate')) {
        $(form + ' .validate').each(function () {
            itemiD = $(this).attr('id');
            content = $.trim($('#' + itemiD).val());
            $(form).addClass('was-validated');
            if (content === '' || content === null) {
                result[i] = false;
            } else {
                result[i] = true;
            }
            if (checkNotNull(content)) {
                result[i] = true;
            } else {
                result[i] = false;
            }
            i++;
            //alert('campo: '+itemiD+' ('+$.trim($('#' + itemiD).val())+')');
        });

        $.each(result, function (i, e) {
            if (e === false) {
                returned = false;
            }
            if (returned !== false) {
                returned = true;
            }
        });
    } else {
        returned = true;
    }
    return returned;
}

function reset_form(form) {
    $('#' + form).each(function () {
        this.reset();
    });
}

function succesReturn(params, sweetReturn) {
    target = params[0].split('#');
    functionName = target[1];
    target = target[0];

    parameters = params[1];
    console.log('S.target', target);
    console.log('S.functionName', functionName);
    console.log('S.parameters', parameters);
    console.log('S.sweetReturn', sweetReturn);
    switch (target) {
        case 'use_function':
            window[functionName](parameters.data, parameters.status, sweetReturn);
            break;
        case 'generateSummary':
            CKEDITOR.instances.summary.setData(parameters.text);
            if (parameters.newtext !== undefined || parameters.newtext !== null) {
                CKEDITOR.instances.content.setData(parameters.newtext);
            }
            break;
        case 'getcnpj':
            zipPrefix = parameters.data.zipPrefix ? parameters.data.zipPrefix : '';
            zipControl = parameters.data.zipControl ? parameters.data.zipControl : '';
            //$('#name').val(parameters.data.razao_social);
            $('#' + zipPrefix + 'company' + zipControl).val(parameters.data.nome_fantasia);
            $('#' + zipPrefix + 'zipcode' + zipControl).val(parameters.data.cep);
            $('#' + zipPrefix + 'number').val(parameters.data.numero);
            $('#' + zipPrefix + 'complement').val(parameters.data.complemento);
            searchZipcode(parameters.data.cep, zipPrefix, zipControl, country_id);
            break;
        case 'zipcode':
            zipPrefix = parameters.data.zipPrefix ? parameters.data.zipPrefix : '';
            zipControl = parameters.data.zipControl ? parameters.data.zipControl : '';

            $('#' + zipPrefix + 'ibge' + zipControl).val(parameters.data.ibge);
            $('#' + zipPrefix + 'siafi' + zipControl).val(parameters.data.siafi);
            $('#' + zipPrefix + 'public_place' + zipControl).val(parameters.data.public_place);
            $('#' + zipPrefix + 'address' + zipControl).val(parameters.data.address);
            $('#' + zipPrefix + 'district' + zipControl).val(parameters.data.district);
            $('#' + zipPrefix + 'city' + zipControl).val(parameters.data.city);
            $('#' + zipPrefix + 'state' + zipControl).val(parameters.data.state);
            $('#' + zipPrefix + 'country' + zipControl).val(parameters.data.country);
            $('#' + zipPrefix + 'address_number' + zipControl).focus();
            break;
        case 'modalInsert':
            $('#modalTemplateBody').html(parameters.data);
            $('#modalTemplateTitle').html(parameters.modal_title);
            $('#modalTemplate .modal-content').replaceClass('md-', 'md-135x7');
            $('#modalTemplate').show();
            break;
        case 'societe_business_sales':
            $('#fk_soc').val(parameters.data.lastid);
            $('#search_fk_soc').val(parameters.data.name);
            $('#modalTemplate').hide();
            break;
        case 'contact_business_sales':
            $('#fk_cnt').val(parameters.data.lastid);
            $('#search_fk_cnt').val(parameters.data.name);
            $('#modalTemplate').hide();
            break;
        // END rules for cloud
        default:
            return false;
    }
}
function use_function_tpl(data, status, sweetReturn) {
    //console.log(': ',data, status, sweetReturn);
    if (status == 'success') {
        return true;
    } else {
        return false;
    }
}
function errorReturn(params, sweetReturn) {
    //target = params[0];
    target = params[0].split('#');
    functionName = target[1];
    target = target[0];
    parameters = params[1];
    //console.log('E.target', target);
    //console.log('E.functionName', functionName);
    //console.log('E.parameters', parameters);
    //console.log('E.sweetReturn', sweetReturn);

    switch (target) {
        case 'use_function':
            window[functionName](parameters.data, parameters.status, sweetReturn);
            break;
        case 'singup':
            $('#nsReturn').html(parameters.messageLink);
            $('#singupModal').modal('hide');
            break;
        default:
            $(parameters.focus).focus();
            return false;
    }
}

function clearAjaxForm() {
    $('#methodAjaxForm').val('openModal');
    $('#fieldsAjaxForm').html('');
}

function convertFormToJSON(form) {
    $.each(array, function () {
        json[this.name] = this.value;
    });

    return json;
}

$.fn.removeClassRegex = function (regex, nClass) {
    return this.removeClass(function (index, css) {
        return (css.match(new RegExp('\\b(' + regex + '\\S*)\\b', 'g')) || []).join('');
    });
};

$.fn.replaceClass = function (oldClass, newClass) {
    this.removeClass(function (index, css) {
        return (css.match(new RegExp('\\b(' + oldClass + '\\S*)\\b', 'g')) || []).join('');
    });
    this.addClass(newClass);
};

function closeModal(id) {
    if (checkNotNull(id)) {
        reset_form(id);
    } else {
        $('#methodAjaxForm').val('openModal');
        $('#modalTemplate .modal-content').replaceClass('md-', 'md-7x5');
        $('#genericButtonView').addClass('hidden');
        $('#genericLinkView').addClass('hidden');
        $('#genericLinkModalTemplate').addClass('abortDT');
        $('#genericLinkModalTemplate').removeAttr('target');
        $('#genericLinkModalTemplate').attr('href', '#').attr('title', '').html('');
        $('#genericButtonModalTemplate').html('');
        $('#saveButtonView').removeClass('hidden');
    }

    $('#_method').remove();

    $('.modal').modal('hide');
}

//***** Funcoes comum *****//
function abortDTAjax() {
    if (typeof $ !== "undefined" && $.fn.dataTable) {
        var all_settings = $($.fn.dataTable.tables()).DataTable().settings();
        for (var i = 0, settings; (settings = all_settings[i]); ++i) {
            if (settings.jqXHR)
                settings.jqXHR.abort();
        }
    }
}

function ucFirst(str) {
    var text = str;

    var parts = text.split(' '),
        len = parts.length,
        i, words = [];
    for (i = 0; i < len; i++) {
        var part = parts[i];
        var first = part[0].toUpperCase();
        var rest = part.substring(1, part.length);
        var word = first + rest;
        words.push(word);
    }

    return words.join(' ');
}

function check_cnpj(cnpj, field) {
    var cnpj, digit, dv, result;
    //console.log(field);
    // Remove CNPJ characteres
    cnpj = cnpj.replace(/[^\d]+/g, "");
    // Check if the CNPJ is empty
    if (checkIsNull(cnpj)) {
        sa("warning", 'Cuidado!', "CNPJ embranco, preencha-o");
        $(field).val("").focus();
        return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        sa("warning", 'Cuidado!', "CNPJ inválido");
        $(field).val("").focus();
        return false;
    }

    digit = cnpj.substr(0, 12);
    dv = cnpj.substr(12, 2);
    result = 0;

    // Check if the first place of the check digit is valid
    for (i = 0; i < 12; i++) {
        result += digit.charAt(11 - i) * (2 + (i % 8));
    }
    if (result == 0) {
        sa("error", 'Erro', "Erro ao validar este CNPJ");
        return false;
    }
    result = 11 - (result % 11);
    if (result > 9) {
        result = 0;
    }
    if (dv.charAt(0) != result) {
        sa("warning", 'Cuidado!', "CNPJ inválidoCNPJ inválido");
        $(field).val("").focus();
        return false;
    }

    // Check if the last box of the check digit is valid
    result *= 2;
    for (i = 0; i < 12; i++) {
        result += digit.charAt(11 - i) * (2 + ((i + 1) % 8));
    }
    result = 11 - (result % 11);
    if (result > 9) {
        result = 0;
    }
    if (dv.charAt(1) != result) {
        sa("warning", 'Cuidado!', "CNPJ inválido");
        $(field).val("").focus();
        return false;
    } else {
        return true;
    }
}

function check_cpf(cpf, field) {
    var position, result, dv, dv_informed;
    var digit = new Array(10);
    zipPrefix = '';
    zipControl = '';
    cpf = cpf.replace(/\D/g, "");

    // Removes the last two digits of the number entered
    dv_informed = cpf.substr(9, 2);

    // Dismember the cpf number in the digit array
    for (i = 0; i <= 8; i++) {
        digit[i] = cpf.substr(i, 1);
    }

    // Calculates the value of the 10 digit verification
    position = 10;
    result = 0;
    for (i = 0; i <= 8; i++) {
        result = result + digit[i] * position;
        position = position - 1;
    }
    digit[9] = result % 11;
    if (digit[9] < 2) {
        digit[9] = 0;
    } else {
        digit[9] = 11 - digit[9];
    }

    // Calculates the value of the 11 digit verification
    position = 11;
    result = 0;
    for (i = 0; i <= 9; i++) {
        result = result + digit[i] * position;
        position = position - 1;
    }
    digit[10] = result % 11;
    if (digit[10] < 2) {
        digit[10] = 0;
    } else {
        digit[10] = 11 - digit[10];
    }

    // Checks whether the check digit values match
    dv = digit[9] * 10 + digit[10];
    if (dv != dv_informed) {
        sa("warning", 'Cuidado!', "CPF inválido");
        $(field).val("").focus();
        return false;
    }
}

function searchCNPJ(cnpj, zipPrefix, zipControl, country_id) {
    if (checkNotNull(cnpj)) {
        $('#methodAjaxForm').val('zipcode');
        $('#fieldsAjaxForm').html(`${generate_input(cnpj, { name: 'cnpj', type: 'hidden' })}\n${generate_input(country_id, { name: 'country_id', type: 'hidden' })}\n${generate_input(zipPrefix, { name: 'zipPrefix', type: 'hidden' })}${generate_input(zipControl, { name: 'zipControl', type: 'hidden' })}`);
        sendForm('#sendAjaxForm', 'api/search/getCNPJ', 'getcnpj', true, true, false);
    } else {
        sa('error', '', 'Você deve informar um CEP para prosseguir com a busca', 1500);
    }
}

function searchZipcode(zipcode, zipPrefix, zipControl, country_id) {
    if (checkNotNull(zipcode)) {
        $('#methodAjaxForm').val('zipcode');
        $('#fieldsAjaxForm').html(`${generate_input(zipcode, { name: 'zipcode', type: 'hidden' })}\n${generate_input(country_id, { name: 'country_id', type: 'hidden' })}\n${generate_input(zipPrefix, { name: 'zipPrefix', type: 'hidden' })}${generate_input(zipControl, { name: 'zipControl', type: 'hidden' })}`);
        sendForm('#sendAjaxForm', 'api/search/getCEP', 'zipcode', true, true, false);
    } else {
        sa('error', '', 'Você deve informar um CEP para prosseguir com a busca', 1500);
    }
}

/*
* Match functions
*/
function floatValue(val, prefix) {
    // console.log('floatValue( '+val, prefix);
    if (prefix && checkNotNull(val)) {
        val = val.replace(prefix, '');
    }
    var res = (val % 1);
    // console.log('VALOR: '+val,res,checkNotNull(res));
    if (checkIsNull(res) && checkNotNull(val)) {
        val = val.replace('.', '');
        val = val.replace(',', '.');
    }
    // console.log('VALOR frmt:'+val);
    return Number(val);
}

function unfloatValue(val, csDecimal) {
    // console.log(val, csDecimal);
    val = val.replace('.', ',');
    return val;
}

function sumValue(vA, vB, csDecimal) {
    // console.log('sumValue entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = vA + vB;
    // console.log('total: '+total);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    return unfloatValue(total, csDecimal);
}

function subtractValue(vA, vB, csDecimal) {
    // console.log('subtractValue entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = (vA - vB);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    return unfloatValue(total, csDecimal);
}

function multiplyValue(vA, vB, csDecimal) {
    // console.log('multiplyValue entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = (vA * vB);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    return unfloatValue(total, csDecimal);
}

function divisionValue(vA, vB, csDecimal) {
    // console.log('divisionValue entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = (vA / vB);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    return unfloatValue(total, csDecimal);
}
/* getPercentage - obtem a porcentagem de um valor */
function getPercentage(vA, vB, csDecimal) {
    // console.log('getPercentage entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = ((vB * 100) / vA);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    // console.log('total: '+total);
    return unfloatValue(total, csDecimal);
}
/* getValuePercent - obtem o valor de uma porcentagem */
function getValuePercent(vA, vB, csDecimal) {
    // console.log('getValuePercent entrada: '+vA,vB);
    if (checkIsNull(vA)) vA = 0;
    if (checkIsNull(vB)) vB = 0;
    // console.log('checado: '+vA,vB);
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('float: '+vA,vB);
    total = ((vA * vB) / 100);
    if (csDecimal) {
        total = total.toFixed(csDecimal);
    }
    // console.log('total: '+total);
    return unfloatValue(total, csDecimal);
}

function checkISbigger(vA, vB) {
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('checkISbigger: '+vA,vB);
    if (vA > vB) {
        return true;
    } else {
        return false;
    }
}

function checkISsmall(vA, vB) {
    vA = floatValue(vA, prefix);
    vB = floatValue(vB, prefix);
    // console.log('checkISsmall: '+vA,vB);
    if (vA < vB) {
        return true;
    } else {
        return false;
    }
}

function checkType(nr) {
    if (typeof nr == 'string' && nr.match(/(\d+[,.]\d+)/)) {
        //console.log('string decimal');
        return 'decimal';
    } else if (typeof nr == 'string' && nr.match(/(\d+)/)) {
        //console.log('string inteiro');
        return 'integer';
    } else if (typeof nr == 'number') {
        if (nr % 1 == 0) {
            //console.log('numero inteiro');
            return 'integer';
        }
        else {
            //console.log('numero decimal');
            return 'decimal';
        }
    } else {
        return false;
    }
}

function setMaskMoney() {
    setTimeout(function () {
        $('.double').trigger('mask.maskMoney');
        $('.value').trigger('mask.maskMoney');
        $('.price').trigger('mask.maskMoney');
    }, 150);
}

/*
* Functions create inputs form
*/
/*
* Paramters for functions:
*		generate_input_array()
*		generate_input()
* data = return value for input field
* field = object{
        'name' = return ID and NAME input
        'type' = return TYPE input ex: text, hidden, email, password
        'attribute' = return attributes for input, ex:
            class="class_name"
            title="title value"
            placeholder="placeholder value"
            disabled="disabled"
    }
*/
function generate_input(data, field, label) {
    // console.log(data);
    content = '';
    if (checkIsNull(data)) data = '';
    if (checkIsNull(field.attribute)) field.attribute = '';
    if (checkNotNull(field.label)) {
        content += '<label for="' + field.name + '">' + field.label + '</label>';
    }
    content += '<input type="' + field.type + '" id="' + field.name + '" name="' + field.name + '" value="' + data + '"' + field.attribute + ' />\n';

    return content;
}

function generate_input_array(data, field, label) {
    content = '';
    $.each(data, function (i, v) {
        if (checkIsNull(v)) v = '';
        if (checkIsNull(field.attribute)) field.attribute = '';
        if (checkNotNull(field.label)) {
            content += '<label for="' + field.name + '_' + i + '">' + field.label + '</label>';
        }
        content += '<input type="' + field.type + '" id="' + field.name + '_' + i + '" name="' + field.name + '[' + i + ']" value="' + v + '"' + field.attribute + ' />\n';
    });
    // console.log('Content: '+content);

    return content;
}

function generate_input_array_multi(data, field, label) {
    content = '';
    // console.log('Label: ',label);
    if (checkIsNull(field.attribute)) field.attribute = '';
    $.each(data, function (k, d) {
        $.each(d, function (i, v) {
            //console.log('multiarray: ',d,i,v);
            $.each(v, function (c, r) {
                if (checkIsNull(r)) r = '';
                if (checkNotNull(field.label)) {
                    content += '<label for="' + field.name + '_' + k + '_' + i + '_' + c + '">' + field.label + '</label>';
                }
                // array que contem c=name r=value
                content += '<input type="' + field.type + '" id="' + field.name + '_' + k + '_' + i + '_' + c + '" name="' + field.name + '[' + k + ']' + '[' + i + ']' + '[' + c + ']' + '" value="' + r + '"' + field.attribute + ' />\n';
            });
        });
    });

    return content;
}

function generate_input_array_table(data, field, label) {
    content = '';
    //console.log('Label: ',label);
    $.each(data, function (i, v) {
        if (checkIsNull(v)) v = '';
        if (checkIsNull(field.attribute)) field.attribute = '';
        content += '<tr>';

        content += '<td>';
        content += '<label for="' + field.name + '_' + i + '">' + label[i] + '</label>';
        content += '</td>';

        content += '<td>';
        content += '<input type="' + field.type + '" id="' + field.name + '_' + i + '" name="' + field.name + '[' + i + ']" value="' + v + '"' + field.attribute + ' />\n';
        content += '</td></tr>';
    });

    return content;
}

function generate_select(data, field, options, label) {
    content = '';
    if (checkIsNull(field.attribute)) field.attribute = '';
    if (checkNotNull(field.label)) {
        content += '<label for="' + field.name + '">' + field.label + '</label>';
    }
    content += '<select id="' + field.name + '" name="' + field.name + '" ' + field.attribute + '>';

    $.each(options, function (i, v) {
        if (checkNotNull(v)) {
            if (checkIsNull(v.attribute)) v.attribute = '';
            content += '<option value=' + v.value + ' ' + v.attribute + '>' + v.text + '</option>';
        }
    });

    content += '</select>';

    return content;
}

function generate_select_table(data, field, options, label) {
    content = '';
    if (checkIsNull(field.attribute)) field.attribute = '';
    content += '<tr>';
    if (checkNotNull(field.label)) {
        content += '<td>';
        content += '<label for="' + field.name + '">' + field.label + '</label>';
        content += '</td>';
    }
    content += '<td>';
    content += '<select id="' + field.name + '" name="' + field.name + '" ' + field.attribute + '>';

    $.each(options, function (i, v) {
        if (checkNotNull(v)) {
            if (checkIsNull(v.attribute)) v.attribute = '';
            content += '<option value=' + v.value + ' ' + v.attribute + '>' + v.text + '</option>';
        }
    });

    content += '</select>';
    content += '</td></tr>';

    return content;
}

/*
* Document script
*/
$(document).ready(function () {
    /** Desativar evento click-to-get dos links **/
    $(document).on('click', '.abortDT', function (e) {
        e.preventDefault();
        abortDTAjax();
    });

    $(document).on('click', '.resetForm', function () {
        reset_form($(this).attr('data-form'));
    });

    $('.select2').select2({
        "theme": "bootstrap"
    });

    /** Bloqueando o ENTER nos formularios **/
    $('.no_enter').keypress(function (e) {
        if ('key' in evt) {
            if (e.key === 'Enter' || e.key === 'enter') {
                return false;
            }
        } else {
            if (e.which == 13 || e.keyCode == 13) {
                return false;
            }
        }
    });

    $(document).on('keyup', function (e) {
        if ('key' in e) {
            isEscape = (e.key === 'Escape' || e.key === 'Esc');
        } else {
            isEscape = (e.keyCode == 27);
        }
        if (isEscape) {
            closeModal();
        }
    });

    $(document).on('click', '.submitForm', function () {
        $('#' + $(this).attr('data-form')).submit();
    });

    /** Eventos do modal **/
    $(document).on('click', '.openModal', function () {
        $('#modalTitle').html($(this).attr('data-title'));
        $('#' + $(this).attr('data-modal')).modal('show');
        reset_form($(this).attr('data-form'));
        //console.log($(this).attr('data-title'),$(this).attr('data-modal'));
    });

    $(document).on('click', '.close,  .dismiss-modal .modal-close', function (e) {
        e.preventDefault();
        closeModal($(this).attr('data-id'));
    });

    $(document).on('click', '#saveFormModalTemplate', function () {
        form = $(this).attr('data-form');
        //console.log('form1 '+form);
        if (checkIsNull(form)) {
            form = 'modalInsertForm';
        }
        //console.log('form2 '+form);
        sendForm('#' + form, "/custom/lyosolutions/autocomplete.php", $("#modalFormTarget").val(), false, true, true);
    });

    $(document).on('click', '.saveFormModal', function () {
        form = $(this).attr('data-form');
        url = $(this).attr('data-url');
        //console.log('form1 '+form);
        if (checkIsNull(form)) {
            form = 'modalInsertForm';
        }
        //console.log('form2 '+form);
        sendForm('#' + form, url, $("#modalFormTarget").val(), false, true, true);
    });

    /** Evento do nav-tabs **/
    var triggerTabList = [].slice.call(document.querySelectorAll('#formTab button'))
    triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
        })
    })

    /***
     ** Mascara para campos
    */

    $('.price').maskMoney({
        prefix: prefix,
        thousands: thousands,
        decimal: decimal,
        precision: precision,
        allowNegative: allowNegative
    });

    $('.value').maskMoney({
        thousands: thousands,
        decimal: decimal,
        precision: precision,
        allowNegative: allowNegative
    });

    $('.double').maskMoney({
        thousands: '',
        decimal: decimal,
        precision: precision,
        allowNegative: allowNegative
    });

    $(document).on('keyup', '.cpfMask', function () {
        var cpfMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length <= 11 ? '000.000.000-009' : '000.000.000-009';
        },
            cpfOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(cpfMaskBehavior.apply({}, arguments), options);
                    //console.log(cpfMaskBehavior.length);
                    if (cpfMaskBehavior.length == 14) {
                        console.log('CPF', cpfMaskBehavior);
                        check_cpf(cpfMaskBehavior, '#' + $(this).attr('id'));
                    }
                }
            };

        $(this).mask(cpfMaskBehavior, cpfOptions);
    });

    $(document).on('keyup', '.cnpjMask', function () {
        var cnpjMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length <= 11 ? '00.000.000/0000-00' : '00.000.000/0000-00';
        },
            cnpjpOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(cnpjMaskBehavior.apply({}, arguments), options);
                    //console.log(cnpjMaskBehavior.length);
                    if (cnpjMaskBehavior.length == 18) {
                        console.log('CNPJ', cpfMaskBehavior);
                        check_cnpj(cnpjMaskBehavior, '#' + $(this).attr('id'));
                    }
                }
            };

        $(this).mask(cnpjMaskBehavior, cnpjpOptions);
    });

    $(document).on('keyup', '.cepMask', function () {
        var zipcodeMaskBehavior = function (val) {
            return '00000-000';
        },
            zipcodeOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(zipcodeMaskBehavior.apply({}, arguments), options);
                }
            };

        $(this).mask(zipcodeMaskBehavior, zipcodeOptions);

        text = $(this).val();
    });

    $(document).on('keyup', '.dateMask', function () {
        var dateMaskBehavior = function (val) {
            return '00/00/0000';
        },
            dateOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(dateMaskBehavior.apply({}, arguments), options);
                }
            };

        $(this).mask(dateMaskBehavior, dateOptions);
    });

    $(document).on('keyup', '.phoneMask', function () {
        var phoneMaskBehavior = function (val) {
            return '99 9999-9999';
        },
            phoneOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(phoneMaskBehavior.apply({}, arguments), options);
                }
            };

        $(this).mask(phoneMaskBehavior, phoneOptions);
    });

    $(document).on('keyup', '.cellphoneMask', function () {
        var cellphoneMaskBehavior = function (val) {
            return '99 99999-9999';
        },
            cellphoneOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(cellphoneMaskBehavior.apply({}, arguments), options);
                }
            };

        $(this).mask(cellphoneMaskBehavior, cellphoneOptions);
    });

    $(document).on('keyup', '.contabilIDMask', function () {
        var contMaskBehavior = function (val) {
            return '9.99.99.99.99999';
        },
            contOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(contMaskBehavior.apply({}, arguments), options);
                }
            };

        $(this).mask(contMaskBehavior, contOptions);
    });

    /**
     ** Statementes page
    */
    $(document).on('blur', '.checkEmail', function () {
        id = $(this).attr('id');
        if (checkNotNull($('#' + id).val())) {
            console.log('Validar email ' + $('#' + id).val());
        }
    });

    $(document).on('click', '.getCNPJ', function () {
        zipPrefix = $(this).attr('zip-prefix');
        zipControl = $(this).attr('zip-control');
        country_id = '3469034';
        searchCNPJ($('#' + zipPrefix + 'cnpj' + zipControl).val(), zipPrefix, zipControl, country_id);
    });

    $(document).on('click', '.getCEP', function () {
        zipPrefix = $(this).attr('zip-prefix');
        zipControl = $(this).attr('zip-control');
        country_id = '3469034';
        searchZipcode($('#' + zipPrefix + 'zipcode' + zipControl).val(), zipPrefix, zipControl, country_id);
    });

    $(document).on('click', '.modalFilemanage', function () {
        $('#modalTemplate').show();
    });

    $(document).on('click', '#generateSummary', function () {
        content = '<input type="hidden" name="content" value="' + encodeURI(CKEDITOR.instances.content.getData()) + '" />';
        $('#methodAjaxForm').val('generateSummary');
        $('#fieldsAjaxForm').html(content);
        sendForm('#sendAjaxForm', $(this).attr('data-url'), $(this).attr('data-target'), false, true, false);
    });

    $(document).on('click', '.getHelpTextTag', function () {
        $('#getHelpTextTag').show();
    });

    /**
     * Modify link-page to modal
     **/
    $('.modalInsert').on('click', function () {
        ref = $(this).attr('data-target');
        $('#methodAjaxForm').val('modalInsert');
        $('#fieldsAjaxForm').html('\
        <input type="hidden" name="location" value="' + ref + '" />\n\
        <input type="hidden" name="module" value="' + $(this).attr('data-module') + '" />');
        sendForm('#sendAjaxForm', urlBase, 'modalInsert', false, true, false);
    });

    $(document).on('click', '.viewerDocument', function () {
        $('#sendAjaxForm').attr('action', $(this).attr('data-url')).attr('target', '_blank');

        content = generate_input($(this).attr('data-path'), { name: 'file', type: 'hidden' });
        $('#fieldsAjaxForm').html(content);

        $('#sendAjaxForm').submit();

        if ($(this).attr('data-manage') === 'modalClose') {
            closeModal();
        }
    });
});
