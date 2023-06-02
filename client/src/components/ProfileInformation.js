import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'

export default function ProfileInformation(props) {
    
    const { user } = props
    console.log(user.username)
  
    return (
    <>
        <Grid sx={{ display: "flex", flexDirection: "column", height: "100%", width: "50%", marginLeft: "5%"}}>
            
            <Typography>{user.username}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.createdAt}</Typography>

        </Grid>
    </>
  )
}
