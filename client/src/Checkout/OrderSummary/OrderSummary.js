import React, {useState} from 'react';
import './OrderSummary.scss';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import {ExpandMore} from "@mui/icons-material";


const OrderSummary = ({carts}) => {

    const [isShow, setIsShow] = useState(true)
    const sum = !!carts && carts.length > 0 ? carts.map(c => c.price * c.quantity).reduce((c,a) => c + a) : 0
    // const totalItem = orderLine.map(p => p.quantity).reduce((c, a) => c + a, 0)

    const handleExpand = () => {
        setIsShow(!isShow)
    }

    return (
        <div className='order-summary-container'>
            <div>
                <h2>Order Details</h2>
                <div className='order-summary-header'>
                    <div className='order-summary-left'>
                        <svg className='order-summary-bagicon' viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-labelledby="icon_:rd:"
                             aria-hidden="false">
                            <path
                                d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                fill="currentColor"></path>
                        </svg>
                        <div className='order-summary-item'><span>{carts.length}</span> items</div>
                        <ExpandMore onClick={() => handleExpand()} style={{cursor:"pointer"}}/>
                    </div>
                    <div> $ {sum.toFixed(2)}</div>
                </div>
            </div>
            { isShow &&  <div className='order-summary-list'>
                {!!carts && carts.map((c, i) => {
                    return <div className='order-summary-product' key={i}>
                        <img src={c.image} alt={c.id}/>
                        <div className='order-summary-info'>
                            <div><strong>{c.name}</strong></div>
                            <div className='order-summary-product-sum'>
                                <div>Quantity {c.quantity}</div>
                                <div>${c.price * c.quantity}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>}
            <div className='order-summary-summary'>
                <div className='order-summary-subtotal'>
                    <div>Subtotal</div>
                    <div> $ {sum.toFixed(2)}</div>
                </div>
                <div className='order-summary-tax'>
                    <div>Tax</div>
                    <div>$ 0.00</div>
                </div>
            </div>
            <div className='order-summary-total'>
                <div><strong>Order total</strong></div>
                <div><strong> $ {sum.toFixed(2)}</strong></div>
            </div>
        </div>
    );
};

export default OrderSummary;