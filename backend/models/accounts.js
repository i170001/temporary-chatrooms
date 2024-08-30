const { urlencoded } = require("express");
const Account = require("../daos/accounts");
const Security = require("../utils/securities");

module.exports = {
    getAccounts,
    getLoginDetails,
    loginAccount,
    createAccount,
    logoutAccount
};

function getAccounts(queryFields) {
    return Account.find(queryFields);
}

async function getLoginDetails(queryFields) {
    const loginFields = {
        email: 1,
        salt: 1,
        iterations: 1
    };
    if (!queryFields.hasOwnProperty("email")) {
        return { success: false, error: "missing email" };
    }
    const accountEmail = decodeURIComponent(queryFields.email);
    const loginFieldsRes = await Account.findOne({ "email": accountEmail }, loginFields);
    return { success: true, data: loginFieldsRes };
}

async function loginAccount(body) {
    if (!body.hasOwnProperty("email")) {
        return { success: false, error: "missing email" };
    }
    if (!body.hasOwnProperty("password")) {
        return { success: false, error: "missing password" };
    }

    const account = await Account.findOne({ "email": body.email, "password": body.password });
    if (account == null || Object.keys(account).length == 0) {
        return { success: false, error: "Invalid email/password" };
    }

    const jwtPayload = {
        email: account.email
    };
    const token = Security.createJWT(jwtPayload);
    const expiry = Security.getExpiry(token);
    await Account.updateOne({ "email": body.email }, { token: token, expire_at: expiry });
    return { success: true, data: token };
}

async function logoutAccount(body) {
    if (!body.hasOwnProperty("email")) {
        return { success: false, error: "missing email" };
    }
    await Account.updateOne({ "email": body.email }, { token: null, expire_at: null });
    return { success: true, data: "logout successful!" };
}

async function createAccount(body) {
    const account = await Account.findOne({ "email": body.email });
    if (account) {
        return { success: false, error: "account already exists" };
    }
    const newAccount = await Account.create(body);
    return { success: true, data: newAccount };
}