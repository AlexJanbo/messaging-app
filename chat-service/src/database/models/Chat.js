const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String},
    members: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        email: { type: String},
        username: { type: String},
    }],
    admin: { type: String },
    lastMessage: { type: String}

},
{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)
