import {useDispatch} from "react-redux";
import {fetchProductsByFilter, updateFilters} from "./redux/features/productSlice.js";
import {buttonClasses} from "@mui/base/Button";

export const FilterButton = ({title, filterList}) => {
    const dispatch = useDispatch()

    return <div className='filter-button-container'>

        <h1>{title}</h1>
        {
            filterList.map((filter, idx)=>{
                return <div className='filter-entity-container' key={idx}>
                    <input type="checkbox"
                           index={idx}
                           onClick={()=>{dispatch(updateFilters({title, idx}))}}
                    ></input>
                    <label>{filter.name}</label>
                </div>
            })
        }

        {/*<button*/}
        {/*    onClick={()=>{dispatch(fetchProductsByFilter(filter))}}*/}
        {/*>{filter.techType}</button>*/}

    </div>
}