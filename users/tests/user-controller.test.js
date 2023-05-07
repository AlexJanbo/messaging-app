const express = require('express')
const { RegisterUser } = require('../src/api/controllers/user-controllers')

const req = {
    body: {
        username: "testUsername",
        email: "test@gmail.com",
        password: "testPassword"
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

// Test suite for user controller (business logic)
describe('User controller and business logic test', () => {

    describe('Register User', () => {
        it('Registers a user', async() => {
            
            const res = await RegisterUser(req)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(req.body)
        })
    })
})