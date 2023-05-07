const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config

const expressApp = require('../src/express-app')
const User = require('../src/database/models/User')

const { TEST_MONGODB_URI } = require('../src/config')
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

    afterEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it('Has a module', () => {
        expect(User).toBeDefined()
    })

    describe('Save user', () => {
        it("saves a user", async() => {
            const user = await User.create(testUser)

            expect(user.username).toEqual("testUsername")
            expect(user.email).toEqual("test@gmail.com")
            expect(user.password).toEqual("testPassword")
        })
    })

    describe("Get user", () => {
        it("Gets a user", async () => {
            const user = await User.create(testUser)
            const id = user._id

            const foundUser = await User.findOne({ _id: id})
            
            const expected = "testUsername"
            const actual = foundUser.username
            expect(actual).toEqual(expected)
        })
    })

    describe("Update user", () => {
        it("Updates a user", async () => {
            const user = await User.create(testUser)
            const id = user._id

            await User.findByIdAndUpdate(id, {
                username: "updatedTestUsername"
            })
            const foundUser = await User.findById(id)


            const expected = "updatedTestUsername"
            const actual = foundUser.username
            expect(actual).toEqual(expected)
        })
    })

    describe("Delete user", () => {
        it("Deletes a user", async () => {
            const user = await User.create(testUser)
            const id = user._id

            await User.findByIdAndDelete(id)
            const foundUser = await User.findById(id)

            expect(foundUser).toBeNull()
        })
    })
}) 