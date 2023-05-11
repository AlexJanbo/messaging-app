const express = require('express')
const { CreateChat, GetChat, DeleteChat, AddGroupMember, RemoveGroupMember, ChangeChatName, ChangeGroupAdmin } = require('../controllers/chat-controller')
const { Authenticate } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts')

const router = express.Router()


router.route('/create-chat').post(Authenticate, CreateChat)
router.route('/get-chat').get(Authenticate, GetChat)
router.route('/delete-chat').delete(Authenticate, DeleteChat)
router.route('/add-group-member').put(Authenticate, AddGroupMember)
router.route('/remove-group-member').put(Authenticate, RemoveGroupMember)
router.route('/change-chat-name').put(Authenticate, ChangeChatName)
router.route('/change-group-admin').put(Authenticate, ChangeGroupAdmin)


module.exports = router
