const createChat = require('../../database/repository/chat-repository')
const Chat = require('../../database/models/Chat')
const axios = require('axios')

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const CreateChat = async (req, res) => {
    try {

        const { user, memberUsername } = req.body

        if(!memberUsername || !user) {
            res.status(400)
            throw new Error("Chat members not found")
        }

        // Get chat member's user object from user microservice since client can not pass that information
        const userData = {
            username: memberUsername
        }
        const response = await axios.post('http://localhost:8000/api/users/profile', userData)
        console.log(response)
        const chatMember = response.data

        // Sanitizing user information that will be saved to chats
        const creator = {
            _id: user.id,
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
        res.status(200).json(chat)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
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

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const GetAllChats = async (req, res) => {
    try {
        const { username } = req.body
        if(!username) {
            res.status(400)
            throw new Error("User username not found")
        }
        const chat = await Chat.find({ 'members.username': username })
        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const DeleteChat = async (req, res) => {
    try {
        // Make sure to add a check to make sure only admin can delete chat
        const chatId = req.params.id
        if(!chatId) {
            throw new Error("Chat id not found")
        }
        const response = await Chat.findByIdAndRemove(chatId)
        console.log(response)
        res.status(200).json({ message: `Chat ${chatId} successfully deleted`})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const AddGroupMember = async (req, res) => {

    try {
        const { chatId, memberUsername } = req.body
        if(!chatId || !memberUsername) {
            throw new Error("Chat members not found")
        }

        const chat = await Chat.findById(chatId)

        if(chat.members.includes(memberUsername)) {
            throw new Error("Member already in chat")
        }

        chat.members.push(memberUsername)
        res.status(200).json(chat.members)

    } catch (error) {
        
        res.status(404).json({ message: error.message})
    }

}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const RemoveGroupMember = async(req, res) => {

    try {
        const { chatId, memberUsername } = req.body
        if(!chatId || !memberUsername ) {
            throw new Error("Chat member not found")
        }
        
        const chat = await Chat.findById(chatId)
        
        if(!chat.members.includes(memberUsername)) {
            throw new Error("User not member of chat")
        }
    } catch (error) {
        
        res.status(404).json({ message: error.message})
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const ChangeChatName = async (req, res) => {

    try {
        const { chatId, newName } = req.body
        if(!chatId || !newName) {
            throw new Error("Missing chat id or new name")
        }
        const chat = await Chat.findById(chatId)

        if(chat.chatName === newName) {
            throw new Error("New name same as old")
        }

        chat.chatName = newName
        await chat.save()

        res.status(200).json(chat.chatName)
        
    } catch (error) {
        
        res.status(404).json({ message: error.message })
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const ChangeGroupAdmin = async (req, res) => {

    try {

        const { chatId, newAdmin } = req.body

        if(!chatId || !newAdmin ) {
            throw new Error("New admin not found")
        }

        const chat = await Chat.findById(chatId)

        if(chat.admin === newAdmin.username) {
            throw new Error('User is already admin')
        }

        chat.admin = newAdmin
        await chat.save()

        res.status(200).json(chat.admin)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const LeaveChat = async (req, res) => {

    try {
        const { chatId, user } = req.body
        if(!chatId || !user) {
            throw new Error("User not found")
        }

        const chat = await Chat.findById(chatId)
        if(!chat) {
            throw new Error("Chat not found")
        }

        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



module.exports = {
    CreateChat,
    GetChat,
    GetAllChats,
    DeleteChat,
    AddGroupMember,
    RemoveGroupMember,
    ChangeChatName,
    ChangeGroupAdmin,
}