import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";


const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    }
})

export default store