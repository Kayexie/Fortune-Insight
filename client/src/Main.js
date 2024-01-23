import './Main.scss';
import SearchBar from "./SearchBar.js";
import {FilterBar} from "./FilterBar.js";
import {Display} from "./Display.js";
import SortFilter from "./SortFilter.js";
import NewProduct from './NewProduct.js'
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {
    fetchAllFilters,
    fetchProductsByAllQuery,
} from "./redux/features/productSlice.js";
import {useEffect, useState} from "react";
import Page from './Page.js';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Popup from "./Popup/Popup";


export const Main = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.product?.products) //selector will automatically subscribe to the store, and run whenever an action is dispatched
    const filters = useSelector(state => state?.product?.filters)
    const [sort, setSort] = useState('ASC')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [showPop, setShowPop] = useState(false)
    const carts = useSelector(state => state?.product.cart)


    // console.log('products in main page====', products)
    // console.log('filters in main page====', filters)
    const baseUrl = 'http://localhost:3000/product/abc'

    useEffect(() => {
        dispatch(fetchAllFilters())
    }, []);

    // --------sort search page------
    useEffect(() => {
        // console.log('changed:', sort, search, page, filters)

        dispatch(fetchProductsByAllQuery({sort, search, page, filters}))

        // --------change url------
        const params = {sort, search, page}
        let newUrl = new URL(baseUrl)

        for (const key in params) {
            if (params[key].length !== 0) {
                newUrl.searchParams.append(key, params[key])
            }
        }

        for (const key in filters) {
            const check = filters[key].filter(item => item.isChecked).map(cate => cate.name)
            for (const item in check) {
                newUrl.searchParams.append(key, check[item])
            }
        }
        // console.log('url = ', newUrl.href)
        window.history.replaceState({path: newUrl.href}, '', newUrl.href)
    }, [sort, search, page, filters])

    // --------handling shopping cart click------
    const openPop = () => {
        setShowPop(!showPop)
    }

    //calculate the ttl Qty in shopping cart
    const QtyArr = carts.map(item => item.quantity)
    const ttlQty = QtyArr.length !==0 ? QtyArr.reduce((a,c) => a + c) : 0


    document.querySelector('body').style.overflow = 'auto'

    return (
        <div className='main-page-container'>
            <div className="main-page-header">
                <div className='main-page-logo'>
                    <img src="/logo.png" alt=""/>
                    <h1>infinite fortune vendor</h1>
                </div>
                <div className='main-page-shopping' onClick={() => openPop()}>
                    <ShoppingCartOutlinedIcon/>
                    <p>Shopping Cart ({ttlQty})</p>
                </div>
            </div>
            {showPop && <Popup openPop={openPop}/>}
            <SearchBar setSearch={setSearch}/>
            <div className="main-page-content">
                <div className="page-left">
                    <FilterBar/>
                </div>
                <div className="page-right">
                    <div className="sortBar-container">
                        <SortFilter setSort={setSort}/>
                    </div>
                    {
                        products && products.length > 0
                            ? <Display/>
                            : <h4>Nothing</h4>
                    }
                </div>
            </div>
            <div className="page-content">
                <Page setPage={setPage}/>
            </div>
            <div className="main-page-createProduct">
                <NewProduct/>
            </div>
            <div className="main-page-footer">
                <h5>Contact Us</h5>
            </div>
        </div>
    )
}