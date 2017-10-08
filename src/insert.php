<?php
include("db.php");
include("inc.php");

$time_ms = intval($_GET['time_ms']);
// mysql columns
$into = 'times_ms'; 

$values = $time_ms;

if($time_ms > 0){
$sql = "INSERT INTO $table ($into) VALUES ($values)";


    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully ($values)";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
