import * as React from 'react';
import {useDispatch} from "react-redux";
import {clearReduxInfo} from "./redux/features/userSlice.js";
import './Logout.scss'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


export default function BasicButtons() {
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(clearReduxInfo())
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }


    return (
        <span onClick={handleLogout} className='logout-button'>
            <PowerSettingsNewIcon sx={{margin: '0 2px -5px 0'}}/>
            LOG OUT
        </span>
    );
}