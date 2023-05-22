import { Button, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import ChatContainer from '../components/ChatContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllChats, reset } from '../features/chat/chatSlice'
import { GetMessages } from '../features/message/messageSlice'

function Dashboard() {

  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const { user } = useSelector((state) => state.auth)
  const { chats, isError, message} = useSelector((state) => state.chat)
  const { messages, isLoading } = useSelector((state) => state.message)

  const [ openChat, setOpenChat ] = useState('')
  const selectOpenChat = (chatId) => {
    setOpenChat(chatId)
  }
  const chatId = openChat

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    const username = user.username
    dispatch(GetAllChats({ username }))
  
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    if(chatId) {
      dispatch(GetMessages({ chatId }))
    }
  }, [openChat])
  


  if(isLoading) {
    return <CircularProgress sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
  }

  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar />
            <Stack direction="row">
              <ChatContainer user={user} allChats={chats} openChat={openChat} setOpenChat={selectOpenChat}/>
              {openChat ?
                <ChatWindow user={user} previousMessages={messages} openChat={openChat} setOpenChat={selectOpenChat} />
                :
                <Typography>Open a chat!</Typography>
              }
            </Stack>
          </Stack>
        </Paper>
    </>
  )
}

export default Dashboard