<?php
include('db.php');

    $query = 'SELECT * FROM atd_history';
    $R = mysqli_query($conn, $query);

    $rows = array();

    while($r = mysqli_fetch_assoc($R)) {
        $rows[] = $r;
    }
    print json_encode($rows);

