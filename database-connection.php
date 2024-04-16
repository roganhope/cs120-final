<?php

require_once("database-credentials.php");
echo "hello";
echo "<br>";
echo $server;
echo "<br>";
echo $userid;
echo "<br>";
echo $pw;
echo "<br>"; 
echo $db;

$conn = new mysqli($server, $userid, $pw, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


