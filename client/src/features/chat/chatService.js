import axios from 'axios'

const API_URL = "/api/chats/"

const CreateChat = async(chatData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "create-chat", chatData, config)

    return response.data
}

const CreateGroupChat = async(chatData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "create-group-chat", chatData, config)

    return response.data
}

const GetAllChats = async(chatData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "get-all-chats", chatData, config)

    return response.data
}

const DeleteChat = async(chatId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "delete-chat/" + chatId, config)

    return response.data
}

const chatService = {
    CreateChat,
    CreateGroupChat,
    GetAllChats,
    DeleteChat,
}

export default chatService