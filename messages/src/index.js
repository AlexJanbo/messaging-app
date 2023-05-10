const express = require('express')
const { PORT } = require('./config')
const { datanaseConnection } = require('./database')
const expressApp = require('./express-app')

const StartServer = async () => {

    const app = express()

    await databaseConnection()

    await expressApp(app)

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
    .on('error', (err) => {
        console.error(error)
        process.exit()
    })
}