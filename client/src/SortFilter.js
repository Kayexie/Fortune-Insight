import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth() {
    const [sort, setSort] = React.useState('');

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
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'DESC'}>Price (High to Low)</MenuItem>
                    <MenuItem value={'ASC'}>Price (Low to High)</MenuItem>
                    <MenuItem value={'Language settings'}>Initial Letter</MenuItem>
                    <MenuItem value={'Rank'}>Market Cap Rank</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
