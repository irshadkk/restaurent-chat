import http from 'http';
import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import config from '../config/config.json';
import path from 'path';

// setup server
const app = express();
const server = http.createServer(app);

const socketIo = io(server);

// Allow CORS
app.use(cors());

// Render a API index page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Start listening
server.listen(process.env.PORT || config.port);
console.log(`Started on port ${config.port}`);

// Setup socket.io
socketIo.on('connection', socket => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);

  socket.on('client:message', data => {
    console.log(`${data.username}:------ ${data.message}`);

    // message received from client, now broadcast it to everyone else ohter than the sender
    //socket.broadcast.emit('server:message', data);
    var _responseData={username:'waiter',message:'Hello dear '+data.username+',thanks for choosing to order food with us!'+
    'Click on the following link to see our Menu and choose from that'};
    socket.emit('server:message', _responseData);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });
});

export default app;
