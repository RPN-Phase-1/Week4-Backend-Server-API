const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const moment = require('moment');
const app = require('../../src/app');
const { admin, insertUsers, userOne } = require('../fixtures/user.fixture');
const { categoryOne, insertCategory } = require('../fixtures/category.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { auth } = require('../../src/middleware/auth');
const ApiError = require('../../src/utils/ApiError');
const config = require('../../src/config/config');
const { tokenService } = require('../../src/services');
const { tokenTypes } = require('../../src/config/token');
const { v4 } = require('uuid');

describe('Category routes', () =>{
    let newCategory;
    beforeEach(async() => {
        await insertUsers([userOne])

        newCategory = {
            name: faker.vehicle.type()
        }
    })

    describe('POST & GET /v1/category', () =>{
        test('should return 200 and sucessfully GET categorys ', async() =>{
            await request(app)
            .get('/v1/category')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newCategory)
            .expect(httpStatus.OK)
        })

        test('should return 201 if success created categorys', async() =>{
           const res =  await request(app)
            .post('/v1/category')
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newCategory)
            .expect(httpStatus.CREATED);

            const categoryData = res.body.data

            expect(categoryData).toEqual({
                id: expect.anything(),
                name: categoryData.name,
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            })

            const dbCategory = await prisma.category.findUnique({
                where: {
                    id: categoryData.id
                },
            });

            expect(dbCategory).toBeDefined();
            expect(dbCategory).toMatchObject({
                id: expect.anything(),
                name: categoryData.name,
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            })
        })

        
    })
    
    describe('/v1/category/:categoryId', () => {
        test('should return 200 OK and success get category by ID', async() => {
            await insertCategory([categoryOne])

        const res = await request(app)
        .get(`/v1/category/${categoryOne.id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK)
    })
    
    test('should return 200 OK and success update category by ID', async() => {
        await insertCategory([categoryOne])
        newCategory = {
            name: faker.random.word()
        }
        
        const res = await request(app)
        .patch(`/v1/category/${categoryOne.id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newCategory)
        .expect(httpStatus.OK)
        
        const categoryData = res.body.data
        
        expect(categoryData).toEqual({
            id: expect.anything(),
            name: newCategory.name,
            createdAt: expect.anything(),
            updatedAt: expect.anything()   
        })
        
        const dbCategory = await prisma.category.findUnique({
            where: {
                id: categoryData.id
            }
        })
        
        expect(dbCategory).toBeDefined()
        expect(dbCategory).toMatchObject({
            id: expect.anything(),
            name: categoryData.name,
            createdAt: expect.anything(),
            updatedAt: expect.anything()
        })
    })
    
    test('should return 200 and success delete by ID', async() => {
        await insertCategory([categoryOne])
        
        await request(app)
        .delete(`/v1/category/${categoryOne.id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK)
    })
    
})

describe('ERROR TEST', () =>{
    test('should return 400 and INVALID REQUEST if input with not valid ID', async() => {
        
        await request(app)
        .get(`/v1/category/idNotValid`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.BAD_REQUEST)
        
    })
    
    test('should return 404 and category ID not found', async() => {
        await request(app)
        .get(`/v1/category/${v4()}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
    })
    
    test('should return 401 error unauthorized if no bearer access token', async() => {
        await request(app)
        .get('/v1/category')
        .send(newCategory)
        .expect(httpStatus.UNAUTHORIZED)
        })
    })

})
