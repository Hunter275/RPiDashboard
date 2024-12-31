// https://medium.com/@emperorbrains/building-real-time-applications-with-vue-js-and-websockets-3db2dd8d5d7c

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./DatabaseService');

// HTTP
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

app.get('/logs', (req, res) => {
  let { count } = req.body;
  if (!count) {
    count = 10;
  }
  const data = db.query("SELECT * FROM logs LIMIT 10");
  res.json(data);
});

app.post('/log', (req, res) => {
  db.createLog(req.body.title, req.body.msg);
  io.emit('log', JSON.stringify(req.body));
  res.json({ message: "Log created." });
});

// Socket.io
const io = socketIo(server, { origins: '*:*'});
io.on('connection', (socket) => {
  console.log(`New client ${socket.handshake.address} connected`);
  
  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.emit('message', message); // Broadcast the message to all clients
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}); 

// Listening
app.listen(3000, () => {
  console.log('HTTP Server is listening on port 3000');
});
server.listen(4000, () => {
  console.log('Socket Server is listening on port 4000');
});