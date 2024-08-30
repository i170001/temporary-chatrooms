const express = require('express');
const accountController = require('../controllers/accounts');
const securityMiddleware = require('../middlewares/securities');

const router = express.Router();

// get account details (requires login + correct permissions)
router.get("/", securityMiddleware.checkPermission, accountController.getAccounts);

// login routes
router.get("/login", accountController.getLoginDetails);
router.post("/login", accountController.loginAccount);

// logout route (requires login + correct permissions)
router.post("/logout", securityMiddleware.checkPermission, accountController.logoutAccount);

// create account route
router.post("/create", accountController.createAccount);

module.exports = router;