const jwt = require('jsonwebtoken')
const amqplib = require('amqplib')
const { EXCHANGE_NAME, MESSAGE_QUEUE_URL } = require('../config')

const ValidateJWT = async(req) => {
    try {
        const signature = req.get("Authorization")
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET)
        if(req.user === payload) {
            return true
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// Message broker
const CreateChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_QUEUE_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true })
        return channel
    } catch (error) {
        throw new Error(error.message)
    }
}

const PublishMessage = async (channel, service, message) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(message))
    console.log("Sent: ", message)
}


module.exports = {
    ValidateJWT,
    CreateChannel,
    PublishMessage,
}