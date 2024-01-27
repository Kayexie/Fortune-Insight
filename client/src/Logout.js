import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {clearReduxInfo} from "./redux/features/userSlice.js";


export default function BasicButtons() {
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(clearReduxInfo())
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }


    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained"
                    onClick={handleLogout}
            >Log Out
            </Button>
        </Stack>
    );
}