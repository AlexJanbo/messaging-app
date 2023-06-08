import React, { useEffect } from 'react'
import ProfileWindow from '../components/ProfileWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Paper, Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { GetUserById, reset } from '../features/auth/authSlice'

export default function Profile() {

    const { userId } = useParams()

    const dispatch = useDispatch()
    const { member } = useSelector((state) => state.auth)

    console.log(useSelector((state) => state.auth))
    useEffect(() => {
      GetUserById({ userId })

      return () => {
        dispatch(reset())
      }
    })
    console.log(useParams())
  return (
      <>

        <Paper square sx={{ backgroundColor: "#676767", height: "100vh"}} >
          <Stack direction="column">
            {/* <Navbar user={user} /> */}
            
            {/* <Grid sx={{ display: "flex", justifyContent: "center"}}>
                <ProfileWindow user={user} />
            </Grid>  */}
            {/* <Stack direction="row">

            </Stack> */}
          </Stack>
        </Paper>
    </>

  )
}
