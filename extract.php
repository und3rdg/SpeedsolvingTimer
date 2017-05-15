<?php
include("db.php");
include("inc.php");

$sql = "SELECT * FROM $table ORDER BY id DESC LIMIT $limit";
$result = mysqli_query($conn,$sql);

        while($row = mysqli_fetch_array($result)){
            echo "<tr>
                <td>" . $row['id'] . "</td>
                <td>" . $row['times_ms'] . "</td>
                </tr>";
        }




$conn->close();
?>
