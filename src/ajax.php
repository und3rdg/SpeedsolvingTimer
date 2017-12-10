<?php
include("db.php");

$tbl_time_id = 'id';
$tbl_time = 'times_ms'; 
$tbl_date = 'date';
$tbl_plus2 = 'plus2';
$tbl_dnf = 'dnf';
$tbl_del = 'del';

$tmp_datetime = "'2017-11-12 11:37:00'";

// DRY it some time later

// ADD TIME
if(isset($_GET['time_ms']) && !empty($_GET['time_ms'])){ 
  $time_ms = intval($_GET['time_ms']);
  /* $time_date = $tmp_datetime; */
  $time_date = $_GET['date'];
  $sql = "INSERT INTO $table($tbl_time, $tbl_date) 
                      VALUES ($time_ms, '$time_date')";

  if ($conn->query($sql) === TRUE) {
    echo "$time_date New record created successfully ($time_ms ms)";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
} 

// PLUS TWO SEC
if(isset($_GET['plus2']) && !empty($_GET['plus2'])){
  $del_record = intval($_GET['plus2']);
  $sql = "UPDATE $table 
    SET $tbl_plus2 = NOT $tbl_plus2 
    where $tbl_time_id = $del_record";

  if ($conn->query($sql) === TRUE) {
    echo "deleted ($del_record)";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
// DO NOT FINISH SOLVE 
if(isset($_GET['dnf']) && !empty($_GET['dnf'])){
  $del_record = intval($_GET['dnf']);
  $sql = "UPDATE $table 
    SET $tbl_dnf = NOT $tbl_dnf 
    where $tbl_time_id = $del_record";

  if ($conn->query($sql) === TRUE) {
    echo "deleted ($del_record)";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
// DELETE TIME
if(isset($_GET['del']) && !empty($_GET['del'])){
  $del_record = intval($_GET['del']);
  $sql = "UPDATE $table 
    SET $tbl_del = NOT $tbl_del 
    where $tbl_time_id = $del_record";

  if ($conn->query($sql) === TRUE) {
    echo "deleted ($del_record)";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}


$conn->close();
?>
