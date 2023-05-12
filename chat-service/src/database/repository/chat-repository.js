const Chat = require('../models/Chat')

// All chat db logic

const CreateChat = async(members, admin, chatName) => {
    const chat = await Chat.create({
        members: members,
        admin: admin,
        isGroup: false,
        chatName: chatName, 
    })
    if(chat) {
        return chat
    } else {
        throw new Error("Unable to create chat")
    }
}

const GetChat = async(chatId) => {
    const chat = await Chat.findById(chatId)
    if(chat) {
        return chat
    } else {
        throw new Error("Unable to get chat")
    }
    return chat
}

const DeleteChat = async(chatId) => {
    const chat = await Chat.findByIdAndRemove(chatId)
    if(!chat) {
        return "Chat successfully removed"
    } else {
        throw new Error("Unable to delete chat")
    }
}

const CreateGroupChat = async(members, admin, chatName) => {
    const chat = await Chat.create({
        members: members,
        admin: admin,
        isGroup: true,
        chatName: chatName, 
    })
    if(chat) {
        return chat
    } else {
        throw new Error("Unable to create group chat")
    }
}

const AddGroupMember = async(chatId, memberId) => {
    const chat = await Chat.findByIdAndUpdate(chatId,
        { $push: { members: memberId}}
    )
    if(chat) {
        return chat
    } else {
        throw new Error("Unable to add member to group chat")
    }
}

const RemoveGroupMember = async(chatId, memberId) => {
    const chat = await Chat.findByIdAndUpdate(chatId,
        { $pull: { members: memberId}}    
    )

    if(chat) {
        return chat
    } else {
        throw new Error("Unable to remove member from group")
    }
}

const ChangeChatName = async(chatId, name) => {
    const chat = await Chat.findByIdAndUpdate(chatId,
        { $set: { chatName: name }}    
    )
    
    if(chat) {
        return chat
    } else {
        throw new Error("Unable to change chat name")
    }
}

const ChangeChatAdmin = async(chatId, newAdminId) => {
    const chat = await Chat.findByIdAndUpdate(chatId,
        { $set: { admin: newAdminId }}    
    )

    if(chat) {
        return chat
    } else {
        throw new Error("Unable to change group chat admin")
    }
}

module.exports = {
    CreateChat,
    GetChat,
    DeleteChat,
    CreateGroupChat,
    AddGroupMember,
    RemoveGroupMember,
    ChangeChatName,
    ChangeChatAdmin,
}