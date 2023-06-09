import axios from 'axios'

const API_URL = '/api/messages/'

const SendMessage = async(messageData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "send-message", messageData, config )

    return response.data
}

const GetMessages = async(messageData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "get-messages", messageData, config)

    return response.data
}

const DeleteMessages = async(chatId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "delete-messages/" + chatId, config)

    return response.data
}

const messageService = {
    SendMessage,
    GetMessages,
    DeleteMessages,
}

export default messageService