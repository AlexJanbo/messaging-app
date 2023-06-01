const mongoose = require('mongoose')


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
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)