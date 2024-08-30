const Rooms = require('../models/rooms');

const createRoom = async (req, res) => {
  const roomData = {
    ...req.body,
    createdBy: req.account.email
  }

  try {
    const result = await Rooms.createRoom(roomData);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      throw new Error('Room creation failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const joinRoom = async (req, res) => {
  const roomData = req.params.roomID;
  const { username, avatar } = req.body;
  const userData = { username, avatar };

  try {
    const result = await Rooms.joinRoom(roomData, userData);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      throw new Error('Room join failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const leaveRoom = async (req, res) => {
  const { username, avatar } = req.body;
  const userData = { username, avatar };

  try {
    const result = await Rooms.leaveRoom(userData);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      throw new Error('Room leave failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRoomDetails = async (req, res) => {
  const id = req.params.roomID;

  try {
    const result = await Rooms.getRoomDetails(id);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      throw new Error(result.error);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoomDetails
};