import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ChangeChatName } from '../features/chat/chatSlice';

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

export default function ChangeNameModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ newChatName, setNewChatName ] = useState('')
    const { chatId } = props

    const dispatch = useDispatch()

    const handleChangeChatName = (e) => {
        e.preventDefault()
        dispatch(ChangeChatName({ chatId, newChatName}))
        window.location.reload()
    }

  return (
    <div>
      <Button sx={{ color: "gold"}} onClick={handleOpen}>Rename chat</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <form>
                <TextField
                    id="new chat name"
                    label="Select a new chat name"
                    type="text"
                    name="new chat name"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    sx={{ backgroundColor: "#c7c7c7", color: "white"}}
                />
            </form>
            <Button onClick={handleChangeChatName}>
                Change
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}