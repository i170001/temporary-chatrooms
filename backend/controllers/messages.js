const Messages = require('../models/messages');

const saveMessage = async (req, res) => {
  const { roomID, userID, avatar, content } = req.body;
  console.log('Request body:', req.body); // debug log

  try {
    const result = await Messages.saveMessage({ roomID, userID, avatar, content });

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      throw new Error('Message save failed');
    }
  } catch (err) {
    console.error('Error:', err); // debug log
    res.status(400).json({ message: err.message });
  }
}

const getMessages = async (req, res) => {
  const { roomID } = req.query;

  try {
    const result = await Messages.getMessages(roomID);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      throw new Error('Message retrieval failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  saveMessage,
  getMessages
};