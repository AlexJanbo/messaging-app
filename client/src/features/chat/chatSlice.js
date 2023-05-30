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

// Create a new group chat
export const CreateGroupChat =  createAsyncThunk('chats/createGroup', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.CreateGroupChat(chatData, token)
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

// Deletes a chat
export const DeleteChat = createAsyncThunk('chats/delete', async (chatId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.DeleteChat(chatId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Leave a chat
export const LeaveChat = createAsyncThunk('chats/leave', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.LeaveChat(chatData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Add a user to chat
export const AddGroupMember = createAsyncThunk('chats/addMember', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.AddGroupMember(chatData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Remove a user from chat
export const RemoveGroupMember = createAsyncThunk('chats/removeMember', async (chatData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.RemoveGroupMember(chatData, token)
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.message) || error.message || error.toString()
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
            .addCase(CreateGroupChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(CreateGroupChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats.push(action.payload)
            })
            .addCase(CreateGroupChat.rejected, (state, action) => {
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
            .addCase(DeleteChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DeleteChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(DeleteChat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(LeaveChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(LeaveChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(LeaveChat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(AddGroupMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddGroupMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(AddGroupMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(RemoveGroupMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RemoveGroupMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(RemoveGroupMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = chatSlice.actions
export default chatSlice.reducer