import { Button, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import MyChats from '../components/MyChats'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllChats, reset } from '../features/chat/chatSlice'
import { GetMessages, reset as resetMessages } from '../features/message/messageSlice'
import { GetAllUsers, reset as resetAuth } from '../features/auth/authSlice'
import ChatContainer from '../components/ChatContainer'
import ProfileWindow from '../components/ProfileWindow'

function Dashboard() {

  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  
  const { user } = useSelector((state) => state.auth)
  const { chats, isError, message } = useSelector((state) => state.chat)
  

  const [ openChat, setOpenChat ] = useState('')
  const selectOpenChat = (chatId) => {
    setOpenChat(chatId)
  }
  const chatId = openChat
  const username = user.username

  useEffect(() => {
      dispatch(GetAllChats({ username }))
      if(openChat) {
        dispatch(GetMessages({ chatId }))
      }
      // dispatch(GetAllUsers())
      
      return () => {
          dispatch(reset())
          dispatch(resetMessages())
          dispatch(resetAuth())
      }
  }, [openChat])
  
  const currentChat = chats.find((chat) => chat._id === chatId)

  



  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar user={user}/>
            <Stack direction="row">
              <MyChats user={user} openChat={openChat} setOpenChat={selectOpenChat}/>
              {openChat ?
                <ChatContainer currentChat={currentChat} user={user} chats={chats} openChat={openChat} setOpenChat={selectOpenChat}/>
                :
                <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "70vw"}}>
                  <Typography>Open a chat!</Typography>
                </Grid>
              }
            </Stack>
          </Stack>
        </Paper>
    </>
  )
}

export default Dashboard