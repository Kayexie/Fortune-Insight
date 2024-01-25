import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import {
    APIURL_ALLFILTERS,
    APIURL_ALLQUERIES,
    APIURL_CREATEPRODUCT,
    APIURL_DELETEPRODUCT, APIURL_UPDATEPRODUCT
} from "../../helper.js";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    filters: {},
    products: [],
    params: {},
    cart: items,
}

export const fetchAllFilters = createAsyncThunk(
    'productRoutes/fetchAllFilters', // slice name+action name
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(APIURL_ALLFILTERS)
            // console.log('in new action to fetch filters====', res)
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
            // console.log("from Slice sort, search, page:", sort, search, page, filters)
            const res = await axios.post(`${APIURL_ALLQUERIES}?search=${search}&sort=${sort}&page=${page}`, filters)
            // console.log('in new action to fetch search products with sort, search, page ====>', res.data)
            return res.data
        } catch (e) {
            console.log('err', e)
        }
    }
)

export const deleteProductById = createAsyncThunk(
    'product/deleteProductById',
    async (param) => {
        try{
            const {id} = param
            console.log(`The product ${id} is going to be deleted`)
            const res = await axios.delete(`${APIURL_DELETEPRODUCT}?id=${id}`)
            console.log('this action is going to delete the product ', res.data)
            return res.data
        }catch (e) {
            console.log('err: ', e)
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (params) => {
        try {
            const res = await axios.post(APIURL_CREATEPRODUCT, params)
            console.log('this action is going to create a new product ', res.data)
            return res.data
        }catch (e) {
            console.log('err: ', e)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (params) => {
        try {
            const res = await axios.put(APIURL_UPDATEPRODUCT, params)
            console.log('this action is going to update the product', res.data)
            return res.data
        }catch (e) {
            console.log('err: ', e)
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

        //----------------------------- add to bag ------------------------------------

        addToBag: (state, action) => {

            let newCart = [...state.cart]
            let {id, name, image, currentPrice, quantity, totalVolume} = action.payload
            // console.log("from addToBag reducer ====== id, name, image, price", id, name, image, quantity, currentPrice)

            //check if the product exist in shopping cart already
            const existingItem  = newCart.find( item => item.id === id)

            //create a new product
            if(!existingItem) {
                const newProduct = {
                    id: id,
                    name: name,
                    image: image,
                    price: currentPrice,
                    quantity: quantity,
                    totalVolume: totalVolume
                }
                // console.log(newProduct)
                //push the product into the newCart
                newCart.push(newProduct)
            }else {
                existingItem.quantity++;
            }

            state.cart = newCart
            // console.log(state.cart)
            localStorage.setItem('cartItems', JSON.stringify(state.cart.map(item => item)))
        },

        deleteProduct:(state, action) => {

            let {id} = action.payload
            //add the current in order to get the state???
            let newCart = [...state.cart]
            // console.log(newCart)
           state.cart = newCart.filter( c => c.id !== id )
            localStorage.setItem('cartItems', JSON.stringify(state.cart.map(item => item)))
        },

        decreaseQuantity:(state, action) => {

            let newCart = [...state.cart]
            let {id} = action.payload

            //check if the product exist in shopping cart already
            const target = newCart.find( item => item.id === id)
            console.log('decreasing quantity -> ', target.quantity)

            if(target) {
                target.quantity--
            } else {
                console.log('the product has been removed')
            }

            state.cart = newCart
            localStorage.setItem('cartItems', JSON.stringify(state.cart.map(item => item)))
        },

        increaseQuantity:(state, action) => {

            let newCart = [...state.cart]
            let {id} = action.payload

            //check if the product exist in shopping cart already
            const target = newCart.find( item => item.id === id)


            if(target) {
                target.quantity++
            }
            console.log('increasing -> ',newCart)


            state.cart = newCart
            localStorage.setItem('cartItems', JSON.stringify(state.cart.map(item => item)))
        }

        //----------------------------- add to bag ------------------------------------


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
    deleteProduct,
    decreaseQuantity,
    increaseQuantity
} = productSlice.actions