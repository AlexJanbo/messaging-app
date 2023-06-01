import { Button, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import MyChats from '../components/MyChats'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllChats, reset } from '../features/chat/chatSlice'
import { GetMessages } from '../features/message/messageSlice'
import ChatContainer from '../components/ChatContainer'
import ProfileWindow from '../components/ProfileWindow'

function Dashboard() {

  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const { user } = useSelector((state) => state.auth)
  const { chats, isError, message} = useSelector((state) => state.chat)
  const { messages, isLoading } = useSelector((state) => state.message)

  const [ openProfile, setOpenProfile ] = useState(false)

  const [ openChat, setOpenChat ] = useState('')
  const selectOpenChat = (chatId) => {
    setOpenChat(chatId)
  }
  const chatId = openChat

  const currentChat = chats?.find((chat) => chat._id === chatId)


  useEffect(() => {
    if(chatId) {
      dispatch(GetMessages({ chatId }))
    }
  }, [openChat])
  




  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar user={user}/>
            <Stack direction="row">
              {isLoading && <Skeleton variant="rectangular" height="70vh" />}
              <MyChats user={user} openChat={openChat} setOpenChat={selectOpenChat}/>
              {openChat ?
                <ChatContainer currentChat={currentChat} user={user} chats={chats} previousMessages={messages} openChat={openChat} setOpenChat={selectOpenChat}/>
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