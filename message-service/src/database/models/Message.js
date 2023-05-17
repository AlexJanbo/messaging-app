const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    
    text: { type: String, require: true},
    sender: {
        _id: { type: mongoose.Schema.Types.ObjectId },
        username: { type: String},
        email:  { type: String},
    },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}
},
{
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema)