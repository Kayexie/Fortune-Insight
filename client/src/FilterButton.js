import {useDispatch} from "react-redux";
import {fetchProductsByFilter} from "./redux/features/productSlice.js";

export const FilterButton = ({filter}) => {
    const dispatch = useDispatch()

    return <div className='filter-button'>

        <button
            onClick={()=>{dispatch(fetchProductsByFilter(filter))}}
        >{filter.techType}</button>

    </div>
}