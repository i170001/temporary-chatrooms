const User = require('../daos/users');

const createUser = async (userData) => {
  const newUser = await User.create(userData);
  return {success: true, data: newUser};
};

const getUserDetails = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return { success: true, data: { id: user._id, avatar: user.avatar } }; // include the avatar in the response
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  createUser,
  getUserDetails
};