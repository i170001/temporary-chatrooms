const User = require('../daos/users');
const Room = require('../daos/rooms');
const UserRoom = require('../daos/userRooms');

const createRoom = async (roomData) => {
  const newRoom = await Room.create(roomData);
  return {success: true, data: newRoom};
};

const joinRoom = async (roomData, { username, avatar }) => {
  const user = await User.findOne({ username });
  if (!user) {
    return {success: false, error: 'User not found'};
  }

  const room = await Room.findOne({ id: roomData });
  if (!room) {
    return {success: false, error: 'Room not found'};
  }

  // if no owner, set owner to user
  if (!room.owner) {
    room.owner = user._id;
    await room.save();
  }

  // create a new UserRoom document
  // console.log('Creating UserRoom for', user._id, 'and', room._id);
  const userRoom = await UserRoom.create({
    userID: user._id,
    roomID: room._id,
  });
  // console.log('Created UserRoom:', userRoom);

  return {success: true, data: { room, userRoom }};
};

const leaveRoom = async ({ username, avatar }) => {
  const user = await User.findOne({ username });
  if (!user) {
    return {success: false, error: 'User not found'};
  }

  await UserRoom.deleteOne({ userID: user._id});

  return {success: true};
};

const getRoomDetails = async (id) => {
  try {
    const room = await Room.findOne({ id: id });
    if (room) {
      return { success: true, data: room._id };
    } else {
      throw new Error('Room not found');
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoomDetails
};