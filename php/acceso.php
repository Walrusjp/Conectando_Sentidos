<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/logoCS.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Usuario no encontrado</title>
    <style>
         .submit{
            border: none;
            outline: none;
            height: 10%;
            width: 30%;
            background: rgba(156, 37, 93, 0.849);
            color: #fff;
            border-radius: 5px;
            transition: .4s;
            position: absolute;
            left: 0%;
            top: 0%;
            font: bold 1.5em/1.5 "Arial Black", Arial, sans-serif;
        }
        .submit:hover{
            border: 1px solid #000;
            background: #ececec;
            color: #000;
            
        }
        p{
            position: absolute;
            left: 25%;
            top: 40%;
            font: bold 3em/1.5 "Arial Black", Arial, sans-serif;
            color: #000;
        }
    </style>
</head>
</html>
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
            //echo "Correo electrónico no registrado";
            echo'<form method="post" action="../html/acceso.html"><input type="submit" class="submit" id="btnEntrar" value="Volver"></form>
            <br><br><p>USUARIO NO ENCONTRADO!</p>';
        }
        break;
    case 3:
        break;
    default:
        echo "Opción no válida";
}
$conn->close();