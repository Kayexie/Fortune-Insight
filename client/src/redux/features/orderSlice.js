import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_CREATEORDER} from "../../helper.js";

const initialState = {
    orderId:'',
}


export const fetchToCreateOrder = createAsyncThunk(
    'product/fetchToCreateOrder',
    async (newCarts) => {
        try{
            const data = newCarts.newCarts
            console.log(data)
            const res = await axios.post(APIURL_CREATEORDER,data)
            console.log(res.data)
            return res.data.orderId
        }catch (e) {
            console.log('err: ', e)
        }
    }
)


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=> {
        builder.addCase(fetchToCreateOrder.fulfilled, (state, action) => {
            state.orderId = action.payload
        })
    }
})

export default orderSlice.reducer

export const {
} = orderSlice.actions