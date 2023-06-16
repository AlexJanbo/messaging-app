import React, { useEffect } from 'react'
import ProfileWindow from '../components/ProfileWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Paper, Skeleton, Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { GetUserById, reset } from '../features/auth/authSlice'

export default function Profile() {

    const { userId } = useParams()

    const dispatch = useDispatch()
    const { profile, user, isLoading } = useSelector((state) => state.auth)

    useEffect(() => {

      let userData = {
        userId: userId
      }
      dispatch(GetUserById(userData))
      return () => {
        dispatch(reset())
      }
    }, [])

    if(isLoading) {
      return <Skeleton />
    }

    return (
        <>

          <Paper square sx={{ backgroundColor: "#676767", height: "100vh"}} >
            <Stack direction="column">
              <Navbar user={user} />
              <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <ProfileWindow profile={profile} />
              </Grid>
              
            </Stack>
          </Paper>
      </>

    )
}
