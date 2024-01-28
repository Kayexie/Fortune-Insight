import * as React from 'react';
import TextField from '@mui/material/TextField';
import './Login.scss'
import {useDispatch} from "react-redux";
import {loginAuth} from "./redux/features/userSlice";
import {emailRegex, passwordRegex} from "./helper.js";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function BasicTextFields({setOpen}) {

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
            // dispatch(loginAuth(formData))
        }else{
            console.log('invalid data')
        }
        dispatch(loginAuth(formData))
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
                sx={{
                    '& > :not(style)': {m: 1, width: '150px'},
                }}
                className='login-form'
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel sx={{font: '600 0.9rem/1.6 Roboto Condensed,sans-serif'}}>Email</FormLabel>
                        <Input label="Email"
                               type='email'
                               name='email'
                               value={formData.email}
                               onChange={changeHandler}
                               autoFocus required />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{font: '600 0.9rem/1.6 Roboto Condensed,sans-serif'}}>Password</FormLabel>
                        <Input label="Passwaord"
                               type='password'
                               name='password'
                               value={formData.password}
                               onChange={changeHandler}
                               required />
                    </FormControl>
                    {/*<Button type="submit">Submit</Button>*/}
                    <button className="login-btn" type='submit'>LOG IN</button>
                </Stack>
            </form>

        </div>

    );
}