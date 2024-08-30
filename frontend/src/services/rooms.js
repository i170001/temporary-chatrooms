import * as roomsAPI from "../apis/rooms";

export async function createRoom(roomUUID) {
  const room = await roomsAPI.createRoom(roomUUID);
  return room;
}

export async function joinRoom(roomUUID, user) {
  const room = await roomsAPI.joinRoom(roomUUID, user);
  return room;
}

export async function leaveRoom(roomUUID, user) {
  const room = await roomsAPI.leaveRoom(roomUUID, user);
  return room;
}

export async function getRoomDetails(roomUUID) {
  const room = await roomsAPI.getRoomDetails(roomUUID);
  return room;
}