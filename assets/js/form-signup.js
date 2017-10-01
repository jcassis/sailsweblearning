$(document).ready(function() {
    $('#form-signup').submit(function(event) {
        var formData = {
            'email'         : $('#email').val(),
            'username'      : $('#username').val(),
            'password'      : $('#password').val(),
            'confirmation'  : $('#confirmation').val(),
            '_csrf'         : $('#_csrf').val()
        };

        $.ajax({
            type        : 'POST', 
            url         : '/user/create', 
            data        : formData, 
            dataType    : 'json'
        })
        .done(function(data) {
            $("#signup-error").hide();
            $("#signup-success").show().html("Cadastro concluído!");
            $('#form-signup')[0].reset();
        })
        .fail(function(data) {
            var errors = "<ul>";
            $.each(data.responseJSON.originalError, function(key, val){
                errors += "<li>"+val+"</li>"
            });

            errors += "</ul>";

            $("#signup-error").show().html(errors);
        });
        
        event.preventDefault();
    });

});