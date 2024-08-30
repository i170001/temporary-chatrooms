const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);