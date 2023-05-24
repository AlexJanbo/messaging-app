import { Button, Fab, FormControl, FormControlLabel, FormLabel, Grid, Input, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat, CreateGroupChat, GetAllChats, reset } from '../features/chat/chatSlice';
import { GetUserInformation } from '../features/auth/authSlice';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ChatContainer (props) {


    const { setOpenChat, user, chats } = props


    const dispatch = useDispatch()


    // Input variable for adding user to one-to-one chat
    const [ memberUsername, setMemberUsername ] = useState('')

    
    const handleCreateChat = (e) => {
        e.preventDefault()

        dispatch(CreateChat({ user, memberUsername }))
        dispatch(reset())
        window.location.reload()
    }


    return (
        <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
            <Grid sx={{display: "flex", height: "10vh", borderBottom: "2px solid black", backgroundColor: "#808080", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "white"}}>My Chats</Typography>
                {/* <Fab size="small" color="primary" aria-label="add" sx={{ margin: "2px"}}>
                    <AddIcon />
                </Fab> */}
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", maxHeight: "70vh", overflowY: "auto", width: "100%"}}>
                {chats.length > 0 
                ?
                chats.map((chat, index) => {
                    return (
                        <Grid key={index} sx={{display: "flex", direction: "row", height: "10vh", justifyContent: "center", alignItems: "center", borderBottom: "1px solid blue", flexShrink: 0}}>
                            <Typography> {chat.chatName}</Typography>
                            <Button onClick={() => setOpenChat(chat._id)}>
                                <ChatIcon />
                            </Button>
                        </Grid>
                    )
                })
                :
                <Typography>No Chats</Typography>
            }
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", paddingTop: "20px"}}>
                <form>
                    <TextField
                        id="username"
                        label="Add user to chat"
                        type="text"
                        name="username"
                        value={memberUsername}
                        onChange={(e) => setMemberUsername(e.target.value)}
                        />
                    <Button type="submit" onClick={handleCreateChat}>
                        <AddCircleIcon fontSize="large"/>
                    </Button>
                </form>
            </Grid>
        </Grid>        
    )

}