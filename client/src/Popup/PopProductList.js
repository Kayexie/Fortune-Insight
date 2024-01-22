import React from 'react';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import {useDispatch} from "react-redux";
import {deleteProduct} from "../redux/features/productSlice";


const PopProductList = ({c, i}) => {

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        console.log('this is deleted button',id)
        dispatch(deleteProduct({id}))
    }

    return (
        <div>
            <div className='pop-up-products'>
                <img src={c.image} alt={c.name}/>
                <div className='product-info'>
                    <p>{c.id}</p>
                    <h3>{c.name}</h3>
                    <p>{c.price}</p>
                </div>
                <div className='product-quantity'>
                    <p>quantity</p>
                    <p>{c.quantity}</p>
                </div>
                <HighlightOffSharpIcon onClick={ () => handleDelete(c.id)}/>
            </div>
        </div>
    );
};

export default PopProductList;