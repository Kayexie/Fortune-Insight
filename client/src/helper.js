
export const USER_API = 'c2d2e2d2-0b9e-4e3e-8b9a-9b8c7d6e5f4g'
export const APIURL_ALLFILTERS = 'http://localhost:8000/product/filters'
export const APIURL_ALLQUERIES = 'http://localhost:8000/product'
export const APIURL_LOGINAUTH = 'http://localhost:8000/user/login'
export const APIURL_USERINFO = 'http://localhost:8000/user/info'

export const emailRegex = /\S+@\S+\.\S+/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


export const APIURL_DELETEPRODUCT = 'http://localhost:8000/product/delete'

export const APIURL_CREATEPRODUCT = 'http://localhost:8000/product/create'

export const APIURL_UPDATEPRODUCT = 'http://localhost:8000/product/update'

export const APIURL_CREATEORDER = 'http://localhost:8000/order'

export const actionType = {
    'FETCH_ALL_PRODUCTS': 'FETCH_ALL_PRODUCTS',
    'FETCH_PAGE_PRODUCTS': 'FETCH_PAGE_PRODUCTS',
}