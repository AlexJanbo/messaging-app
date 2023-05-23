const express = require('express')
const { PORT } = require('./config')
const { databaseConnection } = require("./database")
const expressApp = require('./express-app')

const StartServer = async () => {

    const app = express()

    await databaseConnection()

    await expressApp(app)

    app.listen(PORT, () => {
        console.log(`Chat Microservice listening on port: ${PORT}`)
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
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000"
        }
    })
    io.on('connection', (socket) => {
        console.log("a user connected")
        socket.on('setup', (userData) => {
            console.log(userData)
            // socket.join(userData._id)
            // socket.emit('connected')
        })
        socket.on('join chat', (chatId) => {
            socket.join(chatId)
            console.log(`User joined room ${chatId}`)
        })
        socket.on('chat message', (message) => {
            console.log("Message: " + message.text)
            io.emit('chat message', message)
        })
        socket.on('typing', (chatId, user) => {
            console.log(`${user.username} is typing!`)
            // socket.in(chatId).emit('typing')
            io.emit('typing', (user))
        })
        socket.on('stop typing', (chatId, user) => {
            console.log('stopped typing')
            socket.in(chatId).emit('stop typing')
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
        socket.off('setup', () => {
            console.log("User disconnected")
            socket.leave(userData._id)
        })
    })
}

StartServer()
