const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { APP_SECRET } = require('../config')

// Utility functions


// Generate a hashed password
const GenerateHashedPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}


// Validate password
const ValidatePassword = async(enteredPassword, savedPassword) => {
    const match = await bcrypt.compare(enteredPassword, savedPassword)
    return match
}


// Generate a signed JSON Web Token
const GenerateSignedJWT = async(payload) =>{
    try {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d"})
    } catch (error) {
        console.log(error)
    }
}

// Validate a JSON Web Token
const ValidateJWT = async(req) => {
    
}

// Format data to object
const FormatDataToObject = (data) => {
    if(data) {
        return { data }
    } else {
        throw new Error("Data not found")
    }
}

