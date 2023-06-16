import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AvatarCircle from './AvatarCircle';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ChangeChatAdmin } from '../features/chat/chatSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#a7a7a7',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeAdminModal(props) {

    const { members, chatId, user } = props

    const filteredMembers = members.filter((member) => member._id !== user.id)
    console.log(filteredMembers)

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeChatAdmin = (newAdminUsername) => {
        dispatch(ChangeChatAdmin({ chatId, newAdminUsername }))
        window.location.reload()
    }

    return (
        <div>
        <Button sx={{ color: "gold"}} onClick={handleOpen}>Change admin</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{ textDecoration: "underline"}}>
                    Make admin
                </Typography>
                {filteredMembers.map((member) => {
                    return (
                        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 1}}>
                            <AvatarCircle image={member.image} />
                            <Typography sx={{ marginLeft: 2}}>{member.username}</Typography>
                            <Button onClick={() => handleChangeChatAdmin(member.username)}>Click</Button>
                        </Grid>
                    )
                })}
            </Box>
        </Modal>
        </div>
    );
}