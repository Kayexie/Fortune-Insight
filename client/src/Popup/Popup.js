import React from 'react';
import './Popup.scss';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {useSelector} from "react-redux";
import PopProductList from "./PopProductList";
import './PopProductList.scss'

const Popup = ({openPop}) => {

    const carts = useSelector(state => state?.product.cart)

    console.log("this is form popup window for shopping cart", carts)

    //calculate single product ttl $
    const singleTtlArr = carts.map(item => item.quantity * item.price)
    const subtotal = singleTtlArr.reduce((a, c) => a + c)

    //all product ttl $ and qty
    const tax = 0
    const estimateTtl = subtotal + tax
    const ttlQty = carts.map(item => item.quantity).reduce((a,c) => a + c)

    // console.log(subtotal)

    document.querySelector('body').style.overflow = 'hidden'


    return (
        <div className='pop-up'>
            <div className='pop-up-model'>
                <CloseSharpIcon onClick={() => openPop()} className='close-icon'/>
                <div className='pop-up-title'>
                    <h2>My Shopping Bag ({ttlQty})</h2>
                </div>
                <div className='pop-up-container'>
                    <div className='pop-up-wrap'>
                        {!!carts && carts.map((c, i) => <PopProductList c={c} i={i} key={i}/>)}

                    </div>
                </div>
                <div className='pop-up-order-summary'>
                    <div className='pop-up-title'>
                        <h2>Order Summery</h2>
                    </div>
                    <div className='pop-up-order'>
                        <div className='subtotal'>
                            <h4>SUBTOTAL</h4>
                            <p>$ {subtotal}.00</p>
                        </div>
                        <div className='tax'>
                            <h4>TAX</h4>
                            <p>$ {tax}.00</p>
                        </div>
                        <div className='total'>
                            <h4>ESTIMATED TOTAL</h4>
                            <p>$ {estimateTtl}.00</p>
                        </div>
                    </div>

                </div>
                <div className='pop-up-checkout'>
                    <div className='continue' onClick={() => openPop()}>CONTINUE SHOPPING</div>
                    <div className='checkout'>CHECK OUT</div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    );

}

export default Popup;
