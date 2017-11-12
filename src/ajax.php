<?php
include("db.php");

$tbl_time_id = 'id';
$tbl_time = 'times_ms'; 
$tbl_date = 'date';
$tbl_plus2 = 'plus2';
$tbl_del = 'del';

$tmp_datetime = '2017-11-12 11:37:00';

// ADD TIME
if(isset($_GET['time_ms']) && !empty($_GET['time_ms'])){ 
    $time_ms = intval($_GET['time_ms']);
        $sql = "INSERT INTO $table ($tbl_time) VALUES ($time_ms)";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully ($values)";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
} 

// DELETE TIME
if(isset($_GET['del']) && !empty($_GET['del'])){
    $del_record = intval($_GET['del']);
    $sql = "UPDATE score SET $tbl_del=1 where $tbl_time_id=$del_record";

    if ($conn->query($sql) === TRUE) {
        echo "deleted ($del_record)";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();
?>
