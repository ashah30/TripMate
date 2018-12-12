<?php

$connect_error = 'Could not connect';
$mysql_host = 'localhost';
$mysql_username = 'root';
$mysql_password = '';
$mysql_database = 'tripmate';

// Create connection
$connection = new mysqli($mysql_host, $mysql_username, $mysql_password, $mysql_database);

// Check connection
if ($connection->connect_error) {
   die("Connection failed: " . $connection->connect_error);
}
