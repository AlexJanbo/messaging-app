const mongoose = require('mongoose')

const eventTypes = {
    Invited_To_Group_Chat: 'invited-to-group-chat',
    Member_Added: 'member-added',
    Member_Removed: 'member-removed',
    Changed_Chat_Name: 'change-chat-name',
    Changed_Chat_Admin: 'changed-chat-admin',
    Unread_Message: 'unread-message',
    Chat_Deleted: 'chat-deleted'
}


const userSchema = mongoose.Schema({

    username: { 
        type: String,
        require: true, 
        unique: true
    },
    email: { 
        type: String, 
        require: true, 
        unique: true 
    },
    password: {
        type: String, 
        require: true
    },
    image: {
        type: String,
    },
    notifications: [{
        read: { type: Boolean, required: true},
        chatId: { type: mongoose.Schema.Types.ObjectId},
        event: { 
            type: String,
            required: true,
            enum: Object.values(eventTypes)
        },
        timestamp: {
            type: Date,
            default: new Date()
        }
    }]
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)