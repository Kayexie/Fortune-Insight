import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch} from "react-redux";
import {sortClear, sortProductsByLetterOrRank, sortProductsByPrice} from "./redux/features/productSlice.js";

export default function SelectAutoWidth({setSort}) {
    const [sortShow, setSortShow] = React.useState('');
    const dispatch = useDispatch()

    const createHandleMenuClick = (menuItem) => {
        setSortShow(menuItem.target.value)
            console.log(`Click on`, menuItem.target.value)
    };

    // const sortByPrice = (menuItem) => {
    //     dispatch(sortProductsByPrice(menuItem))
    // }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sortShow}
                    onChange={createHandleMenuClick}
                    autoWidth
                    label="Sort By"
                >
                    {/*<MenuItem value="" onClick={() => dispatch(sortClear('None'))}>*/}
                    {/*    <em>None</em>*/}
                    {/*</MenuItem>*/}
                    <MenuItem value={'DESC'} onClick={() => setSort('DESC')}>Price (High to Low)</MenuItem>
                    <MenuItem value={'ASC'} onClick={() => setSort('ASC')}>Price (Low to High)</MenuItem>
                    <MenuItem value={'Letter'} onClick={() => setSort('Letter')}>Initial Letter</MenuItem>
                    <MenuItem value={'Rank'} onClick={() => setSort('Rank')}>Market Cap Rank</MenuItem>
                    <MenuItem value={'None'} onClick={() => setSort('ASC')}>None</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
