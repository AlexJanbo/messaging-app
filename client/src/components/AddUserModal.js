import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Divider, Grid, Skeleton, Stack, TextField } from '@mui/material';
import defaultAvatar from '../images/default-avatar.png'
import { AddGroupMember, CreateChat, reset } from '../features/chat/chatSlice';
import AvatarCircle from './AvatarCircle';
import { QueryUsers, reset as resetUsers } from '../features/auth/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: '#676767',
  border: '2px solid #000',
  borderRadius: "10%",
  boxShadow: 24,
  p: 4,
};

export default function AddUserModal(props) {

    const { chatId, members } = props
    const { user, users, isLoading } = useSelector((state) => state.auth)

    // To make sure user does not try to add users already in the group
    const filteredUsers = users.filter((user) => !members.some((member) => member.username === user.username))


    const dispatch = useDispatch()

    const [ searchQuery, setSearchQuery ] = useState('')
    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(QueryUsers(searchQuery))
        dispatch(resetUsers())
    }, [searchQuery])


    const HandleAddGroupMember = (memberUsername) => {

        dispatch(AddGroupMember({ chatId, memberUsername }))
        handleClose()
        window.location.reload()
        dispatch(reset())
    }

    if(isLoading) {
        return <Skeleton />
    }


    return (
        <div>
        <Button onClick={handleOpen} sx={{ margin: 3, color: "black", backgroundColor: "#a7a7a7", border: "1px solid black", borderRadius: "10px", '&:hover': { backgroundColor: "#a9f6ae", color: "black"}}}>Add a new user!</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Grid sx={{ display: "flex", justifyContent: "center", marginTop: "5%"}}>
                <TextField
                id="search user"
                label="Search for a user"
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ backgroundColor: "#9C9C9C", width: "80%", borderRadius: "10px"}}
                />
            </Grid>

            <Grid sx={{ overflowY: "auto", height: "70%", marginTop: "5%"}}>
                {filteredUsers && filteredUsers.map((user, index) => {
                    return (
                        <Grid p={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxHeight: "40vh"}}>
                            <AvatarCircle image={user.image} />
                            <Stack direction="column" sx={{ width: "70%", backgroundColor: "#9C9C9C", borderRadius: "10px"}}>
                                <Typography sx={{ padding: "1%"}}>{user.username}</Typography>
                                <Typography sx={{ padding: "1%"}}>{user.email}</Typography>

                            </Stack>
                            <Button sx={{color: "black", backgroundColor: "#a9f6ae", border: "1px solid black", borderRadius: "10%", '&:hover': { backgroundColor: "#86c48a"}}} onClick={() => HandleAddGroupMember(user.username)}>
                                Add
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
            </Box>
        </Modal>
        </div>
    );
}