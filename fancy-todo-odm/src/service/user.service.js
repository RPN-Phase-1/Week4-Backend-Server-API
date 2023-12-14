const User = require('../models/user.model');

const createUser = async (name, email, phone) => {
  const user = await User.create({ name, email, phone });
  return user;
};
module.exports = { createUser };
