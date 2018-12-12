<?php

require_once 'inc/connection.inc.php';

$action = trim($_POST['action']);

if($action == 'getItems')
{
    $user_id = trim($_POST['user_id']);
    $query = "SELECT * FROM `itenerary` WHERE `user_id`='$user_id'";
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result))
    {
        $response[] = array(
			'id' => $row['id'],
			'title' => $row['title']
		);
    }
    $json = json_encode($response);
    echo $json;
}
else if($action == 'addItem')
{
    $user_id = trim($_POST['user_id']);
    $title = trim($_POST['title']);
    $query = "INSERT INTO `itenerary` (`user_id`,`title`) VALUES ('$user_id','$title')";
	if (mysqli_query($connection, $query)) {
		$response = array(
			'success' => 1,
            'item_id' => mysqli_insert_id($connection),
			'message' => 'Success'
		);
	} else {
		$response = array(
			'success' => 0,
            'item_id' => 0,
			'message' => 'Error'
		);
	}
    $json = json_encode($response);
    echo $json;
}
else if($action == 'deleteItem')
{
    $item_id = trim($_POST['item_id']);
    $query = "DELETE FROM `itenerary` WHERE `id` = '".$item_id."'";
	if (mysqli_query($connection, $query)) {
		$response = array(
			'success' => 1,
			'message' => 'Success'
		);
	} else {
		$response = array(
			'success' => 0,
			'message' => 'Error'
		);
	}
    $json = json_encode($response);
    echo $json;
}
else if($action == 'clearList')
{
    $user_id = trim($_POST['user_id']);
    $query = "DELETE FROM `itenerary` WHERE `user_id` = '".$user_id."'";
	if (mysqli_query($connection, $query)) {
		$response = array(
			'success' => 1,
			'message' => 'Success'
		);
	} else {
		$response = array(
			'success' => 0,
			'message' => 'Error'
		);
	}
    $json = json_encode($response);
    echo $json;
}
?>
