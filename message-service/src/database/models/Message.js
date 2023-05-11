const mongoose = require('mongoose')

const messageSchema = mongoose.Schema

const MessageSchema = new Schema({
    
    text: { type: String, require: true},
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}
},
{
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema)