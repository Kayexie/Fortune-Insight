import './CheckoutPage.scss'
import React, {useEffect} from 'react';
import OrderSummary from "./OrderSummary/OrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {ArrowBack} from "@mui/icons-material";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const CheckoutPage = () => {

    const carts = useSelector(state => state?.product.cart)
    const id = useSelector(state => state?.order.orderInfo)

    const dispatch = useDispatch()
    console.log(id)


    return <div className='checkout-page'>

        <div className="main-page-header">
            <div className='main-page-logo'>
                <img src="/logo.png" alt=""/>
                <h1>infinite fortune vendor</h1>
            </div>
        </div>
        <div className='back-to-main' onClick={() => window.location.replace('/')}>
            <ArrowBack/>
            Back To Main Page
        </div>
        <div className="checkout-page-container">
            <div className="checkout-page-title">
                Checkout
            </div>
            <div className="checkout-page-payment">
                <div className='order-number'>
                    <div>
                        <div>
                            <CheckCircleIcon style={{color:'green'}}/>
                            <p>You Have Created The Order</p>
                        </div>
                        <div>Order Id: </div>
                    </div>
                </div>
                <div>
                    <PayPalScriptProvider options={{clientId: "test"}}>
                        <PayPalButtons style={{layout: "horizontal"}}/>
                    </PayPalScriptProvider>
                </div>

            </div>
            <div className="checkout-page-order-summary">
                <OrderSummary cart={carts}/>
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