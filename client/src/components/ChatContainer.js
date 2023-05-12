import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function ChatContainer (props) {

    return (
        <Grid sx={{height: "90vh", width: "30vw", border: "2px solid black", margin: "0"}}>
            <Grid sx={{ marginTop: "5%", borderBottom: "1px solid black"}}>
                <Typography variant="h5" sx={{ textAlign: "center"}}>My Chats</Typography>
            </Grid>
        </Grid>        
    )

}