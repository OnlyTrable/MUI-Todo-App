import * as React from 'react';
import { Fab } from "@mui/material";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';

function AddTodoButton({ onAddClick }){
    return(
        <Fab
            onClick={onAddClick}
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
    )
}

export default AddTodoButton;
