const createChat = require('../../database/repository/chat-repository')
const Chat = require('../../database/models/Chat')
const axios = require('axios')

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const CreateChat = async (req, res) => {
    try {
        // user is the user object from chat creator
        // username is string input that chat creator wishes to add to a chat
        const { user, memberUsername } = req.body

        // Make sure that we have both the user and username
        if(!username || !user) {
            res.status(400)
            throw new Error("Chat members not found")
        }

        // Get chat member's user object from user microservice since client can not pass that information
        const userData = {
            username: memberUsername
        }
        const response = await axios.post('http://localhost:8000/api/users/profile', userData)
        const chatMember = response.data

        // Sanitizing user information that will be saved to chats
        const creator = {
            username: user.username,
            email: user.email,
        }

        // Saving the chat to the database and returning status code 200 and chat as json
        const chat = await Chat.create({
            chatName: `${creator.username} and ${chatMember.username}'s chat`,
            members: [creator, chatMember],
            admin: creator.username,
            isGroup: false
        })
        // console.log(chat)
        res.status(200).json({ chat })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const GetChat = async (req, res) => {
    try {
        const { chatId } = req.body
        if(!chatId) {
            res.status(400)
            throw new Error("Chat id not found")
        }
        const chat = await Chat.findById(chatId)
        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const GetAllChats = async (req, res) => {
    try {
        const { username } = req.body

        if(!username) {
            res.status(400)
            throw new Error("User username not found")
        }

        const chat = await Chat.find({ 'members.username': username })
        console.log(chat)
        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const DeleteChat = async (req, res) => {

}

const CreateGroupChat = async (req, res) => {

}

const AddGroupMember = async (req, res) => {

}

const RemoveGroupMember = async(req, res) => {

}

const ChangeChatName = async (req, res) => {

}

const ChangeGroupAdmin = async (req, res) => {

}

module.exports = {
    CreateChat,
    GetChat,
    GetAllChats,
    DeleteChat,
    CreateGroupChat,
    AddGroupMember,
    RemoveGroupMember,
    ChangeChatName,
    ChangeGroupAdmin,
}