<?php

require_once 'inc/connection.inc.php';

$email = trim($_POST['email']);
$password = md5($_POST['password']);

$query = "SELECT * FROM `users` WHERE `email`='$email' AND `password`='$password' LIMIT 1";

$row = mysqli_fetch_assoc(mysqli_query($connection, $query));

if (isset($row)) {
	$result = array(
		'success' => 1,
		'user_id' => (int)$row['id'],
		'name' => trim($row['name']),
		'email' => trim($row['email']),
		'message' => 'Success'
	);
} else {
	$result = array(
		'success' => 0,
		'user_id' => 0,
		'name' => '',
		'email' => '',
		'message' => 'Wrong username/password.'
	);
}

$json = json_encode($result);
echo $json;

?>
