import productReducer from "./features/productSlice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export default store
