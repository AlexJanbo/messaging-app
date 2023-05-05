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

// Generate a signed JSON Web Token
const GenerateSignedJWT = async(payload) =>{
    
}
