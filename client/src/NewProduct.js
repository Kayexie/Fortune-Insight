import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/joy/Tooltip";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function FloatingActionButtonSize() {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <React.Fragment>
                <Tooltip title='Add a new product'
                         arrow
                         variant='solid'
                         size='sm'
                >
                    <Fab size="small" sx={{bgcolor: '#C7DFF7', '&:hover': {bgcolor: '#97C3F0'}}} aria-label="add">
                        <AddIcon onClick={() => setOpen(true)}/>
                    </Fab>
                </Tooltip>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                        <DialogTitle>Create new project</DialogTitle>
                        <DialogContent>Fill in the information of the project.</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input autoFocus required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input required />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </Box>
    );
}
