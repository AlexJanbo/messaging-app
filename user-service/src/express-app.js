const express = require('express')
const cors = require('cors')

module.exports = async (app) => {

    app.use(express.json({ limit: "1mb"}))
    app.use(express.urlencoded({ extended: true, limit: "1mb"}))
    app.use(cors())
    app.use(express.static(__dirname + "/public"))

    // With gateway
    app.use('/', require('./api/routes/user-routes'))

    // Without gateway
    // app.use('/api/users', require('./api/routes/user-routes'))
    
}