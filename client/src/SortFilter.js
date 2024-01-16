import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch} from "react-redux";
import {fetchAllProducts} from "./redux/features/productSlice.js";
// import {fetchAllProducts, sortClear, sortProductsByLetterOrRank, sortProductsByPrice} from "./redux/features/productSlice.js";

export default function SelectAutoWidth() {
    const [sort, setSort] = React.useState('');
    const dispatch = useDispatch()

    const createHandleMenuClick = (menuItem) => {
        setSort(menuItem.target.value)
            console.log(`Click on`, menuItem.target.value)
    };

    const handleUrl = (param) => {
        const baseUrl = window.location.href
        let newUrl = new URL(baseUrl)
        if(newUrl.searchParams.has('sort')) {
            newUrl.searchParams.set('sort', param)
        } else {
            newUrl.searchParams.append('sort', param)
        }
        window.history.replaceState({path: newUrl.href}, '', newUrl.href)
        dispatch(fetchAllProducts(newUrl.href.substring(newUrl.href.indexOf('?'))))
    }


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
                          onClick={() => handleUrl('None')}
                    >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'DESC'}
                              onClick={() => handleUrl('DESC')}
                    >Price (High to Low)</MenuItem>
                    <MenuItem value={'ASC'}
                              onClick={() => handleUrl('ASC')}
                    >Price (Low to High)</MenuItem>
                    <MenuItem value={'Letter'}
                              onClick={() => handleUrl('Letter')}
                    >Initial Letter</MenuItem>
                    <MenuItem value={'Rank'}
                              onClick={() => handleUrl('Rank')}
                    >Market Cap Rank</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
