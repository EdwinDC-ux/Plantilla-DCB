const signupValidations = () => {
    let validForm = true;
    let problemsFound = '';
    const userNameRegExp = /^(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*\d*)([A-Za-z\d]){2,50}$/;
    const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@.!%*?&])(?=.*[^\s])([A-Za-z\d$@.!%*?&]){8,15}$/;
    const mailRegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const nacimientoRegExp = /^(19([0-9]){2}|(2([0-9]){3}))-((0[1-9])|(1[1-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/;

    if ($('#name').val() == '') {
        validForm = false;
        problemsFound += '<li>El campo "Nombre" no puede quedar vacío.</li>';
    } else if ($('#name').val().length <= 2) {
        validForm = false;
        problemsFound += '<li>El campo "Nombre" no es válido.</li>';
    }

    if ($('#paterno').val() == '') {
        validForm = false;
        problemsFound += '<li>El campo "Nombre" no puede quedar vacío.</li>';
    } else if ($('#paterno').val().length <= 2) {
        validForm = false;
        problemsFound += '<li>El campo "Apellido paterno" no es válido.</li>';
    }

    if (!mailRegExp.test($('#mail').val())) {
        validForm = false;
        problemsFound += '<li>El correo electrónico no es admitido.</li>';
    }

    if (!nacimientoRegExp.test($('#nacimiento').val())) {
        validForm = false;
        problemsFound += '<li>La fecha de nacimiento no es válida.</li>';
    } else if (isNaN(Date.parse($('#nacimiento').val()))) {
        validForm = false;
        problemsFound += '<li>La fecha de nacimiento no existe.</li>';
    }

    if (!userNameRegExp.test($('#username').val())) {
        validForm = false;
        problemsFound += '<li>El nombre de usuario no es válido.</li>';
    }

    if (!passwdRegExp.test($('#new__passkey').val())) {
        validForm = false;
        problemsFound += '<li>La contraseña no cumple con los parámetros establecidos.</li>';
    }

    if ($('#confpasskey').val() != $('#new__passkey').val()) {
        validForm = false;
        problemsFound += '<li>La contraseña y la confirmación de contraseña no coinciden.</li>';
    }

    return {
        'validInputs': validForm,
        'list': problemsFound
    };
}

$('#sin-cuenta').click(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    window.location.href = './signup.html';
});
$('#con-cuenta').click(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    window.location.href = './';
});
$('#login').submit(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    $.confirm({
        columnClass: 'col-md-5',
        title: 'Verificación:',
        content: '' +
        '<form class="form-confirm">' +
        '<h3>Se mandó un correo electrónico a ejem*********lo.com con el código de verificación que deberá ingresar en esta sección.<abbr class="required">*</abbr></h3>' +
        '<fieldset class="form-group row">' +
        '<label for="confirmacion" class="col-12">Código:</label>' +
        '<input type="text" class="col-12" id="confirmacion" class="form-control" required />' +
        '</fieldset>' +
        '<h5><abbr class="required">*</abbr>Si no encuentra el mensaje en su bandeja principal, revise la bandeja de correo no deseado o spam.</h5>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Enviar',
                btnClass: 'btn dcb-btn-primary',
                action: function () {
                    var code = this.$content.find('#confirmacion').val();
                    if(!code){
                        $.alert({
                            title: '¡Aviso!',
                            content: 'Este campo no puede quedar vacío',
                            buttons: {
                                ok: {
                                    text: 'Ok',
                                    btnClass: 'btn dcb-btn-primary'
                                }
                            }
                        });
                        return false;
                    }
                    $.alert('Tu código es: ' + code);
                    window.location.href = '../session/';
                }
            },
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        }
    });
});
$('#signup').submit(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    let validation = signupValidations();

    if(validation.validInputs) {
        console.log('Is Valid Form')
    } else {
        $.confirm({
            columnClass: 'col-md-5',
            title: 'Errores encontrados en el formulario:',
            content: '' +
            '<ul>' + validation.list + '</ul>',
            buttons: {
                Aceptar: {
                    text: 'Aceptar',
                    btnClass: 'btn dcb-btn-primary',
                },
            }
        });
    }
});
$('#new__passkey').focus(ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if($('#new__passkey').hasClass('recomend')) {
        $.confirm({
            columnClass: 'col-md-5',
            title: 'Parámetros para la contraseña:',
            content: '' +
            '<ul>' +
            '<li>Mínimo 8 caracteres.</li>' +
            '<li>Máximo 15 caracteres.</li>' +
            '<li>Al menos una mayúscula.</li>' +
            '<li>Al menos una minúscula.</li>' +
            '<li>Al menos un número.</li>' +
            '<li>Al menos uno de estos caracteres especiales ($@!%*?&.)</li>' +
            '<li>Sin espacios.</li>' +
            '</ul>',
            buttons: {
                Aceptar: {
                    text: 'Aceptar',
                    btnClass: 'btn dcb-btn-primary',
                    action: function () {
                        $('#new__passkey').removeClass('recomend');
                        $('#new__passkey').focus();
                    }
                },
            }
        });
    }
});
$('#new__passkey').blur(ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if(!$('#new__passkey').hasClass('recomend')) {
        $('#new__passkey').addClass('recomend');
    }
});