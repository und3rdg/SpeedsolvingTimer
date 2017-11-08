<?php
include("db.php");

function convTime($x) {
    $msec    = $x % 1000;
    $sec_num = floor($x / 1000);
    $hours   = floor($sec_num / 3600);
    $minutes = floor(($sec_num - ($hours * 3600)) / 60);
    $seconds = $sec_num - ($hours * 3600) - ($minutes * 60);

    if ($hours <  10)   {$hOut = "0" . $hours . ":";}
    if ($hours >= 10)   {$hOut = $hours . ":";}
    if ($hours <  1 )   {$hOut = "";}

    if ($minutes <  10) {$mOut = "0" . $minutes . ":";}
    if ($minutes >= 10) {$mOut = $minutes . ":";}
    if ($minutes <  1 ) {$mOut = "";}
   
    if ($seconds <  10) {$sOut = "0" . $seconds . ".";}
    if ($seconds >= 10) {$sOut = $seconds . ".";}
    //if ($seconds <  1 ) {$sOut = "";}

    if ($msec < 100) {$msec = "0" . $msec;}
    if ($msec < 10) {$msec = "0" . $msec;}
 
    return $hOut  . $mOut . $sOut . $msec;
}

// last scores to show
$limit = 12;

$sql = "SELECT * FROM $table ORDER BY id DESC LIMIT $limit";
$result = mysqli_query($conn,$sql);

        while($row = mysqli_fetch_array($result)){
            $time = convTime($row['times_ms']);
            $date = $row['date'];
            $plus2 = '<a href="">+2</a> ';
            $dnf = '<a href="">DNF</a> ';
            $del = '<a href="">del</a> ';
            echo "<tr>
                <td>" . $row['id'] . "</td>
                <td>" . $time . "</td>
                <td>" . $date . "</td>
                <td>" . $plus2 . $dnf . $del . "</td>
                </tr>";
        }




$conn->close();
?>
