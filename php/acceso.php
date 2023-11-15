<?php
require_once 'conexion.php';
$accion =  $_POST['accion'];

switch ($accion) {
    case 1:
        $nombre = $_POST['name'];
        $apellidos = $_POST['apellido'];
        $correo = $_POST['email'];
        $contraseña = $_POST['pass'];
        $profesion = $_POST['profesion'];

        $sql = "INSERT INTO usuarios (nombre, apellidos, correo, contraseña, profesor) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ssssi", $nombre, $apellidos, $correo, $contraseña, $profesion);
            if ($stmt->execute()) {
                session_start();
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $correo;
                header("Location: ../html/horario.html");
                exit;
            } else {
                echo "Error al ejecutar la consulta: " . $stmt->error;
            }
        } else {
            echo "Error en la preparación de la consulta: " . $conn->error;
        }

        $stmt->close();
        break;
    case 2:
        $email = $_POST['email'];
        $password = $_POST['pass'];
        $sql = "SELECT contraseña FROM usuarios WHERE correo = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $passwordconf = $row['contraseña'];
            if ($password == $passwordconf) {
                header("Location: ../html/horario.html");
            } else {
                header("Location: ../html/acceso.html");
            }
        } else {
            echo "Correo electrónico no registrado";
        }
        break;
    case 3:
        break;
    default:
        echo "Opción no válida";
}
$conn->close();
