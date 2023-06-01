<?php
include('db.php');

$task = $decodedData['task'];


    $query = "INSERT INTO todo_list(task) VALUES ('$task')";

    $R = mysqli_query($conn, $query);

    if ($R) {
        $message = "success";
    } else {
        $message = "error";
    }

$response[] = array("message" => $message);

echo json_encode($response);