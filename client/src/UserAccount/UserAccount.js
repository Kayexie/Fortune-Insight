import React, {useEffect} from 'react';
import './UserAccount.scss';
import {useDispatch, useSelector} from "react-redux";
import {allOrdersPerUser, singleOrdersPerUser} from "../redux/features/orderSlice";
import {ArrowBack} from "@mui/icons-material";

const UserAccount = () => {
    const userInfo = useSelector(state => state?.user?.userInfo)
    // const token = useSelector(state => state?.user?.token)
    const userId = userInfo.userId
    const dispatch = useDispatch()
    const orderList = useSelector(state => state?.order.orderList)
    const orderDetails = useSelector(state => state?.order.orderDetails)
    const orderDetailsId = useSelector(state => state?.order.orderDetailsId)
    console.log(orderDetails, orderDetailsId)

    useEffect(() => {
        dispatch(allOrdersPerUser({userId}))
    }, [])

    const handleExpand = (orderId) => {
        // console.log(orderId)
        dispatch(singleOrdersPerUser({orderId}))
    }


    return (
        <div>
            <div className="main-page-header">
                <div className='main-page-logo'>
                    <img style={{transform: 'scale(1.4)'}} src="/logo.png" alt=""/>
                    <h1>infinite fortune vendor</h1>
                </div>
            </div>
            <div className='user-order-container'>
                <div className='back-to-main' onClick={() => window.location.replace('/')}>
                    <ArrowBack/>
                    Back To Main Page
                </div>
                <h2>Hello! {userInfo.name}</h2>
                <div className='user-order-list'>
                    <h4>OrderList:</h4>
                    {!!orderList? orderList.map((o, idx) =>
                        <div key={idx} onClick={() => handleExpand(o.id)}>
                            <div className='order-list-id'>{o.id}</div>
                            {o.id === orderDetailsId && orderDetails.length > 0 && orderDetails.map((o, idx) => <div
                                key={idx}>
                                <div>
                                    <img style={{width: '1rem'}} src={o.product.image} alt={o.product.id}/>
                                    <div>  {o.product.name}</div>
                                    <div> {o.quantity}</div>
                                    <div> {o.unitPrice}</div>
                                    <div> {o.product.id}</div>
                                </div>
                            </div>)}
                        </div>
                    ) : <div>Oops! you don't have any shopping record yet. go to shop now</div>}

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
    );
};

export default UserAccount;