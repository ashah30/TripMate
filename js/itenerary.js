getItems();
function getItems(){
    $(".list-group-item").remove();
    $('#loaderClearList').show();
    if(localStorage.getItem('user_id') == null || localStorage.getItem('user_id') == 0) {
        $('#login-card').show();
        $('#itenerary-card').hide();
    } else {
        $('#login-card').hide();
        $('#itenerary-card').show();
        $.ajax({
            url  : 'backend/itenerary.php',
            type : 'POST',
            data : { 'action': 'getItems', 'user_id': localStorage.getItem('user_id')},
            success: function(response) {
                var obj = jQuery.parseJSON(response);
                if(obj != null) {
                    obj.forEach(function(item){
                        var li = '<li class="list-group-item d-flex justify-content-between align-items-center">'+item.title+'<span class="delete-item" onclick="deleteItem('+item.id+');"> X </span></li>';
                        $("#items").append(li);
                    })
                }
                $('#loaderClearList').hide();
            }
        });
    }
}
function addItem(){
    $('#loaderAddItem').show();
    $('#itenerary-card .alert-success').hide();
    $('#itenerary-card .alert-danger').hide();
    if ($("#input-item").val() === '') {
        $('#loaderAddItem').hide();
        $('#itenerary-card .alert-danger').text('Please add item').show();
        return
    }
    $.ajax({
        url  : 'backend/itenerary.php',
        type : 'POST',
        data : { 'action': 'addItem','user_id': localStorage.getItem('user_id'), 'title': $("#input-item").val()},
        success: function(response) {
            var obj = jQuery.parseJSON(response);
            if(obj.success) {
                var li = '<li class="list-group-item d-flex justify-content-between align-items-center">'+$("#input-item").val()+'<span class="delete-item" onclick="deleteItem('+obj.item_id+');"> X </span></li>';
                $("#items").append(li);
                $("#input-item").val('');
                $('#loaderAddItem').hide();
            }
            else {
                $('#loaderAddItem').hide();
                $('#itenerary-card .alert-danger').text(obj.message).show();
            }
        }
    });
}
function deleteItem(id){
    $('#loaderClearList').show();
    $.ajax({
        url  : 'backend/itenerary.php',
        type : 'POST',
        data : { 'action': 'deleteItem','item_id': id},
        success: function(response) {
            var obj = jQuery.parseJSON(response);
            if(obj.success) {
                getItems();
            }
            else {
                $('#loaderClearList').hide();
                $('#itenerary-card .alert-danger').text(obj.message).show();
            }
        }
    });
}
function clearList(){
    $('#loaderClearList').show();
    $.ajax({
        url  : 'backend/itenerary.php',
        type : 'POST',
        data : { 'action': 'clearList','user_id': localStorage.getItem('user_id')},
        success: function(response) {
            var obj = jQuery.parseJSON(response);
            if(obj.success) {
                getItems();
            }
            else {
                $('#loaderClearList').hide();
                $('#itenerary-card .alert-danger').text(obj.message).show();
            }
        }
    });
}
