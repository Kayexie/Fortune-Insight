import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useEffect} from "react";
import {clearMsg} from "./redux/features/productSlice.js";
import {useDispatch} from "react-redux";

export default function CustomizedSnackbars({msg, alertShown, setAlertShown}) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

   useEffect(() => {
        setOpen(alertShown);
    }, [alertShown]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setAlertShown(false);
        dispatch(clearMsg())
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical:'center', horizontal:'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}