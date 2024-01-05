const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody
  });
};


/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const getUserById = async (userId) =>{
  return prisma.user.findFirst({
    where:{
      id:userId
    }
  })
}

const getAllUsers = async(skip=0,take=10)=>{
  let users = await prisma.user.findMany({
    skip:parseInt(skip),
    take:parseInt(take),
   
  })

  return users
}

const updateUserById = async (userId, updateBody) => {
  
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateBody
  })

  return updateUser;
};

const deleteUserById = async (userId, updateBody) => {
  
  const deleteUser = await prisma.user.deleteMany({
    where: {
      id: userId,
    }
  })

  return deleteUser;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};