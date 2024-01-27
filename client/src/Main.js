import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import NewProduct from './NewProduct.js'
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {
    clearMsg,
    fetchAllFilters,
    fetchProductsByAllQuery,
} from "./redux/features/productSlice.js";
import {useEffect, useState} from "react";
import Login from "./Login.js";
import Page from './Page.js';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Popup from "./Popup/Popup";
import {fetchUserInfo, setStateToken} from "./redux/features/userSlice";
import MsgAlert from "./MsgAlert";
import Logout from "./Logout";

export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product?.products) //selector will automatically subscribe to the store, and run whenever an action is dispatched
    const filters = useSelector(state => state?.product?.filters)
    const token = useSelector(state => state?.user?.token)
    const logInMsg = useSelector(state => state?.user?.message)
    const userInfo = useSelector(state => state?.user?.userInfo)
    const orderId = useSelector(state => state?.order?.orderInfo)
    const prodState = useSelector(state => state?.product?.state)


    const [sort, setSort] = useState('ASC')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const [isLogin, setIsLogin] = useState(false)
    
    const [showPop, setShowPop] = useState(false)
    const carts = useSelector(state => state?.product.cart)

    console.log('products in main page====', products)
    console.log('filters in main page====', filters)
    console.log('prodState in main page====', prodState)

    const baseUrl = 'http://localhost:3000/product/'

    const setCookie = (name, value, daysToExpire) => {
        const date = new Date()
        date.setTime(date.getTime()+(daysToExpire * 24 * 60 * 60 * 1000))
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
    }

    const getCookie = (name) => {
        const nameEQ = name + '='
        const arr = document.cookie.split(';')
        for(let i=0; i < arr.length; i++){
            let char = arr[i]
            while(char.charAt(0)===' '){
                char = char.substring(1)
            }
            if(char.indexOf(nameEQ) === 0){
                return char.substring(nameEQ.length)
            }
        }
        return null
    }


    useEffect(() => {
        dispatch(fetchAllFilters())
        const tokenFromCookie = getCookie('token')
        if(tokenFromCookie){
            dispatch(setStateToken(tokenFromCookie))
            dispatch(fetchUserInfo())
        }
    }, []);

    // ---------- for permission denied -------

    const[alertShown, setAlertShown] = useState(false)
    const msg = useSelector(state => state?.product?.message)
    useEffect(() => {
        if (msg) {
            setAlertShown(true)
        }
    }, [msg])

    // -----------for permission denied---------

    // --------sort search page filters------
    useEffect(() => {

        dispatch(fetchProductsByAllQuery({sort, search, page, filters}))
        localStorage.setItem('conditions', JSON.stringify({sort, search, page, filters}))

        // --------change url------
        const params = {sort, search, page}
        let newUrl = new URL(baseUrl)

        for (const key in params) {
            if (params[key].length !== 0) {
                newUrl.searchParams.append(key, params[key])
            }
        }

        for (const key in filters) {
            const check = filters[key].filter(item => item.isChecked).map(cate => cate.name)
            for (const item in check) {
                newUrl.searchParams.append(key, check[item])
            }
        }

        window.history.replaceState({path: newUrl.href}, '', newUrl.href)
    }, [sort, search, page, filters])

    // --------handling token------
    useEffect(() => {
        //set token to cookie, 0.5 days to expire
        if(!token){
            setCookie('token', '', 0.5)
            setIsLogin(false)
        }else{
            setCookie('token', token, 0.5)
            setIsLogin(true)
        }
    }, [token])

    // --------handling shopping cart click------
    const openPop = () => {
        setShowPop(!showPop)
    }

    //calculate the ttl Qty in shopping cart
    const QtyArr = carts.map(item => item.quantity)
    const ttlQty = QtyArr.length !==0 ? QtyArr.reduce((a,c) => a + c) : 0

    document.querySelector('body').style.overflow = 'auto'

    return (
        <div className='main-page-container'>
            {
                alertShown && <MsgAlert msg={msg} setAlertShown={setAlertShown} alertShown={alertShown} prodState={prodState}/>
            }

            <div className="main-page-header">
                <div className='main-page-logo'>
                    <img style={{transform: 'scale(1.4)'}} src="/logo.png" alt=""/>
                    <h1>infinite fortune vendor</h1>
                </div>
                <div className='main-page-shopping'>
                    <ShoppingCartOutlinedIcon/>
                    <p style={{margin: '0 0 -2px 5px'}} onClick={() => openPop()}>Shopping Cart ({ttlQty})</p>
                </div>
            </div>

            <div className="login-row-container">
                {isLogin?
                    <h4>{logInMsg}, Hi, {userInfo?.name}, your role: {userInfo?.roles}</h4>
                    :<div style={{width: '100%'}}><Login/><h4>{logInMsg}</h4></div>}
            </div>
            <div className="logout-row-container">
                <Logout/>
            </div>

            {showPop && <Popup openPop={openPop}/>}

            <SearchBar setSearch={setSearch}/>
            <div className="main-page-content">
                <div className="page-left">
                    <FilterBar/>
                </div>
                <div className="page-right">
                    <div className="sortBar-container">
                        <SortFilter setSort={setSort}/>
                    </div>
                    {
                        products && products.length > 0
                            ? <Display/>
                            : <h4>Nothing To Show HAHAHAHAHA</h4>
                    }
                </div>
            </div>
            <div className="page-content">
                <Page setPage={setPage}/>
            </div>
            <div className="main-page-createProduct">
                <NewProduct/>
            </div>
            <div className="main-page-footer">
                {/*<div className='social-media'>*/}
                {/*    <FacebookSharpIcon/>*/}
                {/*</div>*/}
                <div className='h5'>
                    <h4>Contact Us</h4>
                    <h4>Private Policy</h4>
                    <h4>Terms of Use</h4>
                </div>
                <p>Copyright © 2024 infinite fortune vendor Since 2023.</p>
            </div>
        </div>
    )
}