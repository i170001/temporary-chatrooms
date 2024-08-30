const { Server } = require("socket.io");
const { joinRoom, leaveRoom } = require("../models/rooms");

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // allow all origins
      methods: ["GET", "POST"], // allow GET and POST methods
      allowedHeaders: ["my-custom-header"], // allow specific headers
      credentials: true // allow cookies
    }
  });

  let socketMap = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    // join room
    socket.on('join room', async (room, username, avatar) => {
      try {
        const result = await joinRoom(room, { username, avatar }); // call joinRoom logic here (refactor this in future)
        if (result.success) {
          socket.join(room);
          socketMap[socket.id] = { room, username, avatar }; // store room, username, and avatar for the socket
          io.to(room).emit('user joined', { username, avatar }); // emit event to all clients in the room
        } else {
          console.error('Error joining room:', result.error);
        }
      } catch (err) {
        console.error('Error joining room:', err);
      }
    });

    // leave room
    socket.on('leave room', (room, username, avatar) => {
      socket.leave(room);
      delete socketMap[socket.id]; // remove room, username, and avatar for the socket
      io.to(room).emit('user left', { username, avatar }); // emit event to all clients in the room
    });

    // send message to room
    socket.on('send message', (room, message) => {
      const createdAt = new Date(); // generate timestamp
      const newMessage = { ...message, createdAt }; // add timestamp to message
      io.to(room).emit('receive message', newMessage);
      console.log('Message sent:', newMessage);
    });

    // handle user disconnect
    socket.on('disconnect', async () => {
      console.log('Client disconnected');
      const { room, username, avatar } = socketMap[socket.id] || {}; // get room, username, and avatar for this socket
      if (room && username) {
        try {
          const result = await leaveRoom({ username, avatar });
          if (result.success) {
            io.to(room).emit('user left', { username, avatar }); // emit event to all clients in the room
          } else {
            console.error('Error leaving room:', result.error);
          }
        } catch (err) {
          console.error('Error leaving room:', err);
        }
      }
      delete socketMap[socket.id]; // remove room, username, and avatar for this socket
    });
  });
};

module.exports = socket;