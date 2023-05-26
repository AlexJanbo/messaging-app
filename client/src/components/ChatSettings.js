import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function ChatSettings() {
  return (
    <Grid sx={{display: "flex", height: "70vh", backgroundColor: "#f6f6f6", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Typography>Settings</Typography>
    </Grid>
  )
}