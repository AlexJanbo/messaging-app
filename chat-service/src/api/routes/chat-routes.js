const express = require('express')
const { CreateChat, GetAllChats, DeleteChat, AddGroupMember, RemoveGroupMember, ChangeChatName, ChangeChatAdmin, LeaveChat, CreateGroupChat, UpdateLastChatMessage } = require('../controllers/chat-controller')
const { Authentication } = require('../middleware/authentication')

const router = express.Router()

// API end points called from the client
router.route('/create-chat').post(Authentication, CreateChat)
router.route('/create-group-chat').post(Authentication, CreateGroupChat)
router.route('/get-all-chats').post(Authentication, GetAllChats)
router.route('/delete-chat/:id').delete(Authentication, DeleteChat)
router.route('/leave-chat').put(Authentication, LeaveChat)
router.route('/add-group-member').put(Authentication, AddGroupMember)
router.route('/remove-group-member').put(Authentication, RemoveGroupMember)
router.route('/change-chat-name').put(Authentication, ChangeChatName)
router.route('/change-chat-admin').put(Authentication, ChangeChatAdmin)

// API end points called from other services
// Separate authentication
router.route('/update-last-chat-message').put(UpdateLastChatMessage)


module.exports = router
