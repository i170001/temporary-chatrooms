import * as userRoomsAPI from "../apis/userRooms";

export async function getUserPresence(roomID) {
  const users = await userRoomsAPI.getUserPresence(roomID);
  return users;
}