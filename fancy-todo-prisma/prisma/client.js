const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma

//run npx prisma db push : untuk push database ke prisma
//run npx prisma generate : untuk menggenerate database
//run npx prisma studio : untuk melihat database