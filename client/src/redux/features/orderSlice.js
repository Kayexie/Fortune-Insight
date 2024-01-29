import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_CREATEORDER, APIURL_DELETEORDER, APIURL_ORDERBYUSER} from "../../helper.js";

const id = localStorage.getItem('orderId') !== null ? localStorage.getItem('orderId') : '';
const orderLine = localStorage.getItem('orderLine') !== null ? JSON.parse(localStorage.getItem('orderLine')) : '';

const initialState = {
    orderId:id,
    orderLine:orderLine,
    orderList:[],
    orderDetails:[],
    orderDetailsId:''
}


export const fetchToCreateOrder = createAsyncThunk(
    'orderSlice/fetchToCreateOrder',
    async (createOrder) => {
        try{
            const data = createOrder
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
            // console.log(userId)
            const res = await axios.get(`${APIURL_ORDERBYUSER}/${userId}`)
            console.log(res.data.orders)
            return res.data
        }catch (e) {
            console.log('err: ', e)
        }
    }
)

export const singleOrdersPerUser = createAsyncThunk(
    'orderSlice/singleOrderPerUser',
    async (params) => {
        try{
            const {orderId} = params
            // console.log(userId)
            const res = await axios.get(`${APIURL_CREATEORDER}/${orderId}`)
            // console.log(res.data)
            return res.data
        }catch (e) {
            console.log('err: ', e)
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'orderSlice/deleteOrder',
    async (targetOrder) => {
        try{
            // console.log(targetOrder)
            const res = await axios({
                method:'delete',
                url: APIURL_CREATEORDER + `/` + `${targetOrder.targetOrder.orderId}`,
                data: targetOrder
            })
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
        builder.addCase(allOrdersPerUser.fulfilled, (state, action) => {
            state.orderList = action.payload.orders
            localStorage.setItem('orderList', JSON.stringify(state.orderList))
        })
        builder.addCase(singleOrdersPerUser.fulfilled, (state, action) => {
            state.orderDetails = action.payload.singleOrder.orderLines
            state.orderDetailsId = action.payload.orderId
        })
    }
})

export default orderSlice.reducer

export const {
} = orderSlice.actions