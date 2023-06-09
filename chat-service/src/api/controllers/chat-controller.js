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
        })
        res.status(200).json(chat)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const CreateGroupChat = async (req, res) => {
    try {
        const { user, memberUsernames } = req.body
        if(!user) {
            res.status(401).json({ message: "User not found"})
        }
        if(!memberUsernames) {
            res.status(400).json({ message: "Member username not found"})
        }

        const userData = {
            memberUsernames: memberUsernames
        }
        const getUserResponse = await axios.post('http://localhost:8000/api/users/get-users-from-username-array', userData)
        const chatMembers = getUserResponse.data

        const creator = {
            _id: user.id,
            username: user.username,
            email: user.email,
        }

        const chat = await Chat.create({
            chatName: `${creator.username}'s chat`,
            members: [creator, ...chatMembers],
            admin: creator.username,
        })

        // Send other users notification that they have been invited to a group chat
        const notificationData = {
            memberUsernames: memberUsernames,
            chatId: chat._id,   
            event: "invited-to-group-chat"
        }
        
        const createNotificationResponse = await axios.post('http://localhost:8000/api/users/create-notification', notificationData)

        res.status(200).json(chat)
    } catch (error) {
        res.status(404).json({ message: error.message})
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
        if(!chatId) {
            res.status(400).json({ message: "Chat id not found"})
        }
        if(!memberUsername) {
            res.status(400).json({ message: "Members username not found"})
        }

        const chat = await Chat.findById(chatId)

        // Get chat member's user object from user microservice since client can not pass that information
        const userData = {
            username: memberUsername
        }
        const response = await axios.post('http://localhost:8000/api/users/profile', userData)
        const chatMember = response.data
        console.log(chatMember)

        // if(chat.members.includes(chatMember)) {
        //     throw new Error("Member already in chat")
        // }

        chat.members.push(chatMember)
        await chat.save()
        res.status(200).json({ message: "User successfully added to group"})

    } catch (error) {
        res.status(404).json({ message: error.message})
    }

}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const RemoveGroupMember = async(req, res) => {

    try {
        const { chatId, username } = req.body
        if(!chatId || !username ) {
            throw new Error("Chat member not found")
        }
        
        const chat = await Chat.findById(chatId)

        
        // Get chat member's user object from user microservice since client can not pass that information
        const userData = {
            username: username
        }
        const response = await axios.post('http://localhost:8000/api/users/profile', userData)
        const chatMember = response.data


        // if(!chat.members.includes(chatMember)) {
        //     throw new Error("User not member of chat")
        // }

        chat.members = chat.members.filter((member) => member.username !== chatMember.username)
        await chat.save()

        res.status(200).json({ message: "User successfully removed from chat"})
    } catch (error) {
        
        res.status(404).json({ message: error.message})
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const ChangeChatName = async (req, res) => {

    try {

        const { chatId, newChatName } = req.body
        console.log(newChatName)
        if(!chatId || !newChatName) {
            throw new Error("Missing chat id or new name")
        }
        const chat = await Chat.findById(chatId)

        if(chat.chatName === newChatName) {
            throw new Error("New name same as old")
        }

        chat.chatName = newChatName
        await chat.save()

        res.status(200).json(chat.chatName)
        
    } catch (error) {
        
        res.status(404).json({ message: error.message })
    }
}

// @desc Create a one on one chat
// @route POST /api/chats/create-chat
// @access Private
const ChangeChatAdmin = async (req, res) => {

    try {
        const { chatId, newAdminUsername } = req.body

        if(!chatId || !newAdminUsername) {
            throw new Error("New admin not found")
        }

        const chat = await Chat.findById(chatId)

        if(chat.admin === newAdminUsername) {
            throw new Error('User is already admin')
        }

        chat.admin = newAdminUsername
        await chat.save()

        res.status(200).json({ message: "Successfully changed admin"})

    } catch (error) {
        res.status(404).json({ message: error.message })
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
        console.log(user.id)

        const chat = await Chat.findById(chatId)
        if(!chat) {
            throw new Error("Chat not found")
        }

        chat.members = chat.members.filter((member) => member.id !== user.id)
        await chat.save()
        res.status(200).json({ message: "Successfully left chat"})

        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const UpdateLastChatMessage = async (req, res) => {

    try {
        const { chatId, text, sender } = req.body
        if(!chatId) {
            res.status(400).json({ message: "Chat id was not found"})
        } 
        if(!text) {
            res.status(400).json({ message: "Message was not found"})
        }
        if(!sender) {
            res.status(400).json({ message: "Sender username not found"})
        }
        const chat = await Chat.findByIdAndUpdate(chatId, {
            $set: { 
                lastMessage: {
                    sender: sender,
                    text: text
                }
            }
        })
        
        res.status(200).json({ message: "Updated last chat message successfully"})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}



module.exports = {
    CreateChat,
    CreateGroupChat,
    GetChat,
    GetAllChats,
    DeleteChat,
    LeaveChat,
    AddGroupMember,
    RemoveGroupMember,
    ChangeChatName,
    ChangeChatAdmin,
    UpdateLastChatMessage,
}