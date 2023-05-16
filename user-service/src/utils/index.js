const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const amqplib = require('amqplib')

const { APP_SECRET, MESSAGE_QUEUE_URL, EXCHANGE_NAME } = require('../config')

// Utility functions


// Generate a hashed password
const GenerateHashedPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        throw new Error("Unable to generate hashed password")
        console.log(error)
    }

}


// Validate password
const ValidatePassword = async(enteredPassword, savedPassword) => {
    try {
        const match = await bcrypt.compare(enteredPassword, savedPassword)
        return match
    } catch (error) {
        throw new Error("Unable to validate password")
        console.log(error)
    }
}


// Generate a signed JSON Web Token
const GenerateSignedJWT = (id) =>{
    try {
        return jwt.sign({id}, APP_SECRET, { expiresIn: "30d"})
    } catch (error) {
        throw new Error("Unable so generate signed JWT")
        console.log(error)
    }
}

// Validate a JSON Web Token
const ValidateJWT = async(req) => {
    try {
        const signature = req.get("Authorization")
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET)
        if(req.user = payload) {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }    
}

// Message broker
const CreateChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_QUEUE_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true })
    } catch (error) {
        throw new Error(error.message)
    }
}

const PublishMessage = async (channel, service, message) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(message))
    console.log("sent", message)
}

const SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true })
    const queue = await channel.assertQueue("", { exclusive: true })
    console.log(`Waiting for message in queue: ${queue.queue}`)

    channel.bind(queue.queue, EXCHANGE_NAME, USER_SERVICE, EXCHANGE_NAME)

    channel.consume(
        queue.queue,
        (message) => {
            if(message.content) {
                console.log("The message is:", message.content.toString())
                service.SubscribeEvents(message.content.toString())
            }
            console.log("[X] recieved")
        },
        {
            noAck: true
        }
    )
}


module.exports = {
    GenerateHashedPassword,
    ValidatePassword,
    GenerateSignedJWT,
    ValidateJWT,
    CreateChannel,
    PublishMessage,
    SubscribeMessage,
}