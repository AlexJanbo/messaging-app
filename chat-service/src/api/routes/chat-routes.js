const express = require('express')
const { CreateChat, GetAllChats, DeleteChat, AddGroupMember, RemoveGroupMember, ChangeChatName, ChangeChatAdmin, LeaveChat, CreateGroupChat } = require('../controllers/chat-controller')
// const { Authenticate } = require('../middleware/authentication')

const router = express.Router()


router.route('/create-chat').post(CreateChat)
router.route('/create-group-chat').post(CreateGroupChat)
router.route('/get-all-chats').post(GetAllChats)
router.route('/delete-chat/:id').delete(DeleteChat)
router.route('/leave-chat').put(LeaveChat)
router.route('/add-group-member').put(AddGroupMember)
router.route('/remove-group-member').put(RemoveGroupMember)
router.route('/change-chat-name').put(ChangeChatName)
router.route('/change-chat-admin').put(ChangeChatAdmin)


module.exports = router
