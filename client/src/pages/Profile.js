import React from 'react'
import ProfileWindow from '../components/ProfileWindow'
import { useSelector } from 'react-redux'
import { Paper, Stack } from '@mui/material'
import Navbar from '../components/Navbar'

export default function Profile() {

    const { user } = useSelector((state) => state.auth)
  return (
      <>

        <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
          <Stack direction="column">
            <Navbar user={user} />
            <ProfileWindow user={user} />
            {/* <Stack direction="row">

            </Stack> */}
          </Stack>
        </Paper>
    </>

  )
}
