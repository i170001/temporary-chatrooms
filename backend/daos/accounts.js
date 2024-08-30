const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    iterations: {
        type: Number,
        required: true,
    },
    token: {
        type: String,
    },
    expire_at: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Account", accountSchema);