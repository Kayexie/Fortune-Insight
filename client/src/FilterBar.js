
import './FilterBar.scss'
import {useSelector} from "react-redux";
import {FilterButton} from "./FilterButton.js";
export const FilterBar = () => {
    const filters = useSelector(state => state?.product.filters)
    console.log('in filter bar====', filters)

    return (
        <div className='filter-bar-container'>
            <div className="filter-bar">
                {
                    !!filters && filters.map((f,index)=>
                    <FilterButton key={index} filter={f} />
                    )
                }
            </div>
        </div>
    )
}