const mongoose = require('mongoose')

const chatSchema = mongoose.Schema

const ChatSchema = new Schema({

    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false},
    users: [
        {
            _id: { type: String, require: true},
            username: { type: String, require: true},
            email: { type: String, require: true}
        }
    ],
    groupAdmin: [
        {
            _id: { type: String, require: true},
            username: { type: String, require: true},
            email: { type: String, require: true}
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 
        }
    ]
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Chat', ChatSchema)