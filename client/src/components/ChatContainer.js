import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChatMenu from './ChatMenu'
import ChatWindow from './ChatWindow'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import ChatMembers from './ChatMembers';
import ChatSettings from './ChatSettings';

export default function ChatContainer(props) {

    const { user, previousMessages, openChat, setOpenChat } = props
    const { isLoading } = useSelector((state) => state.message)

    const [ showMessages, setShowMessages ] = useState(true)
    const [ showMembers, setShowMembers ] = useState(false)
    const [ showSettings, setShowSettings ] = useState(false)

    const handleShowMembers = () => {
        setShowMessages(false)
        setShowSettings(false)
        setShowMembers(true)
    }

    const handleShowMessages = () => {
        setShowMembers(false)
        setShowSettings(false)
        setShowMessages(true)
    }

    const handleShowSettings = () => {
        setShowMembers(false)
        setShowMessages(false)
        setShowSettings(true)
    }


    const handleClose = (e) => {
        e.preventDefault()
        setOpenChat('')
    }

    console.log(showMessages)

    return (
        <>
        <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh", overflow: "hidden"}}>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8f9fa", borderBottom: "2px solid black"}}>
                <Grid sx={{ width: "5vw"}}>
                    {showMessages &&
                        <Button onClick={handleClose} color="error" m={1} p={1}>
                            Close chat
                        </Button>
                    }
                    {(showMembers || showSettings) &&
                        <Button onClick={handleShowMessages} m={1} p={1} >
                            Back to chat
                        </Button>
                    }
                </Grid>
                <Grid >
                    <Typography variant='h4' align="center">Chat name</Typography>
                </Grid>
                <Grid >
                    <ChatMenu handleShowMembers={handleShowMembers} handleShowSettings={handleShowSettings}/>
                </Grid>
            </Grid>
            {showMessages && <ChatWindow user={user} previousMessages={previousMessages} openChat={openChat} setOpenChat={setOpenChat} />}
            {showMembers && <ChatMembers />}
            {showSettings && <ChatSettings />}
        </Grid>
           
        </>
    )
}
