import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    }
})

export default store
