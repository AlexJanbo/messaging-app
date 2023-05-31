const User = require('../models/User')

// All database logic 

const CreateUser = async(username, email, hashedPassword) => {
   const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
    })
    return user
}


const EmailInUse = async(email) => {
    const existingUser = await User.findOne({ email: email})
    if(existingUser) {
        return true
    } else {
        return false
    }
}

const UsernameInUse = async(username) => {
    const existingUser = await User.findOne({ username: username })
    if(existingUser) {
        return true
    } else {
        return false
    }
}

const FindUserByEmail = async(email) => {
    const foundUser = await User.findOne({ email: email})
    return foundUser
}

const FindUserByUsername = async(username) => {
    const foundUser = await User.findOne({ username: username})
    return foundUser
}

const FindUserById = async(userId) => {
    const existingUser = await User.findById( userId )
    return existingUser

}



module.exports = {
    CreateUser,
    EmailInUse,
    FindUserByEmail,
    FindUserByUsername,
    UsernameInUse,
    FindUserById,
}