import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import {APIURL_ALLFILTERS, APIURL_ALLPRODUCTS, APIURL_ALLQUERIES} from "../../helper.js";

const initialState = {
    filters: {},
    products: [],
    params: {},
    cart: []
}

export const fetchAllFilters = createAsyncThunk(
    'product/fetchAllFilters', // slicename+actionname
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(APIURL_ALLFILTERS)
            console.log('in new action to fetch filters====', res)
            return res.data

        } catch {
            console.log('err')
        }
    }
)

// =========sort search page filter========
export const fetchProductsByAllQuery = createAsyncThunk(
    'product/fetchProductsByAllQuery',
    async (params, thunkAPI) => {
        try {
            const {sort, search, page, filters} = params
            console.log("from Slice sort, search, page:", sort, search, page, filters)
            const res = await axios.post(`${APIURL_ALLQUERIES}?search=${search}&sort=${sort}&page=${page}`, filters)
            console.log('in new action to fetch search products with sort, search, page ====>', res.data)
            return res.data
        } catch (e) {
            console.log('err', e)
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
        updateFilters: (state, action) => {
            let newFilters = {...state.filters} //shallow copy
            let {title, idx} = action.payload
            console.log('from reducer updateFilters:', title, idx)

            if (!newFilters[title]) {
                console.error(`Title ${title} not found in filters`);
                return;
            }

            if (idx < 0 || idx >= newFilters[title].length) {
                console.error(`Index ${idx} is out of bounds for title ${title}`);
                return;
            }

            if (newFilters[title][idx]) {
                newFilters[title][idx].isChecked = !newFilters[title][idx].isChecked
            }
            state.filters = newFilters
        },

        //add to bag
        addToBag: (state, action) => {

            let newCart = [...state.cart]
            let {id, name, image, currentPrice, quantity} = action.payload
            // console.log("from addToBag reducer ====== id, name, image, price", id, name, image, currentPrice)

            //create a new Product
            const newProduct = {
                id: id,
                name: name,
                image: image,
                price: currentPrice,
                quantity: quantity
            }
            // console.log(newProduct)
            //push the product into the newCart
            newCart.push(newProduct)
            state.cart = newCart
            console.log(state.cart)
        },

        deleteProduct:(state, action) => {

            let {id} = action.payload
            //add the current in order to get the state
            let newCart = [...current(state.cart)]
           state.cart = newCart.filter( c => c.id !== id )

        }


    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilters.fulfilled, (state, action) => {
            state.filters = action.payload.response //payload in asyncThunk create function is the return value
        })

        builder.addCase(fetchProductsByAllQuery.fulfilled, (state, action) => {
            state.products = action.payload.products
            state.params = action.payload.params
        })
    }
})

export default productSlice.reducer

export const {
    updateFilters,
    addToBag,
    deleteProduct
} = productSlice.actions