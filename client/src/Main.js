import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {
    fetchAllFilters,
    fetchAllProducts,
    fetchProductsByAllQuery,
    fetchProductsByFilter,
    fetchProductsByPage
} from "./redux/features/productSlice.js";
import {useEffect, useState} from "react";


export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product?.products) //selector will automatically subscribe to the store, and run whenever an action is dispatched
    const filters = useSelector(state => state?.product?.filters)
    const [sort, setSort] = useState('ASC')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)


    console.log('products in main page====', products)
    console.log('filters in main page====', filters)
    const baseUrl = 'http://localhost:3000/product'

    useEffect(() => {
        dispatch(fetchAllFilters())
    }, []);

    // useEffect(() => {
    //     // console.log('use effect when filters jojo', filters)
    //     dispatch(fetchProductsByFilter(filters))
    // }, [filters]);

    // //once page load, load the first page
    // useEffect(() => {
    //     dispatch(fetchProductsByPage(1))
    // }, [])

    //--------sort search page------
    useEffect(() => {
        console.log('changed:',sort, search, page, filters)
        if(sort && page && filters){
            dispatch(fetchProductsByAllQuery({sort, search, page, filters}))
        }

    }, [sort, search, page, filters])

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
                                // dispatch(fetchProductsByPage(i+1))
                                setPage(i+1)
                            }}
                        >{i+1}
                        </button>
                    )
                }

            </div>
            <div className="main-page-content">
                <SearchBar
                    setSearch={setSearch}
                />
                <div className="roductList-container">
                    <FilterBar/>
                    <div className="sortBar-container">
                        <SortFilter setSort={setSort}/>
                    </div>
                </div>
                {
                    products && products.length > 0
                        ? <Display/>
                        : <h4>Nothing</h4>
                }

            </div>
            <div className="main-page-footer">
                <h5>Contact Us</h5>
            </div>
        </div>
    )
}