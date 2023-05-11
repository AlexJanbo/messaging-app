import { Paper } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'

function Dashboard() {
  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
            <Navbar />
            <ChatWindow />
        </Paper>
    </>
  )
}

export default Dashboard