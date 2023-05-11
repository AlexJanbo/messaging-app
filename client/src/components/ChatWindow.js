import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

export default function ChatWindow(props) {

    const currentUser = props.currentUser
    const recipientUser = props.recipientUser

    const [ socket, SetSocket ] = useState(null)
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        const newSocket = io('http//localhost:4000')
        SetSocket(newSocket)
        return () => newSocket.close()
    }, [])

    useEffect(() => {
        if(!socket) return

        socket.on('chat message', (message) => {
            setMessages((message) => [...messages, message])
        })

        return () => socket.off('chat message')
    }, [socket])

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        if(!message) {
            return
        }
        socket.emit('chat message', {
            sender: currentUser,
            recipient: recipientUser,
            text: message
        })
        setMessage('')
    }

    return (
        <div>
            <Typography variant='h2'>Chatting with {recipientUser}</Typography>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.sender}:</strong>
                        {message.text}
                    </li>
                ))}
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