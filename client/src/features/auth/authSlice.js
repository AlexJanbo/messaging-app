import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get the user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const RegisterUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.RegisterUser(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const LoginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.LoginUser(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const LogoutUser = createAsyncThunk('auth/logout', async () =>
    await authService.LogoutUser()
)

export const GetUserInformation = createAsyncThunk('auth/getUser', async (userData, thunkAPI) => {
    try {
        return await authService.GetUserInformation(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(LogoutUser.fulfilled, (state) => {
                state.user = null
            })
            .addCase(GetUserInformation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetUserInformation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user.member = action.payload
            })
            .addCase(GetUserInformation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer