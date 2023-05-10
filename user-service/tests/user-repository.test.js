const mongoose = require('mongoose')
const request = require('supertest')

require('dotenv').config

const expressApp = require('../src/express-app')
const User = require('../src/database/models/User')

const { TEST_MONGODB_URI } = require('../src/config')
const { CreateUser, EmailInUse, UsernameInUse, FindUserByEmail, FindUserById } = require('../src/database/repository/user-repository')
console.log(TEST_MONGODB_URI)


const testUser = {
    username: "testUsername",
    email: "test@gmail.com",
    password: "testPassword"
}

// Test suite for user model and database logic
describe('User model and database logic test', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URI)
    }) 

    beforeEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it('Has a module', () => {
        expect(User).toBeDefined()
    })

    describe('Test function CreateUser', () => {
        it("Creates a user", async() => {
            const user = await CreateUser(testUser.username, testUser.email, testUser.password)

            expect(user.username).toEqual("testUsername")
            expect(user.email).toEqual("test@gmail.com")
            expect(user.password).toEqual("testPassword")
        })
    })

    describe('Test Function EmailInUse', () => {
        it('Checks when email is not in use', async() => {
            const email = testUser.email
            expect(await EmailInUse(email)).toBeFalsy()
        })
        it('Checks when email is in use', async() => {
            const user = await User.create({
                username: testUser.username,
                email: testUser.email,
                password: testUser.password,
            })
            const email = user.email
            expect(await EmailInUse(email)).toBeTruthy()
        })

    })
    

    describe('Test Function UsernameInUse', () => {
        it('Checks when username is not in use', async() => {
            const username = testUser.username
            expect(await UsernameInUse(username)).toBeFalsy
        })
        it('Checks when username is in use', async() => {
            const user = await User.create({
                username: testUser.username,
                email: testUser.email,
                password: testUser.password
            })
            const username = user.username
            console.log(username)
            expect(await UsernameInUse(username)).toBeTruthy() 
        })
    })
        

    describe('Test Function FindUserByEmail', () => {
        it('Checks when the email already exists', async() => {
            const user = await User.create({
                username: testUser.username,
                email: testUser.email,
                password: testUser.password
            })
            const email = user.email
            const foundUser = await FindUserByEmail(email)
            expect(foundUser).toMatchObject(user.toObject()) 
        })
        it('Checks when the email does not already exist', async() => {
            const email = testUser.email
            const foundUser = await FindUserByEmail(email)
            expect(foundUser).toBeNull()
        })
    })

    describe('Test Function FindUserById', () => {
        it('Checks when the ID already exists', async() => {
            const user = await User.create({
                username: testUser.username,
                email: testUser.email,
                password: testUser.password
            })
            const userId = user._id
            const foundUser = await FindUserById(userId)
            expect(foundUser).toMatchObject(user.toObject())
        })
        it('Checks when the ID does not already exist', async() => {
            const user = await User.create(testUser)
            const userId = user._id
            await User.deleteMany({})
            const foundUser = await FindUserById(userId)
            expect(foundUser).toBeNull()
        })
    })


    })