const Message = require('../daos/messages');

const saveMessage = async (messageData) => {
  console.log('Saving message:', messageData);
  const newMessage = await Message.create(messageData);
  return {success: true, data: newMessage};
};

const getMessages = async (roomID) => {
  const messages = await Message.find({ roomID }).sort('createdAt');
  return {success: true, data: messages};
};

module.exports = {
  saveMessage,
  getMessages
};