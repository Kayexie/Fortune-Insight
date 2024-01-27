import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_LOGINAUTH, APIURL_USERINFO} from "../../helper.js";

const initialState = {
    token: '',
    userInfo: {},
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

export const fetchUserInfo = createAsyncThunk(
    'userSlice/fetchUserInfo', // slice name+action name
    async (data, thunkAPI) => {
        try{
            const state = thunkAPI.getState()
            const token = state.user.token
            const res = await axios.post(APIURL_USERINFO, {}, {headers:{'Authorization': `Bearer ${token}`}})
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
        // set token from cookie to state
        setStateToken: (state, action)=>{
            state.token = action.payload
        },
        //clear
        clearReduxInfo: (state, action) => {
            state.token = ''
            state.userInfo= {}
            state.message= ''
        }

    },
    extraReducers: (builder)=> {
        builder
            .addCase(loginAuth.fulfilled, (state, action)=>{
                    state.token = action.payload.token //payload in asyncThunk create function is the return value
                    state.userInfo = action.payload.userInfo
                    state.message = action.payload.message

        })
            .addCase(loginAuth.rejected, (state, action)=>{
                state.token = null
                state.userInfo = null
                state.message = action.payload.message
            })
            .addCase(fetchUserInfo.fulfilled, (state, action)=>{
                state.userInfo = action.payload.decoded
                state.message = action.payload.message
            })
            .addCase(fetchUserInfo.rejected, (state, action)=>{
                state.token = null
                state.userInfo = null
                state.message = action.payload.message
            })
    }
})

export default userSlice.reducer

export const {
    setStateToken,
    clearReduxInfo,
} = userSlice.actions