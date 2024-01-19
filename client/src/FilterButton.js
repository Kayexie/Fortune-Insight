import {useDispatch} from "react-redux";
import {updateFilters} from "./redux/features/productSlice.js";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const FilterButton = ({title, filterList}) => {
    const dispatch = useDispatch()

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{font: '700 1.1rem/normal Roboto,sans-serif'}}
                >
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </AccordionSummary>
                <AccordionDetails>
                    {
                        filterList.map((filter, idx)=>{
                            return <div className='filter-entity-container' key={idx}>
                                <Checkbox
                                    {...label}
                                    color='success'
                                    index={idx}
                                    onClick={()=>{dispatch(updateFilters({title, idx}))}}
                                    sx={{width: 38, height: 38, marginTop: '-3px'}}
                                />
                                <label
                                    className='filter-bar-checkbox'
                                    style={{font: '700 .95rem/1.6 Roboto Condensed,sans-serif',
                                        cursor: 'pointer',
                                    }}
                                >{filter.name}</label>
                            </div>
                        })
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
