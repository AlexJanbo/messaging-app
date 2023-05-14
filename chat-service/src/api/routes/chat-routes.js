const express = require('express')
const { CreateChat } = require('../controllers/chat-controller')
// const { Authenticate } = require('../middleware/authentication')

const router = express.Router()


router.route('/create-chat').post(CreateChat)
// router.route('/get-chat').get(Authenticate, GetChat)
// router.route('/delete-chat').delete(Authenticate, DeleteChat)
// router.route('/add-group-member').put(Authenticate, AddGroupMember)
// router.route('/remove-group-member').put(Authenticate, RemoveGroupMember)
// router.route('/change-chat-name').put(Authenticate, ChangeChatName)
// router.route('/change-group-admin').put(Authenticate, ChangeGroupAdmin)


module.exports = router
