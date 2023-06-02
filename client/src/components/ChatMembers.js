import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { AddGroupMember, RemoveGroupMember } from '../features/chat/chatSlice';
import RemoveIcon from '@mui/icons-material/Remove';


export default function ChatMembers(props) {

  const dispatch = useDispatch()

  const { chatId, members, handleShowMessages } = props
  const [ username, setUsername ] = useState('')
  const [ removeUsername, setRemoveUsername ] = useState('')


  const handleAddMember = (e) => {
    e.preventDefault()
    dispatch(AddGroupMember({ chatId, username }))
  }

  const handleRemoveMember = () => {
    dispatch(RemoveGroupMember({ chatId, username: removeUsername}))
  }

  return (
    <Grid sx={{display: "flex", flexDirection: "column", height: "70vh", backgroundColor: "#f6f6f6", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Typography>Members</Typography>
      {members.map((member) => {
        return <Typography>{member.username}</Typography>
      })}
        <form>
          <TextField
              id="username"
              label="Add user to chat"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          <Button type="submit" onClick={handleAddMember}>
              <AddCircleIcon fontSize="large"/>
          </Button>
        </form>
        <form>
          <TextField
            id="removeUsername"
            label="Remove a user from chat"
            type="text"
            name="removeUsername"
            value={removeUsername}
            onChange={(e) => setRemoveUsername(e.target.value)}
            />
          <Button type="submit" onClick={handleRemoveMember}>
            <RemoveIcon fontSize="large"/>
          </Button>
        </form>
        <Button onClick={handleShowMessages}>
          Back to chat
        </Button>
    </Grid>
  )
}
