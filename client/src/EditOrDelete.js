import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditNoteIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';

export default function BasicSpeedDial() {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ zIndex: 2, position: 'absolute', top: '-1.2rem', right: '0.5rem', transform: 'scale(0.6)', '& .MuiFab-primary': { backgroundColor: '#E3FBE3', color: 'black'}}}
                icon={<SpeedDialIcon sx={{transform: 'scale(1.4)'}}/>}
                direction='down'
            >
                <SpeedDialAction
                    key='Edit'
                    icon={<EditNoteIcon />}
                    tooltipTitle='Edit'
                    tooltipPlacement='right'
                    sx={{transform: 'scale(1.2)'}}
                />
                <SpeedDialAction
                    key='Delete'
                    icon={<DeleteIcon/>}
                    tooltipTitle='Delete'
                    tooltipPlacement='right-start'
                    sx={{transform: 'scale(1.2)'}}
                    onClick={() => setOpen(true)}
                />
            </SpeedDial>
            <React.Fragment>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <WarningRoundedIcon/>
                            Confirmation
                        </DialogTitle>
                        <Divider/>
                        <DialogContent>
                            Are you sure you want to delete this product?
                        </DialogContent>
                        <DialogActions>
                            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                                Delete the product
                            </Button>
                            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </div>
    );
}