import {actionType} from "../helper.js";

const initState = {
    filters: {},
    products: [],
}

export const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_ALL_PRODUCTS:
            console.log('in reducer fetch all products====', action.payload)
            return {
                ...state, products: action.payload.products
            }
        case actionType.FETCH_PAGE_PRODUCTS:
            console.log('in reducer fetch page products====', action.payload)
            return {
                ...state, products: action.payload.products
            }
            default:
                return state
    }
}