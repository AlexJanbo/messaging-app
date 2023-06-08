import { Button, CircularProgress, Fab, FormControl, FormControlLabel, FormLabel, Grid, Input, Skeleton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat, CreateGroupChat, GetAllChats, reset } from '../features/chat/chatSlice';
import { GetAllUsers, GetUserInformation } from '../features/auth/authSlice';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddUserModal from './AddUserModal';
import CreateGroupChatModal from './CreateGroupChatModal';
import AvatarCircle from './AvatarCircle';


export default function MyChats (props) {


    const { setOpenChat, user } = props

    const { chats, isLoading, isError, message } = useSelector((state) => state.chat)



    if(isLoading) {
        return (
            <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
                <Skeleton variant="rectangular" height="100%" width="100%" />
            </Grid>
        )
    }


    
    return (
        <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
            <Grid sx={{display: "flex", height: "10vh", borderBottom: "2px solid black", backgroundColor: "#808080", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "white"}}>My Chats</Typography>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", height: "60vh", overflowY: "auto", width: "100%"}}>
                {chats.length > 0 
                ?
                chats.map((chat) => {
                    return (
                        <Grid onClick={() => setOpenChat(chat._id)} key={chat._id} sx={{display: "flex", direction: "row", height: "10vh", justifyContent: "space-between", borderBottom: "1px solid blue", flexShrink: 0}}>
                            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", align: "center", width: "80%"}}>
                                <Typography  variant="h6" sx={{ marginLeft: "5%"}}> {chat.chatName}</Typography>
                                <Grid sx={{ display: "flex", flexDirection: "row", wrap: "wrap", overflowX: "hidden", marginTop: 1, marginLeft: "5%"}}>
                                    {chat.lastMessage && <AvatarCircle image={chat.lastMessage.sender.image} />}
                                    {chat.lastMessage && <Typography sx={{ marginLeft: "5%"}}>{chat.lastMessage.text}</Typography> }
                                </Grid>
                            </Grid>
                            <Button onClick={() => setOpenChat(chat._id)}>
                               <ChatIcon />
                            </Button>
                        </Grid>
                    )
                })
                :
                <Grid sx={{display: "flex", flexDirection: "row", height: "10vh", justifyContent: "center", marginTop: "10px"}}>
                    <Typography>No Chats</Typography>
                </Grid>
                }
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", alignContent: "flex-end"}}>
                <AddUserModal user={user} setOpenChat={setOpenChat}/>
                <CreateGroupChatModal />
            </Grid>
        </Grid>        
    )

}