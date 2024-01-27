import * as React from 'react';
import TextField from '@mui/material/TextField';
import './Login.scss'
import {useDispatch} from "react-redux";
import {loginAuth} from "./redux/features/userSlice";
import {emailRegex, passwordRegex} from "./helper.js";

export default function BasicTextFields() {

    const [formData, setFormData] = React.useState({
        email:'',
        password:'',
    })

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault(); // stop auto refreshed by button
        const {email, password} = formData
        //validate data
        if(emailRegex.test(email) && passwordRegex.test(password)){
            console.log('valid data')
            dispatch(loginAuth(formData))

        }else{
            console.log('invalid data')
        }
    }

    const changeHandler = ({target}) => {
        const {name, value} = target
        // validate data
        if(name === 'email'){
            if(!emailRegex.test(value)){
                console.log('invalid email')
            }else{
                console.log('valid email')
                setFormData(state => ({...state, [name]: value}))
            }
        }
        if(name === 'password'){
            if(!passwordRegex.test(value)){
                console.log('invalid password')
            }else{
                console.log('valid password')
            }
        }
        setFormData(state => ({...state, [name]: value}))
    }

    return (
        <div className="login-btns-container">
            <form
                // component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '150px'},
                }}
                className='login-form'
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <TextField id="outlined-basic-email" label="Email" variant="outlined"
                           required
                           type='email'
                           name='email'
                           value={formData.email}
                           onChange={changeHandler}
                           size='small'
                />
                <TextField id="outlined-basic-psd" label="Passwaord" variant="outlined"
                           required
                           type='password'
                           name='password'
                           value={formData.password}
                           onChange={changeHandler}
                           size='small'
                />
                <button className="login-btn" type='submit'>LOG IN</button>
            </form>

        </div>

    );
}