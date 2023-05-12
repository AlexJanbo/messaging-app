import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { LogoutUser, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(LogoutUser())
        dispatch(reset())
        navigate('/')
    }

  return (
    <>
        <AppBar position="static" sx={{ height: "10vh", maxWidth: "100vw"}}>
            <Grid sx={{ display: "flex", flexDirection: "row"}}>
                <Grid>
                    <Toolbar>
                        <Typography variant="h4">
                            Messaging App
                        </Typography>
                    </Toolbar>
                </Grid>
                <Grid>
                    <Toolbar>
                        <Button onClick={handleLogout} color="error" variant="contained" >
                            Logout
                        </Button>
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    </>
  )
}
