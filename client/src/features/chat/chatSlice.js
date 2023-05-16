import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
    chats: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create a new chat
export const CreateChat = createAsyncThunk('chats/create', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.CreateChat(chatData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all of a users chats
export const GetAllChats = createAsyncThunk('chats/getAll', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.GetAllChats(chatData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const chatSlice = createSlice({
    name: 'chat',
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
            .addCase(CreateChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(CreateChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats.push(action.payload)
            })
            .addCase(CreateChat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(GetAllChats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetAllChats.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(GetAllChats.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = chatSlice.actions
export default chatSlice.reducer