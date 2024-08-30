const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomID: {
    type: String, // keeping rooomID as string for consistency and simplicity
    required: true,
  },

  userID: {
    type: String, // using username as userID on purpose here for reasons
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);