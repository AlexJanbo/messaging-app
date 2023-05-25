import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import ChatMenu from './ChatMenu'
import ChatWindow from './ChatWindow'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

export default function ChatContainer(props) {

    const { user, previousMessages, openChat, setOpenChat } = props
    const { isLoading } = useSelector((state) => state.message)

    

    const handleClose = (e) => {
        e.preventDefault()
        setOpenChat('')
    }

    return (
        <>
        <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh", overflow: "hidden"}}>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "#808080", borderBottom: "2px solid black"}}>
                <Button onClick={handleClose} color="error">
                    <ArrowBackIcon />
                </Button>
                <Typography variant='h4' textAlign="center" color="white">Chat name</Typography>
                <ChatMenu />
            </Grid>
            {!isLoading && 
            <ChatWindow user={user} previousMessages={previousMessages} openChat={openChat} setOpenChat={setOpenChat} />
            }
        </Grid>
           
        </>
    )
}
