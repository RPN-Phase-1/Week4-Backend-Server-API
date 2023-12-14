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

const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};
// const getUser = async (_id) => {
//   const user = await User.aggregate([
//     {
//       $match: {
//         _id,
//       },
//     },
//     {
//       $lookup: {
//         from: 'todos',
//         localField: '_id',
//         foreignField: 'userId',
//         as: 'todos',
//       },
//     },
//   ]);

//   return user;
// };
module.exports = { getAllUsers, createUser, getUser };
