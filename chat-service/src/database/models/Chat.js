const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String},
    isGroup: { type: Boolean, require: true, default: false},
    members: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    admin: { type: mongoose.Schema.Types.ObjectId},
    lastMessage: { type: String}

},
{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)
