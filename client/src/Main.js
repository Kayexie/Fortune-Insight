import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {fetchAllFilters, fetchAllProducts, fetchProductsByFilter} from "./redux/features/productSlice.js";
// import {fetchAllFilters, fetchAllProducts, fetchProductsByFilter, fetchProductsByPage} from "./redux/features/productSlice.js";
import {useEffect} from "react";


export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product?.products) //selector will automatically subscribe to the store, and run whenever an action is dispatched
    const filters = useSelector(state => state?.product?.filters)
    console.log('products in main page====', products)
    console.log('filters in main page====', filters)
    const baseUrl = 'http://localhost:3000/product'

    useEffect(() => {
        dispatch(fetchAllFilters())
    }, []);

    useEffect(() => {
        // console.log('use effect when filters jojo', filters)
        dispatch(fetchProductsByFilter(filters))
    }, [filters]);

    //once page load, load the first page
    useEffect(() => {
        // const url = window.location.href
        let newUrl = new URL(baseUrl)
        if(newUrl.href.indexOf('page=') === -1) {
            newUrl.searchParams.append('page', '1')
            window.history.replaceState({path: newUrl.href}, '', newUrl.href)
        }
        console.log(newUrl.href)
        dispatch(fetchAllProducts(newUrl.href.substring(newUrl.href.indexOf('?'))))
    }, [])

    return (
        <div className='main-page-container'>
            <div className="main-page-header">
                <img src="logo.png" alt=""/>
                <h1>infinite fortune vendor</h1>
            </div>
            <div className="test">
                {/*<p>{JSON.stringify(products)}</p>*/}
                <button
                    onClick={() => {
                        // dispatch(fetchAllProducts())
                    }}
                >fetch all
                </button>
                {
                    [...Array(3)].map((_,i) =>
                        <button
                            key={i}
                            onClick={() => {
                                const baseUrl = window.location.href
                                let newUrl = new URL(baseUrl)
                                if(newUrl.searchParams.has('page')) {
                                    newUrl.searchParams.set('page', i + 1)
                                } else {
                                    newUrl.searchParams.append('page', i + 1)
                                }
                                window.history.replaceState({path: newUrl.href}, '', newUrl.href)
                                dispatch(fetchAllProducts(newUrl.href.substring(newUrl.href.indexOf('?'))))
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