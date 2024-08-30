const Security = require("../utils/securities");

module.exports = {
    checkJWT,
    checkLogin,
    checkPermission
};

function checkJWT(req, res, next) {
    let token = req.get("Authorization") || req.query.token;
    if (token) {
        token = token.replace("Bearer ", "");
        req.account = Security.verifyJWT(token);
        console.log("JWT verified, account:", req.account);
    } else {
        req.account = null;
        console.log("No token provided");
    }
    return next();
}

function checkLogin(req, res, next) {
    console.log("Checking login, account:", req.account);
    if (!req.account) return res.status(401).json("Unauthorized");
    next();
}

function checkPermission(req, res, next) {
    console.log("Checking permission, account:", req.account);
    if (!req.account) {
        console.log("No account found in request");
        return res.status(401).json("Unauthorized");
    }
    if (req.body.email !== req.account.email) {
        console.log(`Permission denied: req.body.email (${req.body.email}) does not match req.account.email (${req.account.email})`);
        return res.status(401).json("Unauthorized");
    }
    next();
}