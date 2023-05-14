import { Button, Fab, FormControl, FormLabel, Grid, Input, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { CreateChat } from '../features/chat/chatSlice';

export default function ChatContainer (props) {

    const dispatch = useDispatch()

    const [ username, setUsername ] = useState('')

    const handleCreateChat = (e) => {
        e.preventDefault()

        dispatch(CreateChat(username))
    }

    return (
        <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
            <Grid sx={{display: "flex", height: "10vh", borderBottom: "2px solid black", backgroundColor: "#808080", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4" sx={{ textAlign: "center", color: "white"}}>My Chats</Typography>
                {/* <Fab size="small" color="primary" aria-label="add" sx={{ margin: "2px"}}>
                    <AddIcon />
                </Fab> */}
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