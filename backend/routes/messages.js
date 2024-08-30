const express = require('express');
const messagesController = require('../controllers/messages');
const router = express.Router();

router.post('/save', messagesController.saveMessage);
router.get('/get', messagesController.getMessages);

module.exports = router;