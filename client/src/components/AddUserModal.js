import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Grid } from '@mui/material';
import defaultAvatar from '../images/default-avatar.png'
import { CreateChat, reset } from '../features/chat/chatSlice';
import AvatarCircle from './AvatarCircle';

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

export default function AddUserModal(props) {


    const { user, users } = useSelector((state) => state.auth)

    const otherUsers = users.filter((currentUser) => currentUser._id !== user.id)

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const HandleCreateChat = (memberUsername) => {

        dispatch(CreateChat({ user, memberUsername }))
        handleClose()
        dispatch(reset())
    }


    return (
        <div>
        <Button onClick={handleOpen}>Create a chat!</Button>
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
            {otherUsers && otherUsers.map((user, index) => {
                return (
                    <Grid p={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", maxHeight: "41vh"}}>
                        <AvatarCircle image={user.image} />
                        <Typography >{user.username}</Typography>
                        <Button onClick={() => HandleCreateChat(user.username)}>
                            Chat
                        </Button>
                    </Grid>
                )
            })}
            </Box>
        </Modal>
        </div>
    );
}