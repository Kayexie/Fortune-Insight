import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useSelector} from "react-redux";


export default function PaginationButtons({setPage}) {
    const params = useSelector(state => state?.product?.params)

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="page-footer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '30px'}}>
            <Stack spacing={2}>
                <Pagination
                    count={params['total pages']}
                    size='large'
                    onChange={handleChange}
                    showFirstButton
                    showLastButton />
            </Stack>
        </div>
    );
}