const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

    chatName: { type: String, require: true},
    isGroup: { type: Boolean, require: true},
    members: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    admin: { type: mongoose.Schema.Types.ObjectId}

},
{
    timestamps: true
})