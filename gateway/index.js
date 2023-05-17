const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/messages', proxy('http://localhost:4000'))
app.use('/api/users', proxy('http://localhost:5000'))
app.use('/api/chats', proxy('http://localhost:6000'))

app.listen(8000, () => {
    console.log("Gateway is listening on port 8000")
})