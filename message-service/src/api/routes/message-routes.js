const express = require('express')
const { SendMessage, GetMessages, DeleteMessages } = require('../controllers/message-controller')
// const { Authenticate } = require('../middleware/authentication')


const router = express.Router()

router.route('/send-message').post(SendMessage)
router.route('/get-messages').post(GetMessages)
router.route('/delete-messages/:id').delete(DeleteMessages)

module.exports = router