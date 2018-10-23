<?php

require_once '../inc/connection.inc.php';

$name = trim($_GET['name']);
$email = trim($_GET['email']);
$password = md5($_GET['password']);
$connection = get_mysql_connection();

$query = "INSERT INTO `users` (`name`,`email`,`password`)
	VALUES ('$name','$email','$password')";

if (mysqli_query($connection, $query)) {
	$response = array(
		'success' => 1,
		'user_id' => mysqli_insert_id($connection)
	);
} else {
	$response = array(
		'success' => 0
	);
}

echo $response;
?>