import { Avatar, Button, CircularProgress, Divider, FormControl, Grid, Input, List, ListItem, Skeleton, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import {  DeleteMessages, GetMessages, SendMessage, reset } from '../features/message/messageSlice';
import { DeleteChat } from '../features/chat/chatSlice';
import ChatMenu from './ChatMenu';
import defaultAvatar from '../images/default-avatar.png'


export default function ChatWindow(props) {

    const dispatch = useDispatch()

    const { openChat, setOpenChat, user } = props
    const chatId = openChat


    const previousMessages = useSelector((state) => state.message.messages)
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
        const data = {
            sender: user,
            text: newMessage,
            chatId: chatId
        }
        socket.emit('chat message', data, chatId)
        dispatch(SendMessage({
            sender: user,
            text: newMessage,
            chatId: chatId,
        }))
        dispatch(reset())
    }

    if(isLoading) {
        return <Skeleton />
    }


    return (
        <>
            <Grid sx={{ overflowY: "auto", overflowX: "hidden", height: "70vh", width: "100%" }}>
                    <List>
                        {messages.map((message, index) => (
                            message.sender.username === user.username
                            ?
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-end"}}>

                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word", marginRight: "1%"}}>
                                    <Typography variant="h5" sx={{ wordWrap: "break-word", color: "white"}}> {message.text}</Typography>
                                </Grid>
                                <Avatar
                                    display="inline-block"
                                    src={user.image ? user.image : defaultAvatar}
                                    alt="Profile Avatar"
                                    sx={{ height: 24, width: 24, marginRight: "2%"}}
                                />
                            </ListItem>
                            :
                            <ListItem key={index} sx={{display: "flex", justifyContent: "flex-start", marginLeft: "2%"}}>
                                <Avatar 
                                    display="inline-block"
                                    src={message.sender.image ? message.sender.image : defaultAvatar}
                                    alt="Profile Avatar"
                                    sx={{ height: 24, width: 24}}
                                />
                                <Grid sx={{ display: "inline-block", maxWidth: "60%", wordWrap: "break-word", marginLeft: "1%"}}>
                                    <Typography sx={{ color: "white", textDecoration: "underline" }}>{message.sender.username}</Typography>
                                    <Typography variant="h5" sx={{ color: "white", wordWrap: "break-word"}}> {message.text}</Typography>
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
                            sx={{ margin: "5px", backgroundColor: "#a9a9a9"}}
                        />
                        <Button type="submit" onClick={handleSubmitMessage} endIcon={<SendIcon />}/>
                </Grid>
            </form>
        </>
    )
}