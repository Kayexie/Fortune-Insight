import ProductCard from "./productCard.js";
import {useSelector} from "react-redux";
import './Display.scss'

export const Display = () => {

    const products = useSelector(state => state?.product.products)


    return (
        <div className='display-container'>
            {
                products?.map((p,idx)=>{
                    // console.log('single p in display====', p)
                    return <ProductCard
                        key={idx}
                        p={p}
                    />
                })
            }

            {/*<div className="display">*/}
            {/*    <ProductCard/>*/}
            {/*</div>*/}
        </div>
    )
}