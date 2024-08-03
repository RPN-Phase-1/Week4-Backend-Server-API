const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const { admin, insertUsers, userOne } = require('../fixtures/user.fixture');
const {adminAccessToken, userOneAccessToken } = require('../fixtures/token.fixture');
const prisma = require('../../prisma');
const { v4 } = require('uuid')

describe('user routes', () =>{
    let newUser;
    beforeEach(async () => {
        await insertUsers([admin, userOne])
        newUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: 'password123',
            role: 'user'
        }
    })

    describe('GET /v1/user', () =>{
        test('should return 200 OK if success get users', async() => {
            await request(app)
            .get('/v1/user')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })
    })

    describe('/v1/user/:userId', () => {
        test('should return 200 OK, if success get users by userId', async() => {
            await insertUsers([userOne])

            await request(app)
            .get(`/v1/user/${userOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
        })

        test('Should return 200 and success update users by userId', async () => {
            newUser = {
                name: 'testUpdate'
            }

           const res =  await request(app)
            .patch(`/v1/user/${userOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newUser)
            .expect(httpStatus.OK)

            const userData = res.body.data;
            
            const dbUser = await prisma.user.findUnique({
                where: {id: userData.id}
            })

            expect(dbUser).toBeDefined();
            expect(dbUser).toMatchObject({
                id: expect.anything(),
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                isEmailVerified: false
            })
          });

          test('should return 200 OK if success delete users by userId', async() =>{
            await insertUsers([userOne])

            await request(app)
            .delete(`/v1/user/${userOne.id}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.OK)
          })
    })

    describe('ERROR TEST', () =>{
        test('should return 400 BAD REQUEST if user id is not valid', async() => {
            await request(app)
            .get(`/v1/user/noValidId`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.BAD_REQUEST)
        })

        test('should return 401 UNAUTHORIZED if no access token', async() => {
            await request(app)
            .get(`/v1/user`)
            .send(newUser)
            .expect(httpStatus.UNAUTHORIZED)
        })
        
        test('should return 403 FORBIDDEN if doesnt has admin access', async() => {
            await request(app)
            .get(`/v1/user`)
            .set('Authorization', `Bearer ${userOneAccessToken}`)
            .send(newUser)
            .expect(httpStatus.FORBIDDEN)
        })
        
        test('should return 404 NOT_FOUND if no user is found', async() => {
            await request(app)
            .get(`/v1/user/${v4}`)
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .expect(httpStatus.NOT_FOUND)
        })

    })
})