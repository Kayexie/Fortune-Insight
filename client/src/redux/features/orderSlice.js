import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_CREATEORDER, APIURL_ORDERBYUSER} from "../../helper.js";

const id = localStorage.getItem('orderId') !== null ? localStorage.getItem('orderId') : '';
const orderLine = localStorage.getItem('orderLine') !== null ? JSON.parse(localStorage.getItem('orderLine')) : '';
const orderList = localStorage.getItem('orderList') !== null ? JSON.parse(localStorage.getItem('orderList')) : '';

const initialState = {
    orderId:id,
    orderLine:orderLine,
    orderList:orderList,
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

export const allOrdersPerUser = createAsyncThunk(
    'orderSlice/allOrders',
    async (params) => {
        try{
            const {userId} = params
            console.log(userId)
            const res = await axios.get(`${APIURL_ORDERBYUSER}/${userId}`)
            console.log(res.data.orders)
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
        builder.addCase(allOrdersPerUser.fulfilled, (state, action) => {
            state.orderList = action.payload.orders
            localStorage.setItem('orderList', JSON.stringify(state.orderList))
        })
    }
})

export default orderSlice.reducer

export const {
} = orderSlice.actions