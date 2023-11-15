CREATE DATABASE conectando;
USE conectando;
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(250) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contraseña CHAR(10) NOT NULL,
    profesor BOOLEAN NOT NULL
);
CREATE TABLE materia (
    NRC INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    docente INT NOT NULL,
    FOREIGN KEY (docente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE horario (
    id_horario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_materia INT NOT NULL,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (id_materia) REFERENCES materia(NRC) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE usuarios_materias (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_materia INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materia(NRC) ON DELETE CASCADE ON UPDATE CASCADE
);