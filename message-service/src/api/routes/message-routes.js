const express = require('express')
const { SendMessage, GetMessages, DeleteMessage } = require('../controllers/message-controller')
// const { Authenticate } = require('../middleware/authentication')


const router = express.Router()

router.route('/send-message').post(SendMessage)
// router.route('/get-messages').get(Authenticate, GetMessages)
// router.route('/delete-messages').delete(Authenticate, DeleteMessage)

module.exports = router