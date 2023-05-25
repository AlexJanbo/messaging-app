import { Button, CircularProgress, Divider, FormControl, Grid, Input, List, ListItem, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import {  DeleteMessages, SendMessage, reset } from '../features/message/messageSlice';
import { DeleteChat } from '../features/chat/chatSlice';
import ChatMenu from './ChatMenu';

export default function ChatWindow(props) {

    const dispatch = useDispatch()

    const { openChat, setOpenChat, user } = props
    const chatId = openChat

    const previousMessages = props.previousMessages
    const { isLoading } = useSelector((state) => state.message)

    
    const [ socket, setSocket ] = useState(null)
    const [ newMessage, setNewMessage ] = useState('')
    const [ messages, setMessages ] = useState([...previousMessages])
    const [ isTyping, setIsTyping ] = useState(false)
    const [ typingUser, setTypingUser ] = useState('')

    
    // This useEffect is for setting up the socket io
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:1234`)
        setSocket(newSocket)
        

        // Socket instance joins a specific chat room
        newSocket.emit('join chat', (chatId))
        // Cleanup function to disconnect the socket when component unmounts
        return () => newSocket.disconnect()
    }, [])


    // This useEffect handles events that the socket io instance receives
    useEffect(() => {
        if(!socket) return

        // Updates messages when a socket 'chat message' event is received
        socket.on('chat message', (data) => {
            setMessages((prevState) => [...prevState, data])
            setNewMessage('')
        })
        
        // Displays when a chat member is currently typing
        socket.on('typing', (userTyping) => {
            setIsTyping(true)
            setTypingUser(userTyping)
        })
        socket.on('stop typing', () => setIsTyping(false))
        return () => socket.off('chat message')
    }, [socket])
    

    // Reference to allow automatic scroll to new message
    const messageEndRef = useRef(null)
    useEffect(() => {
        messageEndRef.current?.scrollIntoView()
    }, [messages])



    const handleTyping = (e) => {
        e.preventDefault()
        setNewMessage(e.target.value)

        if(!socket) {
            return
        }

        if(!isTyping) {
            setIsTyping(true)
            socket.emit('typing', (chatId), (user))
        }

        let timeSinceType = new Date().getTime()
        const timeConstant = 4000
        setTimeout(() => {
            const currentTime = new Date().getTime()
            if((currentTime - timeSinceType) >= timeConstant && isTyping ) {
                socket.emit('stop typing', (chatId))
                setIsTyping(false)
            }
        }, timeConstant)
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        if(!newMessage) {
            return
        }
        socket.emit('stop typing', chatId)
        socket.emit('chat message', {
            sender: user,
            text: newMessage,
            chatId: chatId,
        }, chatId)
        dispatch(SendMessage({
            sender: user,
            text: newMessage,
            chatId: chatId,
        }))
        dispatch(reset())
    }

    const handleCloseChat = (e) => {
        e.preventDefault()
        setNewMessage('')
        setMessages([])
        setOpenChat('')
    }

    const handleDeleteChat = (e) => {
        e.preventDefault()
        dispatch(DeleteMessages(chatId))
        dispatch(DeleteChat(chatId))
        // setNewMessage('')
        // setMessages([])
        // setOpenChat('')
        window.location.reload()
    }

    if(isLoading) {
        return <CircularProgress sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
    }

    return (
        <>
            <Grid sx={{ overflowY: "auto", overflowX: "hidden", height: "70vh", backgroundColor: "#f6f6f6", width: "100%" }}>
                    <List>
                        {messages?.map((message, index) => (
                            message.sender.username === user.username
                            ?
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-end"}}>

                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word"}}>
                                    <Typography sx={{ wordWrap: "break-word"}}> {message.text}</Typography>
                                </Grid>
                                <PersonIcon />
                            </ListItem>
                            :
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-start"}}>
                                <PersonIcon />
                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word"}}>
                                    <Typography sx={{ textDecoration: "underline"}}>{message.sender.username}: </Typography>
                                    <Typography sx={{ wordWrap: "break-word"}}> {message.text}</Typography>
                                </Grid>
                            </ListItem>
                            
                            ))}
                        {(isTyping && typingUser.username !== user.username) && <Typography>{typingUser.username} is typing...</Typography>}
                    </List>
                    <div ref={messageEndRef} />
            </Grid>
            <form>
                <Grid sx={{ display: "flex", justifyContent: "center", borderTop: "1px solid black"}}>
                        <TextField
                            type='text'
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={handleTyping}
                            sx={{ margin: "5px"}}
                        />
                        <Button type="submit" onClick={handleSubmitMessage} endIcon={<SendIcon />}/>
                </Grid>
            </form>
        </>
    )
}