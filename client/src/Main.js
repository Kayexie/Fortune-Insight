import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {fetchAllFilters, fetchAllProducts, fetchProductsByPage} from "./redux/features/productSlice.js";
import {useEffect} from "react";


export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product.products)
    console.log('in main page====', products)

    useEffect(() => {
        dispatch(fetchAllFilters())
    }, []);

    //once page load, load the first page
    useEffect(() => {
        const url = window.location.href
        let newUrl = url
        if(url.indexOf('page=') === -1) {
            newUrl = url + 'product?page=1'
            window.history.replaceState({path: newUrl}, '', newUrl)
        }
        console.log(newUrl.substring(newUrl.indexOf('?')))
        dispatch(fetchAllProducts('?page=1'))
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
                        dispatch(fetchAllProducts())
                    }}
                >fetch all
                </button>
                {
                    [...Array(3)].map((_,i) =>
                        <button
                            key={i}
                            onClick={() => {
                                let url = window.location.href
                                const params = new URLSearchParams(window.location.search).get('page')
                                let newUrl = ''
                                if(url.indexOf('?') === -1) {
                                    newUrl = url + `product?page=${i+1}`
                                } else if(url.indexOf('page=') === -1) {
                                    newUrl = url + `&page=${i+1}`
                                }else {
                                    let reg = new RegExp(`page=${params}`)
                                    newUrl = url.replace(reg,`page=${i+1}`)
                                }
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