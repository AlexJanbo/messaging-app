const express = require('express')
const { PORT } = require('/src/config/')

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
    res.status(200).send({"msg": "User Jebaited"})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})