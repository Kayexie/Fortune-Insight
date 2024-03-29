import {useEffect} from 'react';
import './UserAccount.scss';
import {useDispatch, useSelector} from "react-redux";
import {allOrdersPerUser, deleteOrder, singleOrdersPerUser} from "../redux/features/orderSlice";
import {ArrowBack} from "@mui/icons-material";
import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const UserAccount = () => {
    const userInfo = useSelector(state => state?.user?.userInfo)
    // const token = useSelector(state => state?.user?.token)
    const userId = userInfo.userId
    const dispatch = useDispatch()
    const orderList = useSelector(state => state?.order.orderList)
    const orderDetails = useSelector(state => state?.order.orderDetails)
    const orderDetailsId = useSelector(state => state?.order.orderDetailsId)

    console.log(orderDetails, orderDetailsId)

    const [open, setOpen] = React.useState(new Array(orderList.length).fill(false));

    useEffect(() => {
        dispatch(allOrdersPerUser({userId}))
    }, [])

    const handleExpand = (orderId) => {
        // console.log(orderId)
        dispatch(singleOrdersPerUser({orderId}))
    }

    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));

    // useEffect( () => {
    //     window.location.reload()
    // },[orderList])

    const softDelete = (o) => {
        // console.log(o)
        let orderLinesId = []
        o.orderLines.map( orderLine => orderLinesId.push(orderLine.id))
        const targetOrder = {
            orderId: o.id,
            orderLinesId: orderLinesId
        }
        console.log(targetOrder)
        dispatch(deleteOrder({targetOrder}))
        window.location.reload()
    }



    return (
        <div className='user-account'>
            <div className="main-page-header">
                <div className='main-page-logo'>
                    <img style={{transform: 'scale(1.4)'}} src="/logo.png" alt=""/>
                    <h1>infinite fortune vendor</h1>
                </div>
                <div className='back-to-main' onClick={() => window.location.replace('/')}>
                    <ArrowBack sx={{margin: '0 3px -5px 0'}}/>
                    Back To Main Page
                </div>
            </div>

            {/*============================= above header ==================================*/}

            <div className='user-order-container'>
                <Box sx={{width: 700, pl: '24px', margin: '10px auto'}}>
                    <List
                        size="lg"
                        sx={(theme) => ({
                            // Gatsby colors
                            '--joy-palette-primary-plainColor': '#8a4baf',
                            '--joy-palette-neutral-plainHoverBg': 'transparent',
                            '--joy-palette-neutral-plainActiveBg': 'transparent',
                            '--joy-palette-primary-plainHoverBg': 'transparent',
                            '--joy-palette-primary-plainActiveBg': 'transparent',
                            [theme.getColorSchemeSelector('dark')]: {
                                '--joy-palette-text-secondary': '#635e69',
                                '--joy-palette-primary-plainColor': '#d48cff',
                            },
                            '--List-insetStart': '32px',
                            '--ListItem-paddingY': '0px',
                            '--ListItem-paddingRight': '16px',
                            '--ListItem-paddingLeft': '21px',
                            '--ListItem-startActionWidth': '0px',
                            '--ListItem-startActionTranslateX': '-50%',
                            [`& .${listItemButtonClasses.root}`]: {
                                borderLeftColor: 'divider',
                            },
                            [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                                borderLeftColor: 'currentColor',
                            },
                            '& [class*="startAction"]': {
                                color: 'var(--joy-palette-text-tertiary)',
                            },
                        })}
                    >
                        <ListItem nested>
                            <ListItem component="div" startAction={<ReceiptLong />}>
                                <Typography level="body-xs" sx={{ textTransform: 'uppercase', font: '500 1.3rem/1.6 Roboto Condensed,sans-serif' }}>
                                    Hello <b style={{marginLeft: '10px'}}>{userInfo.name}</b> !
                                </Typography>
                            </ListItem>
                            {orderList.length > 0
                                ? <List sx={{ '--List-gap': '0px' }}>
                                <ListItem>
                                    <ListItemButton selected>
                                        <Alert variant="outlined" severity="success" sx={{font: '400 1.1rem/1.6 Roboto Condensed,sans-serif', paddingBottom: 0}}>
                                            <AlertTitle sx={{font: '500 1.3rem/1.6 Roboto Condensed,sans-serif', marginTop: '-6px'}}>Order History</AlertTitle>
                                            You have {orderList.length} {orderList.length > 1 ? 'orders' : 'order'}.
                                        </Alert>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                                : <List sx={{ '--List-gap': '0px' }}>
                                    <ListItem>
                                        <ListItemButton selected>
                                            <Alert variant="outlined" severity="info" sx={{font: '400 1.1rem/1.6 Roboto Condensed,sans-serif'}}>
                                                <AlertTitle sx={{font: '500 1.3rem/1.6 Roboto Condensed,sans-serif', marginTop: '-6px'}}>Oops!</AlertTitle>
                                                You don't have any shopping record yet. Go to shop now!
                                            </Alert>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            }
                        </ListItem>

                        {/*============================= orderList begin ==================================*/}

                        {!!orderList && orderList.map((o, idx) =>
                            <ListItem
                                key={idx}
                                nested
                                className='orderlist'
                                sx={{ my: 1, width: 650 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="md"
                                        color="neutral"
                                        onClick={() => {
                                            let newOpen = open
                                            !open[idx] && newOpen.fill(false)
                                            newOpen[idx] = !open[idx]
                                            setOpen(newOpen)
                                            handleExpand(o.id)
                                        }}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open[idx] ? 'initial' : 'rotate(-90deg)' }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open[idx] ? 'bold' : undefined,
                                            color: open[idx] ? 'text.primary' : 'inherit',
                                            fontSize: 18,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            let newOpen = open
                                            !open[idx] && newOpen.fill(false)
                                            newOpen[idx] = !open[idx]
                                            setOpen(newOpen)
                                            handleExpand(o.id)
                                        }}
                                    >
                                        Order Id -<span className='order-list-id' style={{marginLeft: '5px'}}>{o.id}</span>
                                    </Typography>
                                    <DeleteIcon style={{fontSize:"medium"}} onClick={ () => softDelete(o)}/>
                                </ListItem>

                                {/*=============================  order details  ==================================*/}

                                {open[idx] && (
                                    <List sx={{ '--ListItem-paddingY': '8px', color: 'black', 'span': {fontSize: '16px'} }}>
                                        <ListItem>
                                            <ListItemButton sx={{fontSize: '15px'}}>
                                                <Root>
                                                    <Divider sx={{fontSize: '15px', width: 620}}>
                                                        <span>Create Time: {o.createdAt.substring(0, o.createdAt.indexOf('T'))}  {o.createdAt.substring(o.createdAt.indexOf('T') + 1, o.createdAt.indexOf('.'))}</span>
                                                        <span style={{marginLeft: 20}}>Update Time: {o.updatedAt.substring(0, o.updatedAt.indexOf('T'))}  {o.updatedAt.substring(o.updatedAt.indexOf('T') + 1, o.updatedAt.indexOf('.'))}</span>
                                                        <br/>
                                                        {/*<span>Order Total: $ .00</span>*/}
                                                    </Divider>
                                                </Root>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton sx={{margin: '5px 0', display: 'grid', gridTemplateColumns: '30px 70px 150px 130px 100px 1fr'}}>
                                                <span>No.</span>
                                                <span> </span>
                                                <span>Name</span>
                                                <span>Id</span>
                                                <span>Unit Price</span>
                                                <span>Quantity</span>
                                            </ListItemButton>
                                        </ListItem>
                                        {o.id === orderDetailsId && orderDetails.length && orderDetails.map((o, idx) =>
                                            <ListItem key={idx}>
                                                <ListItemButton sx={{font: '400 15px/1.6 Roboto Condensed,sans-serif', margin: '2px 0', display: 'grid', gridTemplateColumns: '30px 70px 150px 150px 100px 1fr'}}>
                                                    <span>{idx + 1}.</span>
                                                    <img width='30px' src={o.product.image} alt={o.product.id} style={{margin: '0 10px'}}/>
                                                    <span>{o.product.name}</span>
                                                    <span>{o.product.id}</span>
                                                    <span>${o.unitPrice}</span>
                                                    <span>{o.quantity}</span>
                                                </ListItemButton>
                                            </ListItem>
                                            )}
                                    </List>
                                )}
                            </ListItem>)}
                    </List>
                </Box>
            </div>

            {/*============================= below footer ==================================*/}
            <div className="user-account-page-footer">
                <div className='h5'>
                    <h4>Contact Us</h4>
                    <h4>Private Policy</h4>
                    <h4>Terms of Use</h4>
                </div>
                <p>Copyright © 2024 infinite fortune vendor Since 2023.</p>
            </div>
        </div>
    );
};

export default UserAccount;