const { GenerateHashedPassword, ValidatePassword, GenerateSignedJWT } = require('../../utils/index')
const { CreateUser, EmailInUse, FindUserByEmail, UsernameInUse, FindUserById } = require('../../database/repository/user-repository')
const { FindUserByUsername } = require('../../database/repository/user-repository')
// Goals:
// Try to include business logic only
// No database operations and try to use reusable functions


// @desc Register a new user
// @route POST /api/user/register
// @access Public
const RegisterUser = async (req, res) => {
    try {
        const { username, email, password  } = req.body

        if(!username || !email || !password) {
            res.status(400)
            throw new Error("Please fill in all fields")
        }
        if(await EmailInUse(email)) {
            res.status(400)
            throw new Error("Email already in use")
        }
        
        if(await UsernameInUse(username)) {
            res.status(400)
            throw new Error("Email already in use")
        }
        
        const hashedPassword = await GenerateHashedPassword(password)
        const user =  await CreateUser(username, email, hashedPassword)
        
        if(user) {
            res.status(201).json(user)
        } else {
            throw new Error("User not found")
        }

    } catch (error) {
       res.status(400).json({ message: error.message })
    }
}


// @desc Login a user
// @route POST /api/user/login
// @access Public
const LoginUser = async(req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            res.status(400)
            throw new Error("Please fill in all fields")
        }
        const foundUser = await FindUserByEmail(email)

        if(foundUser && (await ValidatePassword(password, foundUser.password))) {
            res.status(200).json({
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                token: GenerateSignedJWT(foundUser._id)
            })
        } else {
            throw new Error("Invalid login credentials")
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


// @desc Get a user information 
// @route POST /api/user/profile/ 
// @access Public
const GetUserInformation = async(req, res) => {
    try {
        const { username } = req.body
        const user = await FindUserByUsername(req.body.username)

        if(user) {
            res.status(200).json({
                username: user.username,
                email: user.email,
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
    GetUserInformation,
}