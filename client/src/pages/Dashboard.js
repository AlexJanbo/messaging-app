import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import ChatContainer from '../components/ChatContainer'

function Dashboard() {

  const [ chat, setChat ] = useState('')
  const selectChat = (chatId) => {
    setChat(chatId)
  }

  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar />
            <Stack direction="row">
              <ChatContainer chat={chat} setChat={selectChat}/>
              {chat ?
                <ChatWindow chat={chat} setChat={selectChat}/>
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