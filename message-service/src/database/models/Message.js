const mongoose = require('mongoose')

const messageSchema = mongoose.Schema

const MessageSchema = new Schema({
    
    text: { type: String, require: true},
    sender: [
        {
            _id: { type: String, require: true},
            username: { type: String, require: true},
            email: { type: String, require: true },
        }
    ],
    reciever: [
        {
            _id: { type: String, require: true},
            username: { type: String, require: true},
            email: { type: String, require: true},
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema)