const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    username: { type: String, require: true, unique: true},
    email: { type: String, require: true, unique: true },
    password: String,
    chats: [
        {
            
        }
    ],
    messages: [{

    }],
    notifications: [
        {

        }
    ]

},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)