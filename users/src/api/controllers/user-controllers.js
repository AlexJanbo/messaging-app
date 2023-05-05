const { UserRepository } = require("../database");
// Goals:
// Try to include business logic only
// No database operations and try to use reusable functions


// @desc Register a new user
// @route POST /api/user/register
// @access Public
const RegisterUser = async (req, res) => {
    try {
        const { username, email, password  } = req.body
        const userRepository = new UserRepository()

        if(!username || !email || !password) {
            res.status(400)
            throw new Error("Please fill in all")
        }
        if(userRepository.EmailInUse(email)) {
            res.status(400)
            throw new Error("Email already in use")
        }
        
        if(userRepository.UsernameInUse(username)) {
            res.status(400)
            throw new Error("Email already in use")
        }
        
        const hashedPassword = GenerateHashedPassword(password)
        
        const user =  await UserRepository.CreateUser({ username, email, hashedPassword })
        
        if(user) {
            res.status(201).json(FormatDataToObject(user))
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
        const userRepository = new UserRepository()        

        const user = userRepository.FindUserByEmail(email)

        if(user && (await ValidatePassword(password, user.password))) {
            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                token: GenerateSignedJWT(user._id)
            })
        } else {
            throw new Error("Invalid login credentials")
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


// @desc Get a user information 
// @route POST /api/user/profile/:id 
// @access Public
const GetUserInformation = async(req, res) => {
    try {
        const { id } = req.body
        const userRepository = new UserRepository()        

        const user = userRepository.FindUserById({ id })

        if(user) {
            res.status(200).json({ ...user })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}