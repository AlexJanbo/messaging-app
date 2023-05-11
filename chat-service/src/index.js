const express = require('express')
const { PORT } = require('./config')
const { databaseConnection } = require("./database")
const expressApp = require('./express-app')

const StartServer = async () => {

    const app = express()

    await databaseConnection()

    await expressApp(app)

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
    .on("error", (err) => {
        console.log(err)
        process.exit()
    })

    const server = require('http').Server(app)
    server.listen(1234, () => {
        console.log("Socket server listening on port 1234")
    })

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })
    io.on('connection', (socket) => {
        console.log("a user connected")
        socket.on('chat message', (msg) => {
            console.log("Message: " + msg.data.text)
            io.emit('chat message', msg)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

StartServer()
