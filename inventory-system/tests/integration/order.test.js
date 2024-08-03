const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const { admin, insertUsers, userOne } = require('../fixtures/user.fixture');
const { orderOne, insertOrder } = require('../fixtures/order.fixture');
const {adminAccessToken, userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { v4 } = require('uuid')

describe('Order routes', () =>{
    let newOrder, getOrder;
    beforeEach(async () => {
        await insertUsers([admin, userOne])
        newOrder = {
            date: faker.date.recent(),
            customerName: faker.name.findName(),
            customerEmail: faker.internet.email(),
            userId: userOne.id,
        }

        getOrder = {
            id: v4(),
            date: faker.date.recent(),
            customerName: faker.name.findName(),
            customerEmail: faker.internet.email(),
            userId: admin.id,
        }
    })

    describe('POST & GET /v1/order', () =>{
        test('should return 200 OK if success get orders', async() => {
            await request(app)
            .get('/v1/order')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('should return 201 CREATED if success created orders', async() => {
            const res = await request(app)
            .post('/v1/order')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrder)
            .expect(httpStatus.CREATED)

            const orderData = res.body.data

            expect(orderData).toEqual({
                id: expect.anything(),
                date: expect.anything(),
                totalPrice: expect.anything(),
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                userId: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            })

            const dbOrder = await prisma.order.findUnique({
                where: {id: orderData.id}
            })

            expect(dbOrder).toBeDefined();
            expect(dbOrder).toMatchObject({
                id: expect.anything(),
                date: expect.anything(),
                totalPrice: expect.anything(),
                customerName: orderData.customerName,
                customerEmail: orderData.customerEmail,
                userId: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            })
        })
    })

    describe('/v1/order/:orderId', () => {
        test('should return 200 OK, if success get orders by orderId', async() => {
            await insertOrder([orderOne])

            await request(app)
            .get(`/v1/order/${orderOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('Should return 200 and success update orders by orderId', async () => {
            await insertOrder([orderOne])
            newOrder = {
                customerName: faker.name.findName()
            }

            const res = await request(app)
            .patch(`/v1/order/${orderOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newOrder)
            .expect(httpStatus.OK)

            const orderData = res.body.data;

            const dbOrder = await prisma.order.findUnique({
                where:{
                    id: orderData.id
                }
            })

            expect(dbOrder).toBeDefined();
            expect(dbOrder).toMatchObject({
                id: expect.anything(),
                date: expect.anything(),
                totalPrice: expect.anything(),
                customerName: orderData.customerName,
                customerEmail: expect.anything(),
                userId: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            })
          });

          test('should return 200 OK if success delete orders by orderId', async() =>{
            await insertOrder([orderOne])

            await request(app)
            .delete(`/v1/order/${orderOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
          })
    })

    describe('ERROR TEST', () =>{
        test('should return 400 BAD REQUEST if order id is not valid', async() => {
            await request(app)
            .get(`/v1/order/noValidId`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 401 UNAUTHORIZED if no access token', async() => {
            await request(app)
            .get(`/v1/order`)
            .send(newOrder)
            .expect(httpStatus.UNAUTHORIZED)
        })
        
        test('should return 403 FORBIDDEN if doesnt has admin access', async() => {
            await request(app)
            .get(`/v1/order`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newOrder)
            .expect(httpStatus.FORBIDDEN)
        })
        
        test('should return 404 NOT_FOUND if no order is found', async() => {
            await request(app)
            .get(`/v1/order/${v4}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.NOT_FOUND)
        })



    })
})