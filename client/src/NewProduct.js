import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/joy/Tooltip";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import {useDispatch} from "react-redux";
import {createProduct, fetchProductsByAllQuery} from "./redux/features/productSlice.js";

export default function FloatingActionButtonSize() {
    const [open, setOpen] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState({
        name: '',
        symbol: '',
        id: '',
        image: '',
        currentPrice: '',
        priceChange24h: '',
        marketCap: '',
        totalVolume: '',
        categoryName: '',
        ownerName: '',
    })
    const dispatch = useDispatch()
    // console.log('select this --> ', newProduct)

    const paramHandler = ({target}) => {
        setNewProduct({...newProduct, [target.name]: target.value})
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <React.Fragment>
                <Tooltip title='Add a new product'
                         arrow
                         variant='solid'
                         size='sm'
                >
                    <Fab size="small" sx={{bgcolor: '#C7DFF7', '&:hover': {bgcolor: '#97C3F0'}}} aria-label="add">
                        <AddIcon onClick={() => setOpen(true)}/>
                    </Fab>
                </Tooltip>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog sx={{width: 550}}>
                        <DialogTitle>Add a new product</DialogTitle>
                        <DialogContent>Please fill in the information of the product.</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                                if(newProduct) {
                                    console.log('will create the new product -> ', newProduct)
                                    dispatch(createProduct(newProduct))
                                    const conditions = JSON.parse(localStorage.getItem('conditions'))
                                    dispatch(fetchProductsByAllQuery(conditions))
                                }
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input autoFocus required name='name'
                                           onChange={paramHandler}
                                           value={newProduct.name}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Symbol</FormLabel>
                                    <Input required name='symbol'
                                           onChange={paramHandler}
                                           value={newProduct.symbol}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Id</FormLabel>
                                    <Input required name='id'
                                           onChange={paramHandler}
                                           value={newProduct.id}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Image</FormLabel>
                                    <Input required name='image'
                                           onChange={paramHandler}
                                           value={newProduct.image}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Current Price</FormLabel>
                                    <Input required name='currentPrice'
                                           onChange={paramHandler}
                                           value={newProduct.currentPrice}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Price Change 24h</FormLabel>
                                    <Input required name='priceChange24h'
                                           onChange={paramHandler}
                                           value={newProduct.priceChange24h}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Market Cap</FormLabel>
                                    <Input required name='marketCap'
                                           onChange={paramHandler}
                                           value={newProduct.marketCap}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Total Volume</FormLabel>
                                    <Input required name='totalVolume'
                                           onChange={paramHandler}
                                           value={newProduct.totalVolume}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Category</FormLabel>
                                    <RadioGroup  name="categoryName" orientation='horizontal'
                                                onChange={paramHandler}>
                                        <Radio value="Public Blockchains" label="Public Blockchains" size="sm" />
                                        <Radio value="Consortium Blockchains" label="Consortium Blockchains" size="sm" />
                                        <Radio value="Private Blockchains" label="Private Blockchains" size="sm" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Owner</FormLabel>
                                    <RadioGroup  name="ownerName" orientation='horizontal'
                                                 onChange={paramHandler}
                                    >
                                        <Radio value="Louis" label="Louis" size="sm" />
                                        <Radio value="Hao" label="Hao" size="sm" />
                                        <Radio value="Yan" label="Yan" size="sm" />
                                        <Radio value="Xie" label="Xie" size="sm" />
                                    </RadioGroup>
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </Box>
    );
}
