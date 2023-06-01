<?php
include('db.php');

$time = $decodedData['time'];
$clockIn = $decodedData['clock_in'];
$clockOut = $decodedData['clock_out'];
$date = $decodedData['date'];

    $query = "INSERT INTO atd_history(time, clock_in, clock_out,date) VALUES ('$time', '$clockIn', '$clockOut' ,'$date')";

    $R = mysqli_query($conn, $query);

    if ($R) {
        $message = "success";
    } else {
        $message = "error";
    }

$response[] = array("message" => $message);

echo json_encode($response);