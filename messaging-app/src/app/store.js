import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authReducer,
    }
})