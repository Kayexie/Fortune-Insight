import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_CREATEORDER} from "../../helper.js";

const id = localStorage.getItem('orderId') !== null ? localStorage.getItem('orderId') : '';
const orderLine = localStorage.getItem('orderLine') !== null ? JSON.parse(localStorage.getItem('orderLine')) : '';

const initialState = {
    orderId:id,
    orderLine:orderLine,
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
            state.orderId = action.payload.orderId
            state.orderLine = action.payload.newOrderLine

            localStorage.setItem('orderId', state.orderId)
            localStorage.setItem('orderLine', JSON.stringify(state.orderLine))
        })
    }
})

export default orderSlice.reducer

export const {
} = orderSlice.actions