import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Grid, TextField } from '@mui/material';
import defaultAvatar from '../images/default-avatar.png'
import { CreateChat, reset } from '../features/chat/chatSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateGroupChatModal(props) {


    const { user, users } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const [ open, setOpen ] = useState(false);
    const [ chatName, setChatName ] = useState('')
    const [ chatMembers, setChatMembers ] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddMember = (member) => {
        if(chatMembers.includes(member)) {
            throw new Error("Member is already selected")
        }
        setChatMembers([...chatMembers, member])
    }

    const handleRemoveMember = (member) => {
        const newChatMembers = chatMembers.filter((user) => user._id !== member._id)
        setChatMembers([...newChatMembers])
    }

    const handleCreateChat = (memberUsername) => {

        dispatch(CreateChat({ user, memberUsername }))
        handleClose()
        dispatch(reset())
    }


    return (
        <div>
        <Button onClick={handleOpen}>Create a group chat!</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4">
                    Chat
                </Typography>
                <TextField
                id="chat name"
                label="Chat name"
                type="text"
                name="chatName"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                >

                </TextField>
            </Box>
        </Modal>
        </div>
    );
}

