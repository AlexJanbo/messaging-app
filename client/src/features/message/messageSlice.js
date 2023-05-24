import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageService'

const initialState = {
    messages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Send a message
export const SendMessage = createAsyncThunk('messages/send', async (messageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.SendMessage(messageData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Gets all of the messages in a chat
export const GetMessages = createAsyncThunk('messages/getAll', async (messageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.GetMessages(messageData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Deletes all the messages in a chat
export const DeleteMessages = createAsyncThunk('messages/delete', async (chatId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.DeleteMessages(chatId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const messageSlice = createSlice({
    name: 'message',
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
            .addCase(SendMessage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SendMessage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages.push(action.payload)
            })
            .addCase(SendMessage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(GetMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetMessages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages = action.payload
            })
            .addCase(GetMessages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(DeleteMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteMessages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages = action.payload
            })
            .addCase(DeleteMessages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = messageSlice.actions
export default messageSlice.reducer