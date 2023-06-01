import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ProfilePicture from './ProfilePicture';
import ProfileInformation from './ProfileInformation';


export default function ProfileWindow(props) {

  const { user } = props

  return (
      <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "40vw", height: "60vh", overflow: "hidden"}}>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", borderBottom: "2px solid black"}}>
                <Grid >
                    <Typography variant='h4' align="center">Profile</Typography>
                </Grid>
            </Grid>
            <ProfilePicture user={user} />
            <ProfileInformation user={user} />
    </Grid>
  )
}
