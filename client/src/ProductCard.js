import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import './ProductCard.scss'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditOrDelete from './EditOrDelete.js'
import {useDispatch, useSelector} from "react-redux";
import {addToBag, decreaseQuantity, deleteProduct, increaseQuantity} from "./redux/features/productSlice";
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import {useEffect, useState} from "react";
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';


export default function ProductCard({index, p}) {

    const dispatch = useDispatch()
    const nowDate = new Date()
    const productDate = new Date(p?.createdAt).getDate()
    const minQuantity = p?.currentPrice > 0.01 ? 1 : Math.ceil(0.01 / p?.currentPrice)
    const carts = useSelector(state => state?.product.cart)
    const primary = carts.filter(cart => cart.id === p.id)
    const primaryQ = !!primary ? primary.length && primary[0].quantity : 0
    const [q, setQ] = useState(0)

    // ----------this is for add to bag function start---------

    const addToBagHandler = () => {
        // console.log(p.id, p.name, p.image, p.currentPrice, p.totalVolume)
        const id = p.id
        const name = p.name
        const image = p.image
        const currentPrice = p.currentPrice
        const quantity = minQuantity
        const totalVolume = p.totalVolume
        dispatch(addToBag({id, name, image, currentPrice, quantity, totalVolume }))
    }

    useEffect(() => {
        setQ(primaryQ)
    }, [primaryQ]);

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
                            : <Typography level="body-sm"><ArrowDropDownIcon style={{fontSize: '28px', color: 'red', margin: '0 -15px -10px -7px'}}/><span style={{marginLeft: '10px', color: 'red', fontWeight: '600'}}>{Math.abs(p?.priceChange24h.toFixed(1))}%</span></Typography>
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
            <CardContent orientation="horizontal" sx={{display: 'grid', gridTemplateColumns: '130px 1fr', position: 'relative'}}>
                <div>
                    <Typography level="body-xs">Current price:</Typography>
                    <Typography fontWeight="lg">
                        ${p?.currentPrice} USD
                    </Typography>
                </div>
                {q === 0 && <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ alignSelf: 'center', fontWeight: 600, width: 100, padding: '0 14px' }}
                    onClick={() => addToBagHandler()}
                >
                    Add to Bag
                </Button>}
                {q > 0 && <Button
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 48px 1fr',
                        justifyItems: 'center',
                        width: 100,
                        height: 36,
                        margin: 'auto 0'
                    }}
                >
                    <div
                        style={{width: 20, height: 20, transform: 'scale(0.8)',border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px'}}
                        onClick={() => {
                            q > minQuantity ? dispatch(decreaseQuantity({id: p.id})) : dispatch(deleteProduct({id: p.id}))
                        }}
                    >
                        <Remove sx={{color: 'white', width: 22}}/>
                    </div>
                    <Typography fontWeight="md" sx={{color: 'white', fontSize: 14}}>
                        {q}
                    </Typography>
                    <div
                        style={{width: 20, height: 20, transform: 'scale(0.8)', border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px'}}
                        onClick={() => {
                            dispatch(increaseQuantity({id: p.id}))
                        }}
                    >
                        <Add sx={{color: 'white', width: 22}}/>
                    </div>
                </Button>}
                {minQuantity > 1 && q === minQuantity && <div style={{font: '400 0.7rem/1.6 Roboto Condensed,sans-serif', position: 'absolute', color: '#C41C1C', right: 8, bottom: -15}}>
                    {`(At least ${minQuantity} items)`}
                </div>}
            </CardContent>
        </Card>
    );
}

