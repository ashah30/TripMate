<?php

include 'inc/connection.inc.php';

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$password = md5($_POST['password']);

$select = mysqli_query($connection, "SELECT `email` FROM `users` WHERE `email` = '".$email."'") or exit(mysqli_error($connectionID));
if(mysqli_num_rows($select)) {
	$result = array(
		'success' => 0,
		'user_id' => 0,
		'name' => '',
		'email' => '',
		'message' => 'This email is already registered'
	);
}
else {
	$query = "INSERT INTO `users` (`name`,`email`,`password`) VALUES ('$name','$email','$password')";
	if (mysqli_query($connection, $query)) {
		$result = array(
			'success' => 1,
			'user_id' => mysqli_insert_id($connection),
			'name' => $name,
			'email' => $email,
			'message' => 'Success'
		);
	} else {
		$result = array(
			'success' => 0,
			'user_id' => 0,
			'name' => '',
			'email' => '',
			'message' => 'Error'
		);
	}
}
$json = json_encode($result);
echo $json;
?>
