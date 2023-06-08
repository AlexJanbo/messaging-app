import { Avatar, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { AddGroupMember, RemoveGroupMember } from '../features/chat/chatSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import defaultAvatar from '../images/default-avatar.png'
import { Link } from 'react-router-dom';


export default function ChatMembers(props) {

  const dispatch = useDispatch()

  const { chatId, members, handleShowMessages } = props
  const [ username, setUsername ] = useState('')
  const [ removeUsername, setRemoveUsername ] = useState('')


  const handleAddMember = (e) => {
    e.preventDefault()
    dispatch(AddGroupMember({ chatId, username }))
  }

  const handleRemoveMember = (memberUsername) => {
    dispatch(RemoveGroupMember({ chatId, username: memberUsername}))
    window.location.reload()
  }

  return (
    <Grid sx={{display: "flex", flexDirection: "column", height: "70vh", backgroundColor: "#676767", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Typography>Members</Typography>
        {members.map((member) => {
          return (
            <Grid m={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Avatar
                  display="inline-block"
                  src={member.image ? member.image : defaultAvatar}
                  sx={{ height: 24, width: 24}}
              />
              
              <Typography>{member.username}</Typography>
              <Link to={`/profile/${member._id}`} >
                Go to profile
              </Link>
              <Button onClick={() => handleRemoveMember(member.username)}>
                Remove
              </Button>
            </Grid>
          )
        })}
          <form>
            <TextField
                id="username"
                label="Add user to chat"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ backgroundColor: "#a9a9a9"}}
                />
            <Button type="submit" onClick={handleAddMember}>
                <AddCircleIcon fontSize="large"/>
            </Button>
          </form>
          <Button size="large" onClick={handleShowMessages}>
            Back to chat
          </Button>
    </Grid>
  )
}
