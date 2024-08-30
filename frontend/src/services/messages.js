import * as messagesAPI from "../apis/messages";

export async function saveMessage(roomID, userID, avatar, content) { // using username instead for simplicity
  const savedMessage = await messagesAPI.saveMessage(roomID, userID, avatar, content);
  return savedMessage;
}

export async function getMessages(roomID) {
  const messages = await messagesAPI.getMessages(roomID);
  return messages;
}