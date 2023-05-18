const Message = require('../../database/models/Message')

const SendMessage = async (req, res) => {

    try {
        console.log("ping")
        const { sender, text, chatId } = req.body
        console.log(chatId)
        if(!text) {
            throw new Error("Please provide all required message information")
        }
        const message = await Message.create({
            sender: {
                id: sender._id,
                username: sender.username,
                email: sender.email
            },
            text: text,
            chatId: chatId,
        })
        
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

// const DeleteMessages = async (req, res ) => {

// }

module.exports = {
    SendMessage,
    GetMessages,
    // DeleteMessages
}