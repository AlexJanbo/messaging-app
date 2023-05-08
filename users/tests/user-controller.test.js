const express = require('express')
const { RegisterUser } = require('../src/api/controllers/user-controllers')

const req = {
    body: {
        email: "test@gmail.com",
        password: "testPassword"
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

// Test suite for user controller (business logic)
describe('User Controller', () => {

    describe('RegisterUser', () => {

        it('Should throw an error if username is missing', async() => {

            const res = await RegisterUser(req)

            expect(res.status).rejects.toThrow("please fill in all fields")
        })
    })
})