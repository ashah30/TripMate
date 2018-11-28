/* custom javascript function */
$(function() {
    $('#btnRegister').click(function(e) {
        $('#registerAlert').removeClass('alert-success');
        $('#registerAlert').removeClass('alert-error');
        var user_name = $('#user_name').val();
        var user_email = $('#user_email').val();
        var user_password = $('#user_password').val();
        var confirmpassword = $('#confirmpassword').val();
        if(user_name == '' || user_email == '' || user_password == '' || confirmpassword == '')
        {
            $('#registerAlert').addClass('alert-danger').text('Please fill all fields');
        }
        else if(user_password != confirmpassword)
        {
            $('#registerAlert').addClass('alert-danger').text('Confirm Password did not match');
        }
        else
        {
            $.ajax({
                url  : 'backend/users/signup.php',
                type : 'GET',
                data : { 'name': user_name , 'email': user_email, 'password': user_password},
                success: function(response) {
                    console.log('Response', response);
                }
            });
        }
        e.preventDefault();
    });
});
