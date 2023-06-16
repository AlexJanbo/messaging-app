import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DeleteMessages } from '../features/message/messageSlice'
import { ChangeChatAdmin, DeleteChat, LeaveChat } from '../features/chat/chatSlice'
import { useDispatch } from 'react-redux'
import ChangeNameModal from './ChatNameModal'
import ChangeAdminModal from './ChangeAdminModal'

export default function ChatSettings(props) {
  
  const { chatId, user, handleShowMessages, members } = props
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



  return (
    <Grid sx={{display: "flex", flexDirection: "column", height: "70vh", backgroundColor: "#676767", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Grid sx={{ height: "60vh", display: "flex", flexDirection: "column", marginTop: "10vh"}}>
        <Grid sx={{ margin: 1}}>
            <ChangeNameModal chatId={chatId}/>
        </Grid>
        <Grid sx={{ margin: 1}}>
          {/* <form>
            <TextField
              id="newAdmin"
              label="New admin username"
              type="text"
              name="newAdmin"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
            />
            <Button sx={{ color: "gold"}} type="submit" onClick={handleChangeChatAdmin}>
              Change admin!
            </Button>
          </form> */}
          <ChangeAdminModal members={members} chatId={chatId} user={user}/>
        </Grid>
        <Button sx={{ margin: 1, color: "gold"}} onClick={handleLeaveChat}>
          Leave chat
        </Button>
        <Button sx={{ margin: 1, color: "red"}} onClick={handleDeleteChat}>
          Delete chat
        </Button>
      </Grid>
      <Grid sx={{ height: "10vh", width: "100%", borderTop: "1px solid black", marginTop: 1}}>
        <Button size="large" sx={{ justifyItems: "flex-end", color: "white", width: "100%", height: "10vh"}} onClick={handleShowMessages}>
              Back to chat
        </Button>
      </Grid>
    </Grid>
  )
}