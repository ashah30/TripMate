/* custom javascript function */
checkLogin();
$(function() {
    $('#btnLogin').click(function(e) {
        $('#loginModal .alert-success').hide();
        $('#loginModal .alert-danger').hide();
        var login_email = $('#login_email').val();
        var login_password = $('#login_password').val();
        if(login_email == '' || login_password == '') {
            $('#loginModal .alert-danger').text('Please fill all fields').show();
        } else {
            $.ajax({
                url  : 'backend/login.php',
                type : 'POST',
                data : { 'email': login_email, 'password': login_password},
                success: function(response) {
                    var obj = jQuery.parseJSON(response);
                    if(obj.success) {
                        $('#loginModal .alert-success').text(obj.message).show();
                        localStorage.setItem('user_id', obj.user_id);
                        $('#login_email').val("");
                        $('#login_password').val("");
                        $("#loginModal").modal('hide');
                        location.reload();
                    }
                    else {
                        $('#loginModal .alert-danger').text(obj.message).show();
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('#btnRegister').click(function(e) {
        $('#registerModal .alert-success').hide();
        $('#registerModal .alert-danger').hide();
        var user_name = $('#user_name').val();
        var user_email = $('#user_email').val();
        var user_password = $('#user_password').val();
        var confirmpassword = $('#confirmpassword').val();
        if(user_name == '' || user_email == '' || user_password == '' || confirmpassword == '') {
            $('#registerModal .alert-danger').text('Please fill all fields').show();
        } else if(user_password != confirmpassword) {
            $('#registerModal .alert-danger').text('Confirm Password did not match').show();
        } else {
            $.ajax({
                url  : 'backend/register.php',
                type : 'POST',
                data : { 'name': user_name , 'email': user_email, 'password': user_password},
                success: function(response) {
                    var obj = jQuery.parseJSON(response);
                    if(obj.success) {
                        $('#registerModal .alert-success').text(obj.message).show();
                        localStorage.setItem('user_id', obj.user_id);
                        $('#user_name').val("");
                        $('#user_email').val("");
                        $('#user_password').val("");
                        $('#confirmpassword').val("");
                        $("#registerModal").modal('hide');
                        location.reload();
                    }
                    else {
                        $('#registerModal .alert-danger').text(obj.message).show();
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('#logout').click(function(e) {
        localStorage.setItem('user_id', 0);
        location.reload();
    });
});

function checkLogin() {
    if(localStorage.getItem('user_id') == null || localStorage.getItem('user_id') == 0) {
        $('#login').show();
        $('#register').show();
        $('#logout').hide();
    } else {
        $('#login').hide();
        $('#register').hide();
        $('#logout').show();
    }
}
