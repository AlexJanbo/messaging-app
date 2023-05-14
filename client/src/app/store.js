import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    }
})