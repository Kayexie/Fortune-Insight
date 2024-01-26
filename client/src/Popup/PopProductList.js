import React from 'react';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import {useDispatch} from "react-redux";
import {addToBag, decreaseQuantity, deleteProduct, increaseQuantity} from "../redux/features/productSlice";
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';


const PopProductList = ({c, i}) => {

    const dispatch = useDispatch()


    const handleDelete = (id) => {
        // console.log('this is deleted button', id)
        dispatch(deleteProduct({id}))
    }

    const handleIncrease = (id, quantity) => {

        if(quantity < (c.totalVolume - 1)){
            dispatch(increaseQuantity({id}))
        }
        // if(quantity < )

    }

    const handleDecrease = (id, quantity) => {
        // console.log('button - clicked', id, quantity)
        if(quantity > 1){
            dispatch(decreaseQuantity({id}))
        } else {
            dispatch(deleteProduct({id}))
        }

    }

    const singleTtlPrice = c.quantity * c.price
    const decimalCount = String(singleTtlPrice).length - String(singleTtlPrice).indexOf('.') - 1

    return (
        <div>
            <div className='pop-up-products'>
                <img src={c.image} alt={c.name}/>
                <div className='product-info'>
                    <div className='product-name'>
                        <h3 style={{height: '22px', overflow: 'hidden', fontSize: '0.95rem', font: '600 0.95rem/1.6 Roboto Condensed,sans-serif', marginBottom: '-2px'}}>{c.name}</h3>
                        <p style={{marginBottom: '-5px'}}>Id:<span style={{marginLeft: '3px'}}>{c.id}</span></p>
                    </div>
                    <div className='product-quantity'>
                        <p style={{fontWeight: 550}}>Quantity</p>
                        <div className='product-quantity-editor'>
                            <RemoveSharpIcon style={{fontSize: "small"}} onClick={() => handleDecrease(c.id, c.quantity)}/>
                            <p className='product-quantity-number' style={{fontSize: '14px'}}>{c.quantity}</p>
                            <AddSharpIcon style={{fontSize: "small"}} onClick={() => handleIncrease(c.id, c.quantity)}/>
                        </div>
                    </div>
                    <div className='product-info-ttlPrice'>
                        <div className='price-number'>
                           <p style={{marginBottom: '-2px'}}>$<span>{decimalCount > 8 ? singleTtlPrice.toFixed(8) : singleTtlPrice}</span></p>
                        </div>
                        <p style={{marginBottom: '-5px'}} className='remove' onClick={() => handleDelete(c.id)}>REMOVE</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PopProductList;