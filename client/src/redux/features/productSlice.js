import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_ALLFILTERS, APIURL_ALLPRODUCTS} from "../../helper.js";

const initialState = {
    filters: [],
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


export const fetchAllFilters = createAsyncThunk(
    'product/fetchAllFilters', // slicename+actionname
    async (_, thunkAPI) => {
        try{
            const res = await axios.get(APIURL_ALLFILTERS)
            console.log('in new action to fetch filters====', res)
            return res.data

        }catch{console.log('err')}
    }
)

export const fetchProductsByFilter = createAsyncThunk(
    'product/fetchProductsByFilter', // slicename+actionname
    async (filter, thunkAPI) => {
        try{
            const res = await axios.post(APIURL_ALLPRODUCTS, filter)
            console.log('in new action to fetch products by filters====', res)
            return res.data

        }catch{console.log('err')}
    }
)

//fetch search input
export const fetchProductsBySearch = createAsyncThunk(
    'product/fetchProductsBySearch',
    async (searchInput) => {
        try{
            console.log(searchInput)
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/search?search=${searchInput}`)
            console.log('in new action to fetch search products====', `${APIURL_ALLPRODUCTS}/search?search=${searchInput}`, res.data.products)
            return res.data
        }catch (e){
            console.log('err',e)
        }
    }
)

export const sortProductsByPrice = createAsyncThunk(
    'product/sortProductsByPrice',
    async (sortOrder) => {
        try {
            console.log('sort products by price order ', sortOrder)
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/sortByPrice?sort=${sortOrder}`)
            return res.data
        }catch (e) {
            console.log('error ', e)
        }
    }
)

export const sortProductsByLetterOrRank = createAsyncThunk(
    'product/sortProductsByLetterOrRank',
    async (sortOrder) => {
        try {
            console.log('sort products by ', sortOrder)
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/sort2?sort=${sortOrder}`)
            return res.data
        }catch (e) {
            console.log('error', e)
        }
    }
)

export const sortClear = createAsyncThunk(
    'product/sortClear',
    async (clear) => {
        try{
            console.log('sort clear')
            const res = await axios.get(`${APIURL_ALLPRODUCTS}/sortClear?sort=${clear}`)
            return res.data
        }catch (e) {
            console.log('error', e)
        }
    }
)



const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // fetchAllFilters: (state, action)=>{
        //     const filters = action.payload //todo: add more info
        //     state.filters = filters
        // }

    },
    extraReducers: (builder)=> {
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=>{
            state.products = action.payload.products //payload in asyncThunk create function is the return value
        })
        builder.addCase(fetchProductsByPage.fulfilled, (state, action)=>{
            state.products = action.payload.products
        })

        builder.addCase(fetchAllFilters.fulfilled, (state, action)=>{
            state.filters = action.payload.filters
        })
        builder.addCase(fetchProductsByFilter.fulfilled, (state, action)=>{
            state.products = action.payload.products
        })

        builder.addCase(fetchProductsBySearch.fulfilled, (state, action)=>{
            state.products = action.payload.products
        })

        builder.addCase(sortProductsByPrice.fulfilled, (state, action) => {
            state.products = action.payload.products
        })

        builder.addCase(sortProductsByLetterOrRank.fulfilled, (state, action) => {
            state.products = action.payload.products
        })

        builder.addCase(sortClear.fulfilled, (state, action) => {
            state.products = action.payload.products
        })

    }
})

export default productSlice.reducer

// export const {
//     fetchAllFilters
// } = productSlice.actions