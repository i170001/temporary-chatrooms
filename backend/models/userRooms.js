const UserRoom = require('../daos/userRooms');
const User = require('../daos/users');

const getUserPresence = async (roomID) => {
  const userRooms = await UserRoom.find({ roomID: roomID });
  const userIDs = userRooms.map(userRoom => userRoom.userID);
  const users = await User.find({ _id: { $in: userIDs } });
  const userPresence = users.map(user => ({ username: user.username, avatar: user.avatar }));
  
  return { success: true, data: userPresence };
}

module.exports = {
  getUserPresence
};