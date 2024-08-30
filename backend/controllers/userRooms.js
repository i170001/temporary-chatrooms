const UserRooms = require('../models/userRooms');

const getUserPresence = async (req, res) => {
  const { roomID } = req.params;

  try {
    const result = await UserRooms.getUserPresence(roomID);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      throw new Error('User presence retrieval failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getUserPresence
};