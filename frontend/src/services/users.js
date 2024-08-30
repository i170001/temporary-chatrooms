import * as usersAPI from "../apis/users";

export async function createUser(username, avatar) {
  const user = await usersAPI.createUser(username, avatar);
  return user;
}

export async function getUserDetails(username) {
  const room = await usersAPI.getUserDetails(username);
  return room;
}