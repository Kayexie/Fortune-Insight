import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_ALLPRODUCTS} from "../../helper.js";

const initialState = {
    products: []
}

export const fetchAllProducts = createAsyncThunk(
    'product/fetchAllProducts', // slicename+actionname
    async (_, thunkAPI) => {
        try{
            const res = await axios.get(APIURL_ALLPRODUCTS)
            console.log('in new action to fetch all products====', res)
            return res.data

        }catch{console.log('err')}
    }
)
export const fetchProductsByPage = createAsyncThunk(
    'product/fetchProductsByPage', // slicename+actionname
    async (page, thunkAPI) => {
        try{
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/page?page=${page}`)
            console.log('in new action to fetch page products====', res)
            return res.data

        }catch{console.log('err')}
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=> {
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
            state.products = action.payload.products
        })
        builder.addCase(fetchProductsByPage.fulfilled, (state, action)=>{
            state.products = action.payload.products
        })
    }

})

export default productSlice.reducer

// export const {
//     fetchAllProducts
// } = pruductSlice.actions