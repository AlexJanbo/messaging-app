const Message = require('../../database/models/Message')
const axios = require('axios')

const SendMessage = async (req, res) => {

    try {
        const { sender, text, chatId } = req.body
        if(!text) {
            throw new Error("Please provide all required message information")
        }
        const message = await Message.create({
            sender: {
                _id: sender.id,
                username: sender.username,
                email: sender.email
            },
            text: text,
            chatId: chatId,
        })

        const data = {
            chatId: chatId,
            sender: {
                _id: sender.id,
                email: sender.email,
                username: sender.username,
                image: sender.image
            },
            text: text,
        }

        const response = await axios.put('http://localhost:8000/api/chats/update-last-chat-message', data)
        
        res.status(200).json({ message })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const GetMessages = async (req, res) => {

    try {
        const { chatId } = req.body

        if(!chatId) {
            throw new Error("Please provide the chat id")
        }

        const messages = await Message.find({ "chatId": chatId})

        res.status(200).json(messages)
    } catch (error) {
       res.status(404).json({ message: error.message })
    }
}

const DeleteMessages = async (req, res ) => {

    try {
        const chatId = req.params.id

        if(!chatId) {
            throw new Error("Please provide the chat id")
        }

        const response = await Message.deleteMany({ "chatId": chatId })
        console.log(response)
        res.status(200).json({ message: "Chat messages deleted"})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    SendMessage,
    GetMessages,
    DeleteMessages
}