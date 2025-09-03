import * as React from 'react';
import { Fab, Modal, Box } from "@mui/material";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import TodoForm from '../todoForm';

const modalStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  bgcolor: 'background.paper',
  borderTopLeftRadius: '28px',
  borderTopRightRadius: '28px',
  boxShadow: 24,
  p: 2,
  margin: '0 auto',
  maxWidth: (theme) => theme.breakpoints.values.sm,
};

function ModalAddButton({ onAdd }){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Fab
                onClick={handleOpen}
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    right: 24,
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    backgroundColor: '#EBDEF7',
                    color: 'primary.main',
                }}
            >
                <ModeOutlinedIcon />
            </Fab>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <TodoForm onAdd={onAdd} handleClose={handleClose} />
                </Box>
            </Modal>
        </>
    )
}

export default ModalAddButton;