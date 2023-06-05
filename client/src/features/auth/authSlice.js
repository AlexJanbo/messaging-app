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
    users: [],
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


export const GetUserById = createAsyncThunk('auth/getUserById', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.GetUserById(userId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const ChangeProfilePicture = createAsyncThunk('auth/changeProfilePicture', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.ChangeProfilePicture(userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const GetAllUsers = createAsyncThunk('auth/getAllUsers', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.GetAllUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const QueryUsers = createAsyncThunk('auth/queryUsers', async(searchQuery, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.QueryUsers(searchQuery, token)
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
            .addCase(GetUserById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(GetUserById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            .addCase(ChangeProfilePicture.pending, (state) => {
                state.isLoading = true
            })
            .addCase(ChangeProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(ChangeProfilePicture.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(GetAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(GetAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(QueryUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(QueryUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(QueryUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer