const express = require('express');
const roomsController = require('../controllers/rooms');
const router = express.Router();
const securityMiddleware = require('../middlewares/securities');

router.post('/create', securityMiddleware.checkPermission, roomsController.createRoom);
router.post('/:roomID/join', roomsController.joinRoom);
router.post('/:roomID/leave', roomsController.leaveRoom);
router.get('/:roomID/details', roomsController.getRoomDetails);

module.exports = router;