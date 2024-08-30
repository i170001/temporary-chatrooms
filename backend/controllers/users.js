const Users = require('../models/users');

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const result = await Users.createUser(userData);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      throw new Error('User creation failed');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserDetails = async (req, res) => {
  const username = req.query.username;

  try {
    const result = await Users.getUserDetails(username);
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
  createUser,
  getUserDetails
};