$(function(){
    // validate password for length and a number
    $('#password-notification').hide();
    $('#password-input').on('keyup', function(){
        $('#password-notification').show();
        let str = $('#password-input').val();
        // if string has numbers returns ture else false
        function containsNumber(t){
            return /\d/g.test(t);
        }
        if(str.length >= 8 && containsNumber(str)){
            $('#password-notification').html('<i class="fas fa-check-circle"></i> Your Password looks great!!').css('color', 'green');
        }else{
            $('#password-notification').html('<i class="fas fa-times-circle"></i> The password should be 8 characters long and must contain a number').css('color', 'red');
        }
    });

    //verify password match
    $('#verify-pass-notification').hide();
    $('#verify-password-input').on('keyup', function(){
        $('#verify-pass-notification').show();
        if($('#password-input').val() === $(this).val()){
            $('#verify-pass-notification').html('<i class="fas fa-check-circle"></i> Wow! It is a match').css('color', 'green');
        }else{
            $('#verify-pass-notification').html(`<i class="fas fa-times-circle"></i> Doesn't Match`).css('color', 'red');
        }
    });
});