import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Divider, Grid, Skeleton, TextField } from '@mui/material';
import defaultAvatar from '../images/default-avatar.png'
import { CreateGroupChat, reset } from '../features/chat/chatSlice';
import SearchUsers from './SearchUsers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  borderRadius: "10%",
  bgcolor: '#676767',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateGroupChatModal(props) {


    const { user, users } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.chat)

    const { setOpenChat } = props

    const dispatch = useDispatch()

    const [ open, setOpen ] = useState(false);
    const [ chatMembers, setChatMembers ] = useState([])
    const [ userQueryString, setUserQueryString ] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setChatMembers([])
        setUserQueryString('')
    }

    const handleAddMember = (member) => {
        if(chatMembers.includes(member)) {
            console.log("Member already selected")
            return
        }
        if(chatMembers.length >= 8) {
            console.log("maximum number of chat members exceeded")
            return
        }
        setChatMembers([...chatMembers, member])
    }

    const handleRemoveMember = (member) => {
        const newChatMembers = chatMembers.filter((user) => user !== member)
        setChatMembers([...newChatMembers])
    }

    const handleCreateChat = (memberUsernames) => {

        dispatch(CreateGroupChat({ user, memberUsernames }))
        handleClose()
        dispatch(reset())
        window.location.reload()
    }

    const MembersExist = (members) => {
        return members.length > 0
    }

    if(isLoading) {
        return (
            <Grid sx={{display: "flex", flexDirection: "column", height: "90vh", width: "30vw", border: "2px solid black", margin: "0", boxShadow: "2px"}}>
                <Skeleton variant="rectangular" height="100%" width="100%" />
            </Grid>
        )
    }


    return (
        <div>
        <Button onClick={handleOpen} sx={{ margin: 3, color: "white", backgroundColor: "#676767", border: "1px solid black", borderRadius: "10px", '&:hover': { backgroundColor: "#a9f6ae", color: "black"} }}>Create a group chat!</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Grid sx={{ textAlign: "center", width: "100%", borderBottom: "1px solid black"}}>
                        <Typography id="modal-modal-title" variant="h4" sx={{ color: "white"}} >
                            Group Chat
                        </Typography>
                    </Grid>
                    <SearchUsers handleAddMember={handleAddMember} user={user}/>
                    {MembersExist(chatMembers) && <Typography variant="h6" sx={{ color: "white", borderBottom: "1px solid black"}}>Members</Typography>}
                    <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
                        {chatMembers && chatMembers.map((member) => {
                            return (
                                <Grid onClick={() => handleRemoveMember(member)} sx={{ border: "0.5px solid black", borderRadius: "5%", padding: 1, margin: 1, backgroundColor: "#b5e2ff", '&:hover': { backgroundColor: "red"}}}>
                                    <Typography variant="h7">{member}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Divider />
                    <Grid sx={{display: "flex", justifyContent: "center", width: "100%", borderTop: "1px solid black"}}>
                        <Button sx={{ color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10px", marginTop: "5%", '&:hover': { backgroundColor: "#86c48a"}}} onClick={() => handleCreateChat(chatMembers)}>Create group chat</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
        </div>
    );
}

