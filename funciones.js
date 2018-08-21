function seleccionarcastellano(){document.cookie="idioma=castellano";location.reload(!0)}
function seleccionarcatalan(){document.cookie="idioma=catalan";location.reload(!0)}
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toGMTString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}
function getCookie(name){var dc=document.cookie;var prefix=name+"=";var begin=dc.indexOf("; "+prefix);if(begin==-1){begin=dc.indexOf(prefix);if(begin!=0)return null}
else{begin+=2;var end=document.cookie.indexOf(";",begin);if(end==-1){end=dc.length}}
return decodeURI(dc.substring(begin+prefix.length,end))}
function lopd(){var myCookie=getCookie("lopd");if(myCookie==null){$('#modallregistro').modal('hide')
$('#modallacceder').modal('hide')
$('#modallopd').modal('show')}
else if(myCookie=='aceptada'){}}
function aceptarlopd(){setCookie('lopd','aceptada','365');$('#modallopd').modal('hide')
location.reload(!0)}
function denegarlopd(){$('#modallopd').modal('hide')}
$(document).on("submit", "form.js-register", function(event) {
    event.preventDefault();
    var _form = $(this);
    var _error = $(".js-error", _form);
    var dataObj = {
        email: $("input[type='email']", _form).val(),
        password: $("input[type='password']", _form).val(),
        nombre: $("input[type='nombre']", _form).val()
    };
    if (dataObj.email.length < 6) {
        _error.text("Error: introduce una direccion de mail valida.").show();
        return false;
    } else if (dataObj.nombre.length < 8) {
        _error.text("Error: introduce tu nombre completo.").show();
        return false;
    } else if (dataObj.password.length < 8) {
        _error.text("Error: introduce un password de 8 caracteres.").show();
        return false;
    }
    _error.hide();
    $.ajax({
        type: 'POST',
        url: '/ajax/register.php',
        data: dataObj,
        dataType: 'json',
        async: true,
    }).done(function ajaxDone(data) {
        if (data.redirect !== undefined) {
            window.location = data.redirect;
        } else if (data.error !== undefined) {
            _error.text(data.error).show();
        }
    }).fail(function ajaxFailed(e) {}).always(function ajaxAlwaysDoThis(data) {
        console.log('Always');
    });
    return false;
})
  .on("submit", "form.js-login", function(event) {
    event.preventDefault();
    var _form = $(this);
    var _error = $(".js-error", _form);
    var dataObj = {
        email: $("input[type='email']", _form).val(),
        password: $("input[type='password']", _form).val()
    };
    if (dataObj.email.length < 6) {
        _error.text("Error: introduce una direccion de correo valida.").show();
        return false;
    } else if (dataObj.password.length < 8) {
        _error.text("Error: introduce una contraseña valida").show();
        return false;
    }
    _error.hide();
    $.ajax({
        type: 'POST',
        url: '/ajax/login.php',
        data: dataObj,
        dataType: 'json',
        async: true,
    }).done(function ajaxDone(data) {
        if (data.redirect !== undefined) {
            window.location = data.redirect;
        } else if (data.error !== undefined) {
            _error.html(data.error).show();
        }
    }).fail(function ajaxFailed(e) {}).always(function ajaxAlwaysDoThis(data) {
        console.log('Always');
    })
    return false;
});
