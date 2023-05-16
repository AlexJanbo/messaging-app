const express = require('express')
const cors = require('cors')
const { CreateChannel } = require('./utils')

module.exports = async (app) => {

    app.use(express.json({ limit: "1mb"}))
    app.use(express.urlencoded({ extended: true, limit: "1mb"}))
    app.use(cors())
    app.use(express.static(__dirname + "/public"))

    const channel = await CreateChannel()

    // If using gateway
    app.use('/', require('./api/routes/chat-routes'))

    // Without gateway
    // app.use('/chats', require('./api/routes/chat-routes'))
    
}
