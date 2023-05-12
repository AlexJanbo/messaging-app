const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String, require: true},
    isGroup: { type: Boolean, require: true, default: false},
    members: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    admin: { type: mongoose.Schema.Types.ObjectId}

},
{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)
