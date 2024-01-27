import React, {useEffect} from 'react';
import './UserAccount.scss';
import {useDispatch, useSelector} from "react-redux";
import {allOrdersPerUser} from "../redux/features/orderSlice";

const UserAccount = () => {
    const userInfo = useSelector(state => state?.user?.userInfo)
    // const token = useSelector(state => state?.user?.token)
    const userId = userInfo.userId
    const dispatch = useDispatch()
    const orderList = useSelector(state => state?.order.orderList)
    console.log(userId)

    useEffect(() => {
        dispatch(allOrdersPerUser({userId}))
    }, [])

    const handleExpand = () => {

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
                <h2>Hello! {userInfo.name}</h2>
                <div className='user-order-list'>
                    <h4>OrderList:</h4>
                    { !!orderList && orderList.map((o,idx) =>
                        <div className='order-list-id' key={idx} onClick={() => handleExpand()}>
                            {o.id}
                        </div>
                    )}

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