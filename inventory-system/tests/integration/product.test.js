const request = require('supertest');
const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const { admin, insertUsers, userOne } = require('../fixtures/user.fixture');
const { productOne, insertProducts } = require('../fixtures/product.fixture')
const { categoryOne, insertCategory } = require('../fixtures/category.fixture')
const {adminAccessToken, userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { v4 } = require('uuid')

describe('product routes', () =>{
    let newProduct;
    beforeEach(async () => {
        await insertUsers([admin, userOne])
        await insertCategory([categoryOne])
        await insertProducts([productOne])
        newProduct = {
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.number.float(),
            quantityInStock: faker.number.int({min: 10, max: 100}),
            categoryId: categoryOne.id,
            userId: userOne.id
        }
    })

    describe('GET & POST /v1/product', () =>{
        test('should return 200 OK if success get products', async() => {
            await request(app)
            .get('/v1/product')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('should return 201 CREATED if success create product', async() => {
            const res = await request(app)
            .post('/v1/product')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newProduct)
            .expect(httpStatus.CREATED)

            const productData = res.body.data;


            const dbProduct = await prisma.product.findUnique({
                where:{id: productData.id}
            })

            expect(dbProduct).toBeDefined();
            expect(dbProduct).toMatchObject({
                id: expect.anything(),
                name: expect.anything(),
                description: productData.description,
                price: productData.price,
                quantityInStock: productData.quantityInStock,
                categoryId: categoryOne.id,
                userId: userOne.id,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
        })
    })

    describe('/v1/product/:productId', () => {
        test('should return 200 OK, if success get products by productId', async() => {
            await request(app)
            .get(`/v1/product/${productOne.id}`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('Should return 200 and success update products by productId', async () => {    
            newProduct = {
                name: 'testUpdate'
            }

           const res =  await request(app)
            .patch(`/v1/product/${productOne.id}`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newProduct)
            .expect(httpStatus.OK)

            const productData = res.body.data;
            
            const dbProduct = await prisma.product.findUnique({
                where: {id: productData.id}
            })

            expect(dbProduct).toBeDefined();
            expect(dbProduct).toMatchObject({
                id: expect.anything(),
                name: expect.anything(),
                description: productData.description,
                price: productData.price,
                quantityInStock: productData.quantityInStock,
                categoryId: categoryOne.id,
                userId: userOne.id,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            })
          });

          test('should return 200 OK if success delete products by productId', async() =>{
            
            await request(app)
            .delete(`/v1/product/${productOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
          })
    })

    describe('ERROR TEST', () =>{
        test('should return 400 BAD REQUEST if product id is not valid', async() => {
            await request(app)
            .get(`/v1/product/noValidId`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 401 UNAUTHORIZED if no access token', async() => {
            await request(app)
            .get(`/v1/product`)
            .send(newProduct)
            .expect(httpStatus.UNAUTHORIZED)
        })

        test('should return 403 BAD REQUEST if created product with no categoryID was found in send Data', async() => {
            newProduct = {
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.number.float(),
                quantityInStock: faker.number.int({min: 10, max: 100}),
                userId: userOne.id
            }

            await request(app)
            .post('/v1/product')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newProduct)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 403 BAD REQUEST if created product with no userID was found in send Data', async() => {
            newProduct = {
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.number.float(),
                quantityInStock: faker.number.int({min: 10, max: 100}),
                categoryId: categoryOne.id
            }

            await request(app)
            .post('/v1/product')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newProduct)
            .expect(httpStatus.BAD_REQUEST)
        })
        
        
        test('should return 404 NOT_FOUND if no product is found', async() => {
            await request(app)
            .get(`/v1/product/${v4}`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .expect(httpStatus.NOT_FOUND)
        })

    })
})