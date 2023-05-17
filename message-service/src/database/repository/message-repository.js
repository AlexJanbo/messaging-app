const Message = require('../models/Message')

// All message DB logic


// Creates a message in a chat
const createMessage = async(text, sender, chatId) => {

    const message = await Message.create({
        sender: {
            _id: sender.id,
            username: sender.username,
            email: sender.email
        },
        text: text,
        chatId: chatId
    })
    if(message) {
        return message
    } else {
        throw new Error("Unable to create message")
    }
}

// Gets all of the messages for a chat
const getMessages = async(chatId) => {

    const message = await Message.findById(chatId)
}

module.exports = {
    createMessage,
    getMessages,
}