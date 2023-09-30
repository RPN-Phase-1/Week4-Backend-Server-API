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

const queryUsers = async (filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: keyword
            }
        },
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            name: 'asc'
        }
    })
    return users
}

const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id }
    })
}

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId)

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    updateBody.password = bcrypt.hashSync(updateBody.password, 8)
    const updateUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: updateBody
    })

    return updateUser;
}

const deleteUserById = async (userId) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: userId
        },
    })

    return deleteUser
}

const queryProducts = async (userId, filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options
    const products = await prisma.user.findMany({
        where: {
            id: userId
        },
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            name: 'asc'
        },
        include: {
            product: true
        }
    })
    return products
}

const queryOrders = async (userId, filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options
    const orders = await prisma.user.findMany({
        where: {
            id: userId
        },
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            name: 'asc'
        },
        include: {
            order: true
        }
    })
    return orders
}

module.exports = {
    createUser,
    getUserByEmail,
    queryUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    queryProducts,
    queryOrders,
};