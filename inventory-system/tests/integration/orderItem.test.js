const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const { admin, insertUsers, userOne } = require('../fixtures/user.fixture');
const { orderOne, insertOrder } = require('../fixtures/order.fixture');
const { categoryOne, insertCategory } = require('../fixtures/category.fixture');
const { orderItemOne, insertOrderItems } = require('../fixtures/orderItem.fixture')
const { productOne, insertProducts } = require('../fixtures/product.fixture')
const { adminAccessToken, userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { v4 } = require('uuid')

describe('orderItem routes', () =>{
    let newOrderItem;
    beforeEach(async () => {
        await insertUsers([admin, userOne])
        await insertCategory([categoryOne])
        await insertProducts([productOne])
        await insertOrder([orderOne])
        await insertOrderItems([orderItemOne])

        newOrderItem = {
            orderId: orderOne.id,
            productId: productOne.id,
            quantity: faker.number.int({min: 1, max: 100}),
            unitPrice: faker.number.float({min: 10 , max: 10000}),
        }
    })

    describe('GET & POST /v1/orderItem', () =>{
        test('should return 200 OK if success get orderItems', async() => {
            await request(app)
            .get('/v1/orderItem')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('should return 201 CREATED if success create orderItem', async() => {
            const res = await request(app)
            .post('/v1/orderItem')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrderItem)
            .expect(httpStatus.CREATED)

            const orderItemData = res.body.data;
        
            const dbOrderItem = await prisma.orderItem.findUnique({
                where:{id: orderItemData.id}
            })

            expect(dbOrderItem).toBeDefined();
            expect(dbOrderItem).toMatchObject({
                id: expect.anything(),
                orderId: orderOne.id,
                productId: productOne.id,
                quantity: orderItemData.quantity,
                unitPrice: orderItemData.unitPrice,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
        })
    })

    describe('/v1/orderItem/:orderItemId', () => {
        test('should return 200 OK, if success get orderItems by orderItemId', async() => {

            await request(app)
            .get(`/v1/orderItem/${orderItemOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('Should return 200 and success update orderItems by orderItemId', async () => {
            newOrderItem = {
                unitPrice: faker.number.float()
            }

           const res =  await request(app)
            .patch(`/v1/orderItem/${orderItemOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrderItem)
            .expect(httpStatus.OK)

            const orderItemData = res.body.data;
            
            const dbOrderItem = await prisma.orderItem.findUnique({
                where: {id: orderItemData.id}
            })

            expect(dbOrderItem).toBeDefined();
            expect(dbOrderItem).toMatchObject({
                id: expect.anything(),
                orderId: orderOne.id,
                productId: productOne.id,
                quantity: orderItemData.quantity,
                unitPrice: orderItemData.unitPrice,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
          });

          test('should return 200 OK if success delete orderItems by orderItemId', async() =>{

            await request(app)
            .delete(`/v1/orderItem/${orderItemOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
          })
    })

    describe('ERROR TEST', () =>{
        test('should return 400 BAD REQUEST if orderItem id is not valid', async() => {
            await request(app)
            .get(`/v1/orderItem/noValidId`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 401 UNAUTHORIZED if no access token', async() => {
            await request(app)
            .get(`/v1/orderItem`)
            .send(newOrderItem)
            .expect(httpStatus.UNAUTHORIZED)
        })

        test('should return 403 FORBIDDEN, if role login is not admin', async() => {
            await request(app)
            .get(`/v1/orderItem`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newOrderItem)
            .expect(httpStatus.FORBIDDEN)
        })

        test('should return 403 BAD REQUEST if created orderItem with no orderID was found in send Data', async() => {
            newOrderItem = {
                productId: productOne.id,
                quantity: faker.number.int({min: 1, max: 100}),
                unitPrice: faker.number.float({min: 10 , max: 1000})
            }

            await request(app)
            .post('/v1/orderItem')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrderItem)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 403 BAD REQUEST if created orderItem with no productID was found in send Data', async() => {
            newOrderItem = {
                orderId: orderOne.id,
                quantity: faker.number.int({min: 1, max: 100}),
                unitPrice: faker.number.float({min: 10 , max: 1000})
            }

            await request(app)
            .post('/v1/orderItem')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrderItem)
            .expect(httpStatus.BAD_REQUEST)
        })
        
        
        test('should return 404 NOT_FOUND if no orderItem is found', async() => {
            await request(app)
            .get(`/v1/orderItem/${v4}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.NOT_FOUND)
        })

    })
})