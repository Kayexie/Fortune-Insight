import React from 'react';
import './Popup.scss';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {useDispatch, useSelector} from "react-redux";
import PopProductList from "./PopProductList";
import './PopProductList.scss'
import {fetchToCreateOrder} from "../redux/features/orderSlice";
import {useNavigate} from "react-router-dom";
import {emptyCart} from "../redux/features/productSlice";

const Popup = ({openPop}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const carts = useSelector(state => state?.product.cart)
    const token = useSelector(state => state?.user.token)
    const userInfo = useSelector(state => state?.user.userInfo)
    const userId = userInfo.userId

    console.log("this is form popup window for shopping cart", userId)

    //calculate single product ttl $
    const singleTtlArr = carts.map(item => item.quantity * item.price)
    const subtotal = singleTtlArr.length !== 0? singleTtlArr.reduce((a, c) => a + c) : 0

    //all product ttl $ and qty
    const tax = 0
    const estimateTtl = subtotal + tax

    const QtyArr = carts.map(item => item.quantity)
    // console.log(QtyArr)
    const ttlQty =QtyArr.length !==0 ? QtyArr.reduce((a,c) => a + c) : 0

    // console.log(subtotal)

    document.querySelector('body').style.overflow = 'hidden'

    const handleCheckout = () => {
        //处理一下产品
        const newCarts = [];
        if(carts){
            carts.map(item => {
                let newItem = {
                    productId: item.id,
                    currentPrice: item.price,
                    quantity:item.quantity,
                }
                newCarts.push(newItem)
            })
        }

        const createOrder = {
            userId:userId,
            productList: newCarts
        }
        console.log(createOrder)
        // todo: with authorized token to check out


        //todo:清空购物车
        if(token){
            dispatch(fetchToCreateOrder({createOrder}))
            dispatch(emptyCart())
            navigate('/checkout')
        }else{
            console.log('please log in first ')
        }



    }

    const numberHandler = (number) => {
        return String(number).length - String(number).indexOf('.') - 1
    }

    return (
        <div className='pop-up'>
            <div className='pop-up-model'>
                <CloseSharpIcon onClick={() => openPop()} className='close-icon'/>
                <div className='pop-up-title'>
                    <h2 style={{font: '600 1.5rem/1.6 Roboto Condensed,sans-serif', marginBottom: '-5px'}}>My Shopping Bag ({ttlQty})</h2>
                </div>
                <div className='pop-up-container'>
                    <div className='pop-up-wrap'>
                        {!!carts && carts.map((c, i) => <PopProductList c={c} i={i} key={i}/>)}

                    </div>
                </div>
                <div className='pop-up-order-summary'>
                    <div className='pop-up-title'>
                        <h2 style={{font: '600 1.5rem/1.6 Roboto Condensed,sans-serif', marginBottom: '-5px'}}>Order Summery</h2>
                    </div>
                    <div className='pop-up-order'>
                        <div className='subtotal'>
                            <h4>SUBTOTAL</h4>
                            <p>$ {numberHandler(subtotal) > 8 ? subtotal.toFixed(8) : subtotal}</p>
                        </div>
                        <div className='tax'>
                            <h4>TAX</h4>
                            <p>$ {tax}.00</p>
                        </div>
                        <div className='total'>
                            <h4>ESTIMATED TOTAL</h4>
                            <p>$ {numberHandler(estimateTtl) > 8 ? estimateTtl.toFixed(8) : estimateTtl}</p>
                        </div>
                    </div>

                </div>
                <div className='pop-up-checkout'>
                    <div className='continue' onClick={() => openPop()}>CONTINUE SHOPPING</div>
                    <div className='checkout' onClick={() => handleCheckout()} >CHECK OUT</div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    );

}

export default Popup;
