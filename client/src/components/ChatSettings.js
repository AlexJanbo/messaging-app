import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { DeleteMessages } from '../features/message/messageSlice'
import { DeleteChat, LeaveChat } from '../features/chat/chatSlice'
import { useDispatch } from 'react-redux'

export default function ChatSettings(props) {
  
  const { chatId, user } = props
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

  return (
    <Grid sx={{display: "flex", height: "70vh", backgroundColor: "#f6f6f6", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Typography>Settings</Typography>
      <Button onClick={handleLeaveChat}>
        Leave chat
      </Button>
      <Button onClick={handleDeleteChat}>
        Delete chat
      </Button>
    </Grid>
  )
}