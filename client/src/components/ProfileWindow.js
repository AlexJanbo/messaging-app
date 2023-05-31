import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function ProfileWindow(props) {

  const { user } = props

  const handleClose = () => {

  }
  

  return (
      <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh", overflow: "hidden"}}>
          <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8f9fa", borderBottom: "2px solid black"}}>
              <Grid sx={{ width: "5vw"}}>
                  <Button onClick={handleClose} color="error" m={1} p={1}>
                      <CloseIcon />
                  </Button>
              </Grid>
              <Grid >
                  <Typography variant='h4' align="center">Profile</Typography>
              </Grid>
          </Grid>
              <img src={user.image} alt="profile-avatar" display="block" height="400px" width="400px" border="1px solid black"/>
    </Grid>
  )
}
