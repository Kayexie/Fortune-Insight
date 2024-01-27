import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_LOGINAUTH} from "../../helper.js";

const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : '';
const userInfo = localStorage.getItem('userInfo') !== null ? JSON.parse(localStorage.getItem('userInfo')) : '';

const initialState = {
    token: token,
    userInfo: userInfo,
    message:'',

}


export const loginAuth = createAsyncThunk(
    'userSlice/loginAuth', // slice name+action name
    async (data, thunkAPI) => {
        try{
            const res = await axios.post(APIURL_LOGINAUTH, data)
            console.log('in new action to userSlice/loginAuth====>', res)
            return res.data
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data); //to catch res.status(400) case
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=> {
        builder
            .addCase(loginAuth.fulfilled, (state, action)=>{
                    state.token = action.payload.token //payload in asyncThunk create function is the return value
                    state.userInfo = action.payload.userInfo
                    state.message = action.payload.message

                localStorage.setItem('token', state.token)
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))

        })
            .addCase(loginAuth.rejected, (state, action)=>{
                state.token = null
                state.userInfo = null
                state.message = action.payload.message
            })
    }
})

export default userSlice.reducer

export const {
} = userSlice.actions