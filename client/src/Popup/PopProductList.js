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

    return (
        <div>
            <div className='pop-up-products'>
                <img src={c.image} alt={c.name}/>
                <div className='product-info'>
                    <div className='product-name'>
                        <h3>{c.name}</h3>
                        <p>ProductId:<span>{c.id}</span></p>
                    </div>
                    <div className='product-quantity'>
                        <p><b>Quantity</b></p>
                        <div className='product-quantity-editor'>
                            <AddSharpIcon style={{fontSize: "small"}} onClick={() => handleIncrease(c.id, c.quantity)}/>
                            <p className='product-quantity-number'>{c.quantity}</p>
                            <RemoveSharpIcon style={{fontSize: "small"}} onClick={() => handleDecrease(c.id, c.quantity)}/>
                        </div>
                    </div>
                    <div className='product-info-ttlPrice'>
                        <div className='price-number'>
                           <p>$<span>{singleTtlPrice}</span>.00</p>
                        </div>
                        <p className='remove' onClick={() => handleDelete(c.id)}>REMOVE</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PopProductList;