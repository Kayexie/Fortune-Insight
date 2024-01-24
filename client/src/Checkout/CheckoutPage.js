import './CheckoutPage.scss'
import React from 'react';
import OrderSummary from "./OrderSummary/OrderSummary";
import {useSelector} from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";




const CheckoutPage = () => {

    const carts = useSelector(state => state?.product.cart)


    return <div className='checkout-page'>

        <div className="main-page-header">
            <div className='main-page-logo'>
                <img src="/logo.png" alt=""/>
                <h1>infinite fortune vendor</h1>
            </div>
        </div>
        <div className="checkout-page-container">
            <div className="checkout-page-title">
                Checkout
            </div>
            <div className="checkout-page-login">
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