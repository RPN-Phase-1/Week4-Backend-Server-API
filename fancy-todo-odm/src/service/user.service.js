const User = require('../models/user.model');

const getAllUsers = async () => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: 'todos',
        localField: '_id',
        foreignField: 'user',
        as: 'todos',
      },
    },
  ]);
  return users;
};
const createUser = async (name, email, phone) => {
  const user = await User.create({ name, email, phone });
  return user;
};
module.exports = { getAllUsers, createUser };
