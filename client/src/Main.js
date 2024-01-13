import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {fetchAllProducts, fetchProductsByPage} from "./redux/features/productSlice.js";


export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product.products)
    console.log('in main page====', products)

    return (
        <div className='main-page-container'>
            <div className="main-page-header">
                <img src="logo.png" alt=""/>
                <h1>infinite fortune vendor</h1>
            </div>
            <div className="test">
                <p>{JSON.stringify(products)}</p>
                <button
                    onClick={() => {
                        dispatch(fetchAllProducts())
                    }}
                >fetch all
                </button>
                {
                    [...Array(3)].map((_,i) =>
                        <button
                            key={i}
                            onClick={() => {
                                dispatch(fetchProductsByPage(i+1))
                            }}
                        >{i+1}
                        </button>
                    )
                }



            </div>
            <div className="main-page-content">
                <SearchBar/>
                <div className="roductList-container">
                    <FilterBar/>
                    <div className="sortBar-container">
                        <SortFilter/>
                    </div>
                </div>
                <Display/>
            </div>
            <div className="main-page-footer">
                <h5>Contact Us</h5>
            </div>
        </div>
    )
}