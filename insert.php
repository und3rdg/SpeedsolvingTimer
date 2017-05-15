<?php

$table = 'score';
$into = 'times_ms';
$values = rand(1,1000000);

$sql = "INSERT INTO $table ($into) VALUES ($values)";

if($debug == true) {
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully ($values)";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

?>
