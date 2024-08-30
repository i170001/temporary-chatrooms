const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoomSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  roomID: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserRoom", userRoomSchema);