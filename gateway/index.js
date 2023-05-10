const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', proxy('http://localhost:5000'))

app.listen(8000, () => {
    console.log("Gateway is listening on port 8000")
})