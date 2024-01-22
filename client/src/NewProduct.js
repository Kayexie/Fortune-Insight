import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/joy/Tooltip";

export default function FloatingActionButtonSize() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Tooltip title='Add a new product'
                     arrow
                     variant='solid'
                     size='sm'
            >
                <Fab size="small" sx={{bgcolor: '#C7DFF7', '&:hover': {bgcolor: '#97C3F0'}}} aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}