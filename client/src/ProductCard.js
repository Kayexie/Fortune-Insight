import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import './ProductCard.scss'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditOrDelete from './EditOrDelete.js'
import {useDispatch} from "react-redux";
import {addToBag} from "./redux/features/productSlice";
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';

export default function ProductCard({index, p}) {

    const dispatch = useDispatch()
    // console.log('this is from ============productCart product', p)
    const nowDate = new Date()
    const productDate = new Date(p?.createdAt).getDate()


    // ----------this is for add to bag function start---------

    const addToBagHandler = () => {
        // console.log(p.id, p.name, p.image, p.currentPrice, p.totalVolume)
        const id = p.id
        const name = p.name
        const image = p.image
        const currentPrice = p.currentPrice
        const quantity = 1
        const totalVolume = p.totalVolume

        dispatch(addToBag({id, name, image, currentPrice, quantity, totalVolume }))
    }

    // ----------this is for add to bag function end---------


    return (
        <Card sx={{ width: 290, margin: '20px', background: 'white' }}>
            <div>
                <Typography level="title-lg" sx={{position: 'relative'}}>
                    {p?.name}
                    {nowDate.getDate() === productDate && <FiberNewOutlinedIcon sx={{fontSize: 40, position: 'absolute', margin: '-14px 0 0 10px', transform: 'rotate(-20deg)', color: 'var(--joy-palette-danger-500, #C41C1C)'}}/>}
                </Typography>
                <Typography level="body-sm"><span style={{fontWeight: '700', marginRight: '10px'}}>{p?.id}</span>{p?.symbol}</Typography>
                <EditOrDelete p={p}/>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <div className="product-detail">
                        <Typography level="body-sm"><span style={{fontWeight: '700'}}>Market Cap</span></Typography>
                        <Typography level="body-sm"><span style={{}}>${p?.marketCap}</span></Typography>
                        <Typography level="body-sm"><span style={{fontWeight: '700'}}>Rank</span></Typography>
                        <Typography level="body-sm"><span style={{color: 'red', fontWeight: '600'}}>{p?.marketCapRank}</span></Typography>
                        <Typography level="body-sm"><span style={{fontWeight: '700'}}>Price 24h</span></Typography>
                        {p?.priceChange24h >= 0 ?
                            <Typography level="body-sm"><ArrowDropUpIcon style={{fontSize: '28px', color: 'green', margin: '0 -5px -10px -7px'}}/><span style={{color: 'green', fontWeight: '600'}}>{p?.priceChange24h.toFixed(1)}%</span></Typography>
                            : <Typography level="body-sm"><ArrowDropDownIcon style={{fontSize: '28px', color: 'red', margin: '0 -15px -10px 0'}}/><span style={{marginLeft: '10px', color: 'red', fontWeight: '600'}}>{p?.priceChange24h.toFixed(1)}%</span></Typography>
                        }
                    </div>
                    <img
                        src={p?.image}
                        style={{width: 160, transform: 'scale(0.8)', marginRight: '-10px'}}
                        loading="lazy"
                        alt=""
                    />
                </div>
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">Current price:</Typography>
                    <Typography fontWeight="lg">
                        ${p?.currentPrice} USD
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    onClick={() => addToBagHandler()}
                >
                    Add to Bag
                </Button>
            </CardContent>
        </Card>
    );
}

