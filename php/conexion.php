<?php
$server = "localhost";
$username = "root";
$password = "";
$dbname = "conectando";

$conn = new mysqli($server, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
