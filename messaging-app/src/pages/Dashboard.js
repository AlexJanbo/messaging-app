import { Paper } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
            <Navbar />
        </Paper>
    </>
  )
}

export default Dashboard