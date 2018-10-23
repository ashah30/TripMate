<?php

$connect_error = 'Could not connect';
$mysql_host = 'localhost';
$mysql_username = 'root';
$mysql_password = '';
$mysql_database = 'tripmate';


function get_mysql_connection() {
	if(@!$connection = mysqli_connect($mysql_host , $mysql_username , $mysql_password ,$mysql_database))
		die($connect_error);
	return $connection;
}
