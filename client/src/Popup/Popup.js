import React, {useEffect, useState} from 'react';
import './Popup.scss';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {useDispatch, useSelector} from "react-redux";
import PopProductList from "./PopProductList";
import './PopProductList.scss'
import {fetchToCreateOrder} from "../redux/features/orderSlice";
import {useNavigate} from "react-router-dom";
import {emptyCart} from "../redux/features/productSlice";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Alert from "@mui/joy/Alert";
import ReportIcon from "@mui/icons-material/Report";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/joy/Typography";
import Login from "../Login.js";

const Popup = ({openPop}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const carts = useSelector(state => state?.product.cart)
    const token = useSelector(state => state?.user.token)
    const userInfo = useSelector(state => state?.user.userInfo)
    const userId = userInfo?.userId

    // {/*=================== for the login page ==========================*/}
    const [isLogin, setIsLogin] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const logInMsg = useSelector(state => state?.user?.message)
    const [alertOpen, setAlertOpen] = useState(false)

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
        if (logInMsg) {
            if (logInMsg === 'login success') {
                // console.log('open success')
                setAlertOpen(false)
            } else {
                setAlertOpen(true)
            }
        } else {
            setAlertOpen(false)
        }
    }, [logInMsg]);

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

    // {/*=================== for the login page ==========================*/}

    // console.log("this is form popup window for shopping cart", userId)

    //calculate single product ttl $
    const singleTtlArr = carts.map(item => item.quantity * item.price)
    const subtotal = singleTtlArr.length !== 0 ? singleTtlArr.reduce((a, c) => a + c) : 0

    //all product ttl $ and qty
    const tax = 0
    const estimateTtl = subtotal + tax

    const QtyArr = carts.map(item => item.quantity)
    // console.log(QtyArr)
    const ttlQty = QtyArr.length !== 0 ? QtyArr.reduce((a, c) => a + c) : 0

    // console.log(subtotal)

    document.querySelector('body').style.overflow = 'hidden'
    const handleCheckout = () => {
        //处理一下产品
        const newCarts = [];
        if (carts) {
            carts.map(item => {
                let newItem = {
                    productId: item.id,
                    currentPrice: item.price,
                    quantity: item.quantity,
                }
                newCarts.push(newItem)
            })
        }

        const createOrder = {
            userId: userId,
            productList: newCarts
        }
        console.log(createOrder)


        if (token) {
            dispatch(fetchToCreateOrder({createOrder}))
            navigate('/checkout')
        } else {
            setOpenLogin(true)
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
                    <h2 style={{font: '600 1.5rem/1.6 Roboto Condensed,sans-serif', marginBottom: '-5px'}}>My Shopping
                        Bag ({ttlQty})</h2>
                </div>
                <div className='pop-up-container'>
                    <div className='pop-up-wrap'>
                        {!!carts && carts.map((c, i) => <PopProductList c={c} i={i} key={i}/>)}
                    </div>
                </div>
                <div className='pop-up-order-summary'>
                    <div className='pop-up-title'>
                        <h2 style={{font: '600 1.5rem/1.6 Roboto Condensed,sans-serif', marginBottom: '-5px'}}>Order
                            Summery</h2>
                    </div>
                    <div className='pop-up-order'>
                        <div className='subtotal'>
                            <h4>SUBTOTAL</h4>
                            <p>$ {subtotal.toFixed(2)}</p>
                        </div>
                        <div className='tax'>
                            <h4>TAX</h4>
                            <p>$ {tax}.00</p>
                        </div>
                        <div className='total'>
                            <h4>ESTIMATED TOTAL</h4>
                            <p>$ {estimateTtl.toFixed(2)}</p>
                        </div>
                    </div>

                </div>
                <div className='pop-up-checkout'>
                    <div className='continue' onClick={() => openPop()}>CONTINUE SHOPPING</div>
                    <div className='checkout' onClick={() => handleCheckout()}>CHECK OUT</div>
                </div>
            </div>
            {/*=================== for the login page ==========================*/}
            { !isLogin && <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
                    <ModalDialog sx={{width: 350}}>
                        <DialogTitle sx={{font: '600 1.3rem/1.6 Roboto Condensed,sans-serif'}}>Log In</DialogTitle>
                        <DialogContent
                            sx={{font: '400 0.85rem/1.6 Roboto Condensed,sans-serif'}}>required(*)</DialogContent>
                        <DialogContent>
                            {logInMsg && alertOpen && <Alert
                                key={logInMsg === 'login success' ? 'Success' : 'Error'}
                                sx={{alignItems: 'flex-start', zIndex: 2}}
                                startDecorator={<ReportIcon/>}
                                variant="soft"
                                color={logInMsg === 'login success' ? 'success' : 'danger'}
                                endDecorator={
                                    <IconButton variant="soft"
                                                color={logInMsg === 'login success' ? 'success' : 'danger'}>
                                        <CloseRoundedIcon onClick={() => setAlertOpen(false)}/>
                                    </IconButton>
                                }
                            >
                                <div>
                                    <div>{logInMsg === 'login success' ? 'Success' : 'Error'}</div>
                                    <Typography level="body-sm"
                                                color={logInMsg === 'login success' ? 'success' : 'danger'}>
                                        {logInMsg}
                                    </Typography>
                                </div>
                            </Alert>}
                        </DialogContent>
                        <Login setOpen={setOpenLogin}/>
                    </ModalDialog>
                </Modal>
            }
            {/*=================== for the login page ==========================*/}
            <div className='overlay'></div>
        </div>
    );

}

export default Popup;
