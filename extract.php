<?php
include("db.php");
include("inc.php");

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

$sql = "SELECT * FROM $table ORDER BY id DESC LIMIT $limit";
$result = mysqli_query($conn,$sql);

        while($row = mysqli_fetch_array($result)){
            $time = convTime($row['times_ms']);
            echo "<tr>
                <td>" . $row['id'] . "</td>
                <td>" . $time . "</td>
                </tr>";
        }




$conn->close();
?>
