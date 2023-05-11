import { List, ListItem, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

export default function ChatWindow(props) {

    const { user } = useSelector((state) => state.auth)
    const currentUser = user

    const recipientUser = props.recipientUser

    const [ socket, SetSocket ] = useState(null)
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

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
        <div>
            <Typography variant='h2'>Chatting with {recipientUser}</Typography>
            <ul>
                <List>

                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <Typography >{message.data.sender.username}: </Typography>
                            <Typography > {message.data.text}</Typography>
                         </ListItem>
                    ))}
                </List>
            </ul>
            <form onSubmit={handleSubmitMessage}>
                <input
                    type='text'
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}