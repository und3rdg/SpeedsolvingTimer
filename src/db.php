<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';

//db table
$table = 'score';
// columns in table: |id|times_ms|

$debug = 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo "<footer>";
    die("Connection failed: " . $conn->connect_error);
    echo "</footer>";
}
if($debug == true) {
echo $conn -> host_info;
echo "<br />";
echo $conn -> connect_errno;
echo "<br />";
}

?>
