const mongoose = require('mongoose')
const { MONGODB_URI } = require('../config')
const colors = require('colors')

module.exports = async() => {

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Database connectee dur successforrry".cyan)
    } catch (error) {
        console.error("ERROR ======= ON DB CONNECTION")
        console.log(error)
    }
}
