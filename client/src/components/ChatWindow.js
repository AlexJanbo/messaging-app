import { Button, Divider, FormControl, Grid, Input, List, ListItem, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

export default function ChatWindow(props) {

    const { user } = useSelector((state) => state.auth)
    const currentUser = user

    const recipientUser = props.recipientUser

    const [ socket, SetSocket ] = useState(null)
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

    const messageEndRef = useRef(null)

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:1234`)
        SetSocket(newSocket)
        return () => newSocket.close()
    }, [])

    useEffect(() => {
        if(!socket) return

        socket.on('chat message', (data) => {
            setMessages((prevState) => [...prevState, data])
            setMessage('')
        })

        return () => socket.off('chat message')
    }, [socket])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView()
    }, [messages])

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        if(!message) {
            return
        }
        const data = {
            sender: currentUser,
            recipient: recipientUser,
            text: message
        }
        socket.emit('chat message', {
            data
        })
    }
    console.log(messages)

    return (
        <Grid sx={{display: "flex", flexDirection: "column", marginTop: "5vh", marginLeft: "5vw", border: "2px solid black", borderRadius: "2%", boxShadow: "1px", width: "60vw", height: "80vh"}}>
            <Grid sx={{ backgroundColor: "#1976d2", borderBottom: "2px solid black" }}>
                <Typography variant='h4' textAlign="center" color="white">Chat name</Typography>
            </Grid>
            <Grid sx={{ overflowY: "auto", overflowX: "hidden", height: "70vh", backgroundColor: "#f6f6f6", width: "100%" }}>
                    <List>
                        {messages.map((message, index) => (
                            message.data.sender.username === user.username
                            ?
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-end"}}>

                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word"}}>
                                    <Typography sx={{ wordWrap: "break-word"}}> {message.data.text}</Typography>
                                </Grid>
                                <PersonIcon />
                            </ListItem>
                            :
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-start"}}>
                                <PersonIcon />
                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word"}}>
                                    <Typography sx={{ textDecoration: "underline"}}>{message.data.sender.username}: </Typography>
                                    <Typography sx={{ wordWrap: "break-word"}}> {message.data.text}</Typography>
                                </Grid>
                            </ListItem>
                            
                        ))}
                    </List>
                    <div ref={messageEndRef} />
            </Grid>
                <form>
            <Grid sx={{ display: "flex", justifyContent: "center", borderTop: "1px solid black"}}>
                    <TextField
                        type='text'
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ margin: "5px"}}
                    />
                    <Button type="submit" onClick={handleSubmitMessage} endIcon={<SendIcon />}/>
            </Grid>
                </form>
        </Grid>
    )
}