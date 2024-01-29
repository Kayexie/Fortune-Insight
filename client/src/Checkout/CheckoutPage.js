import './CheckoutPage.scss'
import React, {useEffect} from 'react';
import OrderSummary from "./OrderSummary/OrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {ArrowBack} from "@mui/icons-material";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from "@mui/joy/Tooltip";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {useNavigate} from "react-router-dom";
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import {allOrdersPerUser, singleOrdersPerUser} from "../redux/features/orderSlice";
import {emptyCart} from "../redux/features/productSlice";


const CheckoutPage = () => {

    const orderLine = useSelector(state => state?.order.orderLine)
    // const userInfo = useSelector(state => state?.user?.userInfo)
    const navigate = useNavigate()
    const carts = useSelector(state => state?.product.cart)
    console.log(carts)

    document.querySelector('body').style.overflow = 'auto'

    const id = useSelector(state => state?.order.orderId)

    const dispatch = useDispatch()
    console.log(id)

    const backToMain = () => {
        navigate('/')
        dispatch(emptyCart())
    }

    const goToAccount = () => {
        navigate('/userAccount')
        dispatch(emptyCart())
    }


    return <div className='checkout-page'>

        <div className="main-page-header">
            <div className='main-page-logo'>
                <img src="/logo.png" alt=""/>
                <h1>infinite fortune vendor</h1>
            </div>
        </div>
        <div className='navigate-to-other'>
            <div className='back-to-main' onClick={() => backToMain()}>
                <ArrowBack/>
                Back To Main Page
            </div>
            <div className='go-to-account' onClick={() => goToAccount()}>
                Go To My Account Page
                <ArrowForwardSharpIcon/>
            </div>
        </div>

        <div className="checkout-page-container">
            <div className="checkout-page-title">
                Checkout
            </div>
            <div className="checkout-page-payment">
                <div className='order-number'>
                    <div>
                        <div className='order-number-check'>
                            <CheckCircleIcon style={{color: 'green'}}/>
                            <p>You Have Created The Order : </p>
                        </div>
                        <h2><strong>{id}</strong></h2>
                    </div>
                </div>
                <div>
                    <PayPalScriptProvider options={{clientId: "test"}}>
                        <PayPalButtons style={{layout: "horizontal"}}/>
                    </PayPalScriptProvider>
                </div>

            </div>
            <div className="checkout-page-order-summary">
                <OrderSummary carts={carts}/>
            </div>
        </div>
        <div className="main-page-footer">
            <div className='h5'>
                <h4>Contact Us</h4>
                <h4>Private Policy</h4>
                <h4>Terms of Use</h4>
            </div>
            <p>Copyright © 2024 infinite fortune vendor Since 2023.</p>
        </div>
    </div>
}

export default CheckoutPage;