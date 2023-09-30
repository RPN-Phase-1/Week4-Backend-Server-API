const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

const createProduct = async (productBody) => {
    return prisma.product.create({
        data: productBody
    })
}

const queryProducts = async (filter, options) => {
    const { keyword } = !filter
    const { page, maxRow } = !options
    const products = await prisma.product.findMany({
        where: {
            category: {
                name: {
                    contains: keyword
                }
            }
        },
        include: {
            category: true
        },
        skip: page && parseInt(page),
        take: maxRow && parseInt(maxRow),
        orderBy: {
            name: 'asc'
        }
    })

    return products
}

const getProductById = async (id) => {
    return prisma.product.findFirst({
        where: {
            id
        }
    })
}

const updateProductById = async (productId, updateBody) => {
    const product = await getProductById(productId)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }

    const updateProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: updateBody
    })

    return updateProduct
}

const deleteProductById = async (productId) => {
    const product = await getProductById(productId)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }

    const deleteProduct = await prisma.product.delete({
        where: {
            id: productId
        },
    })

    return deleteProduct
}

module.exports = {
    createProduct,
    queryProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}