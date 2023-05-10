const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { APP_SECRET } = require('../config')

// Utility functions


// Generate a hashed password
const GenerateHashedPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        throw new Error("Unable to generate hashed password")
        console.log(error)
    }

}


// Validate password
const ValidatePassword = async(enteredPassword, savedPassword) => {
    try {
        const match = await bcrypt.compare(enteredPassword, savedPassword)
        return match
    } catch (error) {
        throw new Error("Unable to validate password")
        console.log(error)
    }
}


// Generate a signed JSON Web Token
const GenerateSignedJWT = (id) =>{
    try {
        return jwt.sign({id}, APP_SECRET, { expiresIn: "30d"})
    } catch (error) {
        throw new Error("Unable so generate signed JWT")
        console.log(error)
    }
}

// Validate a JSON Web Token
const ValidateJWT = async(req) => {
    try {
        const signature = req.get("Authorization")
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET)
        req.user = payload
        return true
    } catch (error) {
        console.log(error)
        return false
    }    
}


module.exports = {
    GenerateHashedPassword,
    ValidatePassword,
    GenerateSignedJWT,
    ValidateJWT,
}