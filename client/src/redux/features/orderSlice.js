import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_CREATEORDER} from "../../helper.js";

const initialState = {
    orderInfo:'',
}


export const fetchToCreateOrder = createAsyncThunk(
    'orderSlice/fetchToCreateOrder',
    async (newCarts) => {
        try{
            const data = newCarts.newCarts
            console.log(data)
            const res = await axios.post(APIURL_CREATEORDER,data)
            console.log(res.data)
            return res.data
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
            state.orderInfo = action.payload.orderId
            console.log("this is from orderSlice ------------- ",action.payload.orderId)
            console.log("this is from orderSlice ------------- ",state.orderInfo)
        })
    }
})

export default orderSlice.reducer

export const {
} = orderSlice.actions