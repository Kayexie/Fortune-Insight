import './FilterBar.scss'
import {useSelector} from "react-redux";
import {FilterButton} from "./FilterButton.js";
import * as React from "react";
export const FilterBar = () => {
    const filters = useSelector(state => state?.product.filters)
    // console.log('in filter bar====', filters)

    return (
        <div className='filter-bar-container'>
            <h3 className='filter-title'>FILTER BY</h3>
            <div className="filter-bar">
                {
                    !!filters && Object.entries(filters).map(([key, value], index) =>
                        <FilterButton key={index} title={key} filterList={value} />
                    )
                }
            </div>
        </div>
    )
}