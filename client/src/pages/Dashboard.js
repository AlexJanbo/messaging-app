import { Paper, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import ChatContainer from '../components/ChatContainer'

function Dashboard() {
  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar />
            <Stack direction="row">
              <ChatContainer />
              <ChatWindow />

            </Stack>
          </Stack>
        </Paper>
    </>
  )
}

export default Dashboard