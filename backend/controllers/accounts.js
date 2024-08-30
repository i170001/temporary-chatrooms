const modelAccounts = require("../models/accounts");

module.exports = {
    getAccounts,
    getLoginDetails,
    loginAccount,
    logoutAccount,
    createAccount
};

async function getAccounts(req, res) {
    try {
        const accountData = await modelAccounts.getAccounts(req.query);
        res.json({ accounts: accountData });
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function getLoginDetails(req, res) {
    try {
        const loginDetails = await modelAccounts.getLoginDetails(req.query);
        if (loginDetails.success !== true) {
            res.status(400).json({ errorMsg: loginDetails.error });
            return;
        }
        res.json(loginDetails.data);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function loginAccount(req, res) {
    try {
        const token = await modelAccounts.loginAccount(req.body);
        if (!token.success) {
            res.status(400).json({ errorMsg: token.error });
            return;
        }
        res.json(token.data);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function logoutAccount(req, res) {
    try {
        const result = await modelAccounts.logoutAccount(req.body);
        if (!result.success) {
            res.status(400).json({ errorMsg: result.error });
            return;
        }
        res.json(result.data);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}

async function createAccount(req, res) {
    try {
        const accountData = await modelAccounts.createAccount(req.body);
        res.json(accountData);
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
}