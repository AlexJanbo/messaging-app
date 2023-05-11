const express = require('express')
const { PORT } = require('./config')
const { datanaseConnection } = require('./database')
const expressApp = require('./express-app')

const StartServer = async () => {

    const app = express()

    await databaseConnection()

    await expressApp(app)

    // app.listen(PORT, () => {
    //     console.log(`Listening on port: ${PORT}`)
    // })
    // .on('error', (err) => {
    //     console.error(error)
    //     process.exit()
    // })

    const SocketServer = app.listen(1234, () => {
        console.log(`Socket server running on port: 1234`)
    })

    const io = require('socket.io')(SocketServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    })
    io.on('connection', (socket) => {
        console.log("a user connected")
        socket.on('chat message', (msg) => {
            console.log('message' + msg)
            io.emit('chat message', msg)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

}