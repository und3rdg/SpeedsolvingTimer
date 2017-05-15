<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';

$debug = true;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if($debug == true) {
echo $conn -> host_info;
echo "<br />";
echo $conn -> connect_errno;
echo "<br />";
}

?>
