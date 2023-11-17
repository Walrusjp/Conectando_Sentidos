<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$accion = (isset($_GET['accion'])) ? $_GET['accion'] : 'leer';
switch ($accion) {
    case 'agregar':
        $title = $_POST['title'];
        $descripcion = $_POST['description'];
        $start = $_POST['start'];
        $end = $_POST['end'];
        $color = $_POST['color'];

        $sql = "INSERT INTO horario (title, description, start, end, color)
                VALUES ('$title', '$descripcion', '$start', '$end', '$color')";

        if ($conn->query($sql) === TRUE) {
            $respuesta = "Registro insertado correctamente";
        } else {
            $respuesta = "Error al insertar el registro: " . $conn->error;
        }

        echo json_encode($respuesta);
        break;
    case 'eliminar':
        $respuesta = false;
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $sql = "DELETE FROM horario WHERE ID = $id";
            if ($conn->query($sql) === TRUE) {
                $respuesta = true;
            } else {
                $respuesta = false;
            }
        }
        echo json_encode($respuesta);
        break;
    case 'modificar':
        $title = $_POST['title'];
        $descripcion = $_POST['description'];
        $start = $_POST['start'];
        $end = $_POST['end'];
        $color = $_POST['color'];
        $id = $_POST['id'];

        $sql = "UPDATE horario SET 
            title = '$title',
            description = '$descripcion',
            start = '$start',
            end = '$end',
            color = '$color'
        WHERE id = '$id'";

        // Suponiendo que $conn representa tu conexión a la base de datos

        if ($conn->query($sql) === TRUE) {
            $respuesta = "Registro actualizado correctamente";
        } else {
            $respuesta = "Error al actualizar el registro: " . $conn->error;
        }

        echo json_encode($respuesta);
        break;
    default:
        $sql = "SELECT horario.id, horario.description, horario.start, horario.end, horario.color, materia.nombre AS title
        FROM horario
        INNER JOIN materia ON horario.title = materia.NRC;";
        $result = $conn->query($sql);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($rows);
}

$conn->close();
