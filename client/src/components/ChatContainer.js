import { Button, Fab, FormControl, FormLabel, Grid, Input, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat, GetAllChats, reset } from '../features/chat/chatSlice';
import { GetUserInformation } from '../features/auth/authSlice';

export default function ChatContainer (props) {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { chats } = useSelector((state) => state.chat)

    
    const [ username, setUsername ] = useState('')
    
    const userId = user.id
    useEffect(() => {

        dispatch(GetAllChats({ userId }))

        return () => {
            dispatch(reset())
        }
    }, [])

    
    const handleCreateChat = (e) => {
        e.preventDefault()

        dispatch(CreateChat({ user, username }))
    }

    return (
        <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
            <Grid sx={{display: "flex", height: "10vh", borderBottom: "2px solid black", backgroundColor: "#808080", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "white"}}>My Chats</Typography>
                {/* <Fab size="small" color="primary" aria-label="add" sx={{ margin: "2px"}}>
                    <AddIcon />
                </Fab> */}
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", height: "70vh", overflowY: "auto", width: "100%"}}>
                {chats.length > 0 
                ?
                chats.map((chat, index) => {
                    return (
                        <Grid key={index} sx={{ height: "20vh", margin: "10px" }}>
                            <Typography> {chat.chatName}</Typography>
                            <Typography> {chat.members}</Typography>
                        </Grid>
                    )
                })
                :
                <Typography>No Chats</Typography>
            }
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row"}}>
                <FormControl >
                    <TextField
                        id="username"
                        label="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button onClick={handleCreateChat}>
                        Add user to chat!
                    </Button>
                </FormControl>
            </Grid>
        </Grid>        
    )

}