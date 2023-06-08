import { AppBar, Box, Button, Grid, ListItemIcon, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { LogoutUser, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import ForumIcon from '@mui/icons-material/Forum';


export default function Navbar(props) {

    const { user } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = (e) => {
        e.preventDefault()
        window.location.reload()
    }

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(LogoutUser())
        dispatch(reset())
    }

  return (
    <>
        <AppBar position="static">
            <Grid sx={{ height: "10vh", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#000030"}}>

                <Grid>
                    <Link to={'/dashboard'}>
                        <Typography color="white">
                            Chats
                        </Typography>
                    </Link>
                </Grid>

                <Grid>
                    <Toolbar>
                        <Typography variant="h2" fontFamily="cavolini" onClick={handleClick} >
                            Messaging App
                        </Typography>
                    </Toolbar>
                </Grid>
                <Grid>
                    <Link to={`/profile/${user.id}`}>
                        <Typography color="white">
                            Profile
                        </Typography>
                    </Link>
                </Grid>
                <Grid sx={{ marginLeft: "1%"}}>
                    <Button onClick={handleLogout} color="error" variant="contained" >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
    </>
  )
}
