<?php
include('db.php');

$email = $decodedData['email'];


// $password = $decodedData['password']; //password is hashed

// $SQL = "SELECT * FROM users WHERE email = '$email'";
// $exeSQL = mysqli_query($conn, $SQL);
// $checkEmail =  mysqli_num_rows($exeSQL);

$SQL = "SELECT * FROM users WHERE email = '$email'";
$exeSQL = mysqli_query($conn, $SQL);
$checkEmail =  mysqli_num_rows($exeSQL);


if ($checkEmail != 0) { // user first time signin
    $message = "success";
} else { // user data exists in db

    $query = "INSERT INTO users(email) VALUES ('$email')";

    $R = mysqli_query($conn, $query);

    if ($R) {
        $message = "success";
    } else {
        $message = "error";
    }
}

$response[] = array("message" => $message);

echo json_encode($response);