const express = require('express');
const http = require('http');
const cors = require('cors');
const socketController = require('./controllers/socket');
const app = express();
const server = http.createServer(app);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const roomsRouter = require('./routes/rooms');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const userRoomsRouter = require('./routes/userRooms');
const accountsRouter = require('./routes/accounts');
const securityMiddleware = require('./middlewares/securities');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://temporary-chatrooms.onrender.com/',
  credentials: true,
}));
app.use(securityMiddleware.checkJWT);

require('dotenv').config();
require("./client/mongo");
socketController(server);

// mount routes
app.use('/rooms', roomsRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/userrooms', userRoomsRouter);
app.use('/accounts', accountsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
