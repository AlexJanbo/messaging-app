import { Avatar, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { AddGroupMember, RemoveGroupMember } from '../features/chat/chatSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import defaultAvatar from '../images/default-avatar.png'
import { Link } from 'react-router-dom';
import AvatarCircle from './AvatarCircle';
import AddUserModal from './AddUserModal';


export default function ChatMembers(props) {

  const dispatch = useDispatch()

  const { user, chatId, members, handleShowMessages } = props
  const [ username, setUsername ] = useState('')
  const [ removeUsername, setRemoveUsername ] = useState('')

  const filteredMembers = members.filter((member) => member._id !== user.id)



  const handleRemoveMember = (memberUsername) => {
    dispatch(RemoveGroupMember({ chatId, username: memberUsername}))
    window.location.reload()
  }

  return (
    <Grid sx={{display: "flex", flexDirection: "column", height: "70vh", backgroundColor: "#676767", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Grid sx={{ height: "10vh"}}>
            <AddUserModal chatId={chatId} members={members}/>
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "column", maxHeight: "60vh", overflowY: "auto", width: "70%"}}>
          {filteredMembers.map((member) => {
            return (
              <Grid p={2} sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%"}}>
                <AvatarCircle image={member.image}/>
                <Typography sx={{ width: "20%", color: "white"}}>{member.username}</Typography>
                <Link to={`/profile/${member._id}`} >
                  <Typography sx={{ color: "white", textDecoration: "underline" }}>
                    Go to profile
                  </Typography>
                </Link>
                <Button variant="contained" color="error" onClick={() => handleRemoveMember(member.username)}>
                  Remove
                </Button>
              </Grid>
            )
          })}
        </Grid>
        <Grid sx={{ height: "10vh", width: "100%", borderTop: "1px solid black", marginTop: 1}}>
          <Button size="large" sx={{ justifyItems: "flex-end", color: "white", width: "100%", height: "10vh"}} onClick={handleShowMessages}>
                Back to chat
          </Button>
        </Grid>
    </Grid>
  )
}
