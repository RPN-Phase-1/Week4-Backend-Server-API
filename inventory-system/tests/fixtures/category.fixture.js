const { v4 } = require('uuid')
const faker = require('faker')
const prisma = require('../../prisma')

const categoryOne = {
    id: v4(),
    name: faker.vehicle.type()
}

const insertCategory = async(category) => {
    await prisma.category.createMany({
        data: category,
        skipDuplicates: true
    })
}

module.exports ={
    categoryOne,
    insertCategory
}