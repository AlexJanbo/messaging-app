const express = require('express')
const { SendMessage, GetMessages, DeleteMessages } = require('../controllers/message-controller')
const { Authentication } = require('../middleware/authentication')


const router = express.Router()

router.route('/send-message').post(Authentication, SendMessage)
router.route('/get-messages').post(Authentication, GetMessages)
router.route('/delete-messages/:id').delete(Authentication, DeleteMessages)

module.exports = router