import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";

export default function SelectAutoWidth({setSort}) {
    const [sortShow, setSortShow] = React.useState('');
    const params = useSelector(state => state?.product?.params)

    const createHandleMenuClick = (menuItem) => {
        setSortShow(menuItem.target.value)
            console.log(`Click on`, menuItem.target.value)
    };

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{font: '600 .95rem/1.6 Roboto Condensed,sans-serif', color: '#666', marginRight: '30px'}}>
                {params['total products counts']}
                {params['total products counts'] > 1 ? '   products' : '   product'}
            </div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
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
                    <MenuItem value={'None'} onClick={() => setSort('None')}>None</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
