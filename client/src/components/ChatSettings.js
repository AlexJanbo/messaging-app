import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DeleteMessages } from '../features/message/messageSlice'
import { ChangeChatAdmin, ChangeChatName, DeleteChat, LeaveChat } from '../features/chat/chatSlice'
import { useDispatch } from 'react-redux'

export default function ChatSettings(props) {
  
  const { chatId, user, handleShowMessages } = props
  const [ newChatName, setNewChatName ] = useState()
  const [ newAdminUsername, setNewAdminUsername] = useState()

  const dispatch = useDispatch()

  const handleDeleteChat = (e) => {
    e.preventDefault()
    dispatch(DeleteMessages(chatId))
    dispatch(DeleteChat(chatId))
    window.location.reload()
  }

  const handleLeaveChat = (e) => {
    e.preventDefault()
    dispatch(LeaveChat({ chatId, user}))
    window.location.reload()
  }

  const handleChangeChatName = (e) => {
    e.preventDefault()
    dispatch(ChangeChatName({ chatId, newChatName}))
    window.location.reload()
  }

  const handleChangeChatAdmin = (e) => {
    e.preventDefault()
    dispatch(ChangeChatAdmin({ chatId, newAdminUsername }))
    window.location.reload()
  }

  return (
    <Grid sx={{display: "flex", flexDirection: "column", height: "70vh", backgroundColor: "#676767", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Grid sx={{ margin: 1}}>
        <form>
          <TextField
              id="newName"
              label="New chat name"
              type="text"
              name="newChat"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              />
          <Button sx={{ color: "white"}} type="submit" onClick={handleChangeChatName}>
              Change chat name!
          </Button>
        </form>
      </Grid>
      <Grid sx={{ margin: 1}}>
        <form>
          <TextField
            id="newAdmin"
            label="New admin username"
            type="text"
            name="newAdmin"
            value={newAdminUsername}
            onChange={(e) => setNewAdminUsername(e.target.value)}
          />
          <Button sx={{ color: "white"}} type="submit" onClick={handleChangeChatAdmin}>
            Change admin!
          </Button>
        </form>
      </Grid>
      <Button sx={{ margin: 1, color: "gold"}} onClick={handleLeaveChat}>
        Leave chat
      </Button>
      <Button sx={{ margin: 1, color: "gold"}} onClick={handleDeleteChat}>
        Delete chat
      </Button>
      <Button size="large" sx={{ margin: 1, justifyItems: "flex-end", color: "white", width: "100%", height: "10vh"}} onClick={handleShowMessages}>
            Back to chat
      </Button>
    </Grid>
  )
}