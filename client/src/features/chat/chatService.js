import axios from 'axios'

const API_URL = "api/chats/"

const CreateChat = async(chatData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "create-chat", chatData, config)

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

const chatService = {
    CreateChat,
    GetAllChats,
}

export default chatService