const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sql = require('mssql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de la base de datos
const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'tu_servidor',
  database: 'tu_base_de_datos',
};

// Conexión a la base de datos
sql.connect(config, (err) => {
  if (err) console.error(err);
  else console.log('Conexión exitosa a la base de datos.');
});

// Configuración del servidor
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Manejo de conexiones de Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');
 
    // Escuchar mensajes del cliente y retransmitirlos a todos los clientes
    socket.on('chat message', (message) => {
       const timestamp = new Date(); // Obtener la marca de tiempo actual
       const formattedTime = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
       const messageWithTime = { message: `${formattedTime} - ${message}`, timestamp: formattedTime };
       io.emit('chat message', messageWithTime);
    });

  // Ejemplo: Enviar un mensaje desde el servidor a todos los clientes
  io.emit('chat message', '¡Hola a todos!');

  // Aquí puedes agregar más lógica para manejar los mensajes del chat
  
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
