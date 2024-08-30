const express = require('express');
const userRoomsController = require('../controllers/userRooms');
const router = express.Router();

router.get('/:roomID/users', userRoomsController.getUserPresence);

module.exports = router;