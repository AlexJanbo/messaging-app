const dotEnv = require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    TEST_MONGODB_URI: process.env.TEST_MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGE_QUEUE_URL: process.env.MESSAGE_QUEUE_URL,
    EXCHANGE_NAME: "message-service"
}