const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String},
    isGroup: { type: Boolean, require: true, default: false},
    members: [{
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
