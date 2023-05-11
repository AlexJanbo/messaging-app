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
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography>
                        Messaging App
                    </Typography>
                    <Grid sx={{ marginLeft: "85%", display: "flex"}}>
                        <Button onClick={handleLogout} color="error" variant="contained" >
                            Logout
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}
