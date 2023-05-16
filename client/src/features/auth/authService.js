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
    console.log(response.data)
    return response.data
}

const LogoutUser = () => {
    localStorage.removeItem('user')
}

const GetUserInformation = async (userData) => {
    
    const response = await axios.post(API_URL + 'profile', userData)
    
    return response.data
}

const authService = {
    RegisterUser,
    LoginUser,
    LogoutUser,
    GetUserInformation,
}

export default authService