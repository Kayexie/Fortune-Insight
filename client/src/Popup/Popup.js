import React from 'react';
import './Popup.scss';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {useSelector} from "react-redux";
import PopProductList from "./PopProductList";
import './PopProductList.scss'

const Popup = ({openPop}) => {

    const carts = useSelector(state => state?.product.cart)

    console.log("this is form popup window for shopping cart", carts)

    document.querySelector('body').style.overflow = 'hidden'


    return (
        <div className='pop-up'>
            <div className='pop-up-model'>
                <CloseSharpIcon onClick={() => openPop()}/>
                <div className='pop-up-title'>
                    <h2>My Shopping Bag</h2>
                </div>
                <div className='pop-up-container'>
                    <div className='pop-up-wrap'>
                        {!!carts && carts.map((c, i) => <PopProductList c={c} i={i} key={i}/>)}

                    </div>
                </div>
                <div className='pop-up-order-summary'>
                    {/*<div>Order Summary</div>*/}
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    );

}

export default Popup;
