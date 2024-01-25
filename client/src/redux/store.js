import productReducer from "./features/productSlice";

import userReducer from "./features/userSlice";

import orderReducer from "./features/orderSlice";

import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    }
})

export default store
