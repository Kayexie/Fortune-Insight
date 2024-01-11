import axios from 'axios';
import {APIURL_ALLPRODUCTS} from '../helper';
import {actionType} from '../helper';


export const fetchAllProducts = () => dispatch => {
    axios.get(APIURL_ALLPRODUCTS)
        .then(res => {
            console.log('in action to fetch all products====', res)
            dispatch( {
                type: actionType.FETCH_ALL_PRODUCTS,
                payload:res.data
            } )
        })
        .catch(err => console.log('err',err))
}

export const fetchProductsByPage = (page) => dispatch => {
    axios.get(`${APIURL_ALLPRODUCTS}/page?page=${page}`)
        .then(res => {
            console.log('in action to fetch page products====', res)
            dispatch( {
                type: actionType.FETCH_ALL_PRODUCTS,
                payload:res.data
            } )
        })
        .catch(err => console.log('err',err))
}