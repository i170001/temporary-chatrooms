const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

router.post('/create', usersController.createUser);
router.get('/details', usersController.getUserDetails);

module.exports = router;