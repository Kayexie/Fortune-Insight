import ProductCard from "./ProductCard.js";
import {useDispatch, useSelector} from "react-redux";
import './Display.scss'

export const Display = () => {

    const products = useSelector(state => state?.product.products)
    const dispatch = useDispatch()

    return (
        <div className='display-container'>
            <div className='display-product-container'>
                {products && products?.map((p,idx)=>{
                        // console.log('single p in display====', p)
                        return <ProductCard
                            key={idx}
                            p={p}
                        />
                    })
                }
            </div>
        </div>
    )
}