const { GenerateHashedPassword, ValidatePassword, GenerateSignedJWT } = require('../../utils/index')
const { CreateUser, EmailInUse, FindUserByEmail, UsernameInUse, FindUserById } = require('../../database/repository/user-repository')
const { FindUserByUsername } = require('../../database/repository/user-repository')
const User = require('../../database/models/User')


const RegisterUser = async (req, res) => {
    try {

        const { username, email, password} = req.body

        if(!username || !email || !password) {
            res.status(400).json({ message: "Please fill in all fields"})
        }
        if(await EmailInUse(email)) {
            res.status(400).json({ message: "Email already in use"})
        }
        
        if(await UsernameInUse(username)) {
            res.status(400).json({ message: "Username already in use"})
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
                image: foundUser.image,
                token: GenerateSignedJWT(foundUser._id)
            })
        } else {
            throw new Error("Invalid login credentials")
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


const GetUserInformation = async(req, res) => {
    try {
        console.log("ping")
        const { username } = req.body
        console.log(username)
        const user = await FindUserByUsername(req.body.username)

        if(!user) {
            res.status(404).json({ message: "User not found"})
        } 
            
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const GetUserById = async(req, res) => {
    try {
        const { userId } = req.body
        if(!userId) {
            res.status(404).json({ message: "User not found"})
        }

        const user = await User.findById(userId).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}
 

const ChangeProfilePicture = async(req, res) => {
    try {
        const { image, userId } = req.body
        const user = await FindUserById(userId)

        if(!user) {
            res.status(404).json({ message: "Invalid user"})
        }
        if(!image) {
            res.status(404).json({ message: "Image not found"})
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            image: req.body.image
        })

        res.status(200).json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            image: updatedUser.image,
            token: GenerateSignedJWT(updatedUser._id)
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const GetAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find({})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const GetUsersFromUsernameArray = async(req, res) => {
    try {
        const { memberUsernames } = req.body
        const users = await User.find({ username: { $in: memberUsernames}}).select("_id username email")
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//@route    GET /api/users/
const QueryUsers = async(req, res) => {
    try {
        const { user } = req
        const searchQuery = req.query.q
        // const pageNumber = parseInt(req.query.pageNumber)
        // const pageSize = 5

        // const totalItems = await User.countDocuments({ field: searchQuery})

        // const totalPages = Math.ceil(totalItems / pageSIze)
        const regex = new RegExp(searchQuery, 'i')
        const users = await User.find({
            $or: [
                { username: regex },
                { email: regex }
            ]
        })
        .find({ _id: { $ne: user._id}})
        .select('-password')
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const CreateNotification = async(req, res) => {
    try {
        console.log("ping")
        const { memberUsernames, chatId, eventType } = req.body
        if(!memberUsernames) {
            res.status(200).json({ message: "Member usernames not found"})
        }
        if(!chatId) {
            res.status(200).json({ message: "Chat id not found"})
        }
        if(!eventType) {
            res.status(200).json({ message: "Event type not found"})
        }

        const notificationData = {
            read: false,
            chatId: chatId,
            event: eventType,
        }

        const users = await User.updateMany(
            { username: { $in: memberUsernames }},
            { $push: { notifications: notificationData}}
        )
        res.status(200)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// const NotificationRead = async(req, res) => {
    
//     const { notificationId } = 
// }


module.exports = {
    RegisterUser,
    LoginUser,
    GetUserInformation,
    GetUserById,
    ChangeProfilePicture,
    GetAllUsers,
    GetUsersFromUsernameArray,
    QueryUsers,
    CreateNotification,
}