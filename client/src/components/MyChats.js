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
        <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", margin: "0"}}>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "flex-end", marginTop: "10vh"}}>
                <AddUserModal user={user} setOpenChat={setOpenChat}/>
                <CreateGroupChatModal />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", height: "60vh", overflowY: "auto", width: "100%"}}>
                {chats.length > 0 
                ?
                chats.map((chat) => {
                    return (
                        <Grid onClick={() => setOpenChat(chat._id)} key={chat._id} sx={{display: "flex", direction: "row", backgroundColor: "#636363", height: "10vh", justifyContent: "space-between", marginTop: "3vh", marginLeft: "2vw", border: "1px solid black", borderRadius: "10px", flexShrink: 0, '&:hover': { backgroundColor: "#86c48a"}}}>
                            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", align: "center", width: "80%"}}>
                                <Typography  variant="h6" sx={{ color: "white", marginLeft: "5%"}}> {chat.chatName}</Typography>
                                <Grid sx={{ display: "flex", flexDirection: "row", wrap: "wrap", overflowX: "hidden", marginTop: 1, marginLeft: "5%"}}>
                                    {chat.lastMessage && <AvatarCircle image={chat.lastMessage.sender.image} />}
                                    {chat.lastMessage && <Typography sx={{ color: "white", marginLeft: "5%"}}>{chat.lastMessage.text}</Typography> }
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })
                :
                <Grid sx={{display: "flex", flexDirection: "row", height: "10vh", justifyContent: "center", marginTop: "10px"}}>
                    <Typography variant="h5" sx={{ color: "white"}}>No Chats</Typography>
                </Grid>
                }
            </Grid>
        </Grid>        
    )

}