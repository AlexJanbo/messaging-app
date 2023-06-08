const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String},
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        email: { type: String},
        username: { type: String},
    }],
    admin: { type: String },
    lastMessage: {
        sender: {
            _id: { type: mongoose.Schema.Types.ObjectId },
            email: { type: String },
            username: { type: String },
            image: { type: String },
        },
        text: { type: String },
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)
