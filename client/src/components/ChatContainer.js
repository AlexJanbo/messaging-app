import { Button, Grid, Skeleton, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChatMenu from './ChatMenu'
import ChatWindow from './ChatWindow'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import ChatMembers from './ChatMembers';
import ChatSettings from './ChatSettings';
import CloseIcon from '@mui/icons-material/Close';
import { reset } from '../features/chat/chatSlice'
import { reset as resetMessage } from '../features/message/messageSlice'

export default function ChatContainer(props) {

    const { user, previousMessages, openChat, setOpenChat, currentChat } = props
    const { isLoading } = useSelector((state) => state.message)

    const dispatch = useDispatch()




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
        window.location.reload()
    }

    if(isLoading) {
        return (
            <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh", overflow: "hidden"}}>
                <Skeleton variant="rectangular" height="100%" width="100%"/>
            </Grid>
        )
    }

    return (
        <>
        <Grid sx={{ backgroundColor: "#676767", display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh", overflow: "hidden"}}>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid black"}}>
                <Grid sx={{ width: "5vw"}}>
                    <Button onClick={handleClose} color="error" m={1} p={1}>
                        <CloseIcon />
                    </Button>
                </Grid>
                <Grid >
                    <Typography variant='h4' align="center" sx={{ color: "white"}}>{currentChat.chatName}</Typography>
                </Grid>
                <Grid >
                    <ChatMenu handleShowMembers={handleShowMembers} handleShowSettings={handleShowSettings}/>
                </Grid>
            </Grid>
            {showMessages && <ChatWindow user={user} previousMessages={previousMessages} openChat={openChat} setOpenChat={setOpenChat} />}
            {showMembers && <ChatMembers members={currentChat.members} chatId={openChat} handleShowMessages={handleShowMessages}/>}
            {showSettings && <ChatSettings user={user} chatId={openChat} handleShowMessages={handleShowMessages}/>}
        </Grid>
           
        </>
    )
}
