import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch} from "react-redux";
import {sortClear, sortProductsByLetterOrRank, sortProductsByPrice} from "./redux/features/productSlice.js";

export default function SelectAutoWidth() {
    const [sort, setSort] = React.useState('');
    const dispatch = useDispatch()

    const createHandleMenuClick = (menuItem) => {
        setSort(menuItem.target.value)
            console.log(`Click on`, menuItem.target.value)
    };


    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sort}
                    onChange={createHandleMenuClick}
                    autoWidth
                    label="Sort By"
                >
                    <MenuItem value=""
                          onClick={() => dispatch(sortClear('None'))}
                    >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'DESC'}
                              onClick={() => dispatch(sortProductsByPrice('DESC'))}
                    >Price (High to Low)</MenuItem>
                    <MenuItem value={'ASC'}
                              onClick={() => dispatch(sortProductsByPrice('ASC'))}
                    >Price (Low to High)</MenuItem>
                    <MenuItem value={'Letter'}
                              onClick={() => dispatch(sortProductsByLetterOrRank('Letter'))}
                    >Initial Letter</MenuItem>
                    <MenuItem value={'Rank'}
                              onClick={() => dispatch(sortProductsByLetterOrRank('Rank'))}
                    >Market Cap Rank</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
