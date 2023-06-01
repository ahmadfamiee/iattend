<?php
include('db.php');

$id =  $decodedData['id'];



    $query = "delete from todo_list where id = '$id'";

    $R = mysqli_query($conn, $query);

    if ($R) {
        $message = "success";
    } else {
        $message = "error";
    }

$response[] = array("message" => $message);

echo json_encode($response);