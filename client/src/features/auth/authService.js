import axios from 'axios'

const API_URL = "/api/users/"


const RegisterUser = async (userData) => {

    const response = await axios.post(API_URL + 'register', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const LoginUser = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const LogoutUser = () => {
    localStorage.removeItem('user')
}

const GetUserInformation = async (userData) => {
    
    const response = await axios.post(API_URL + 'profile', userData)
    
    return response.data
}

const GetUserById = async (userId, token) => {

    const config = {
        Authorization: `Bearer ${token}`
    }

    const response = await axios.put(API_URL + 'get-user/' + userId, userId, token)

    return response.data
}

const ChangeProfilePicture = async(userData, token) => {
    
    const config = {
        Authorization: `Bearer ${token}`
    }

    const response = await axios.put(API_URL + 'change-profile-picture', userData, config)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const GetAllUsers = async(token) => {
    
    const config = {
        Authorization: `Bearer ${token}`
    }

    const response = await axios.get(API_URL + 'get-all-users', config)
    return response.data
}

const authService = {
    RegisterUser,
    LoginUser,
    LogoutUser,
    GetUserInformation,
    GetUserById,
    ChangeProfilePicture,
    GetAllUsers,
}

export default authService