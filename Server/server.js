// https://medium.com/@emperorbrains/building-real-time-applications-with-vue-js-and-websockets-3db2dd8d5d7c


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./DatabaseService');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { origins: '*:*'});

app.use(cors());


const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a GET route
app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

app.get('/logs', (req, res) => {
  console.log("GET /logs");
  let { count } = req.body;
  if (!count) {
    count = 10;
  }
  console.log(`COUNT ${count}`);
  const data = db.query("SELECT * FROM logs LIMIT 10");
  res.json(data);
});

// Define a POST route
app.post('/log', (req, res) => {
  db.createLog(req.body.title, req.body.msg);
  io.emit('log', JSON.stringify(req.body));
  res.json({ message: "Log created." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

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

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});