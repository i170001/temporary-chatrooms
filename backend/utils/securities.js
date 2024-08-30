const jwt = require('jsonwebtoken');

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT
};

function createJWT(payload) {
    return jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: "24h" }
    );
}

function getExpiry(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson);
    return decoded.exp;
}

function verifyJWT(token) {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (err) {
        return null;
    }
}