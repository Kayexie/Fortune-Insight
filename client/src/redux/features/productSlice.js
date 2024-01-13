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

//fetch search input
export const fetchProductsBySearch = createAsyncThunk(
    'product/fetchProductsBySearch',
    async (searchInput) => {
        try{
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/search?q=${searchInput}`)
            console.log('in new action to fetch page products====', res)
            return res.data
            // const res = await axios.get(`${APIURL_ALLPRODUCTS}/search?search=${searchInput}`)
            // console.log('in new action to fetch search products====', res.data.products)
            // return res.data
            // console.log("this is from fetchProductsBySearch",searchInput)
        }catch (e){
            console.log('err',e)
        }
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
        // builder.addCase(fetchProductsBySearch.fulfilled, (state, action)=>{
        //     state.products = action.payload.products
        // })
    }
})

export default productSlice.reducer

// export const {
//     fetchAllProducts
// } = pruductSlice.actions