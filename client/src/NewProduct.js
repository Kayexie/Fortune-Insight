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
import {useDispatch, useSelector} from "react-redux";
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
    const filters = useSelector(state => state?.product?.filters)
    const row = Math.ceil(filters?.owners?.length / 6)
    // console.log('select this --> ', filters)

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
                                           sx={{width: newProduct.image ? '330px' : '508px'}}
                                           onChange={paramHandler}
                                           value={newProduct.id}/>
                                </FormControl>
                                <FormControl sx={{position: 'relative'}}>
                                    <FormLabel>Image</FormLabel>
                                    <div>
                                        <Input required name='image'
                                               onChange={paramHandler}
                                               sx={{height: 36, width: newProduct.image ? '330px' : '508px'}}
                                               value={newProduct.image}/>
                                        {newProduct.image && <img width='120px' style={{right: '20px', top: '-15px', position: 'absolute'}} src={newProduct.image} alt=""/> }
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Current Price</FormLabel>
                                    <Input required name='currentPrice'
                                           sx={{width: newProduct.image ? '330px' : '508px'}}
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
                                        {filters && filters.categories && filters.categories.map(item =>
                                            <Radio value={item.name} label={item.name} size="sm" />
                                        )}
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Owner</FormLabel>
                                    <RadioGroup  name="ownerName" orientation='horizontal'
                                                 onChange={paramHandler}
                                                 sx={{width: 508, display: 'grid', gridTemplateRows: `repeat(${row}, 1fr)`,
                                                     gridTemplateColumns: 'repeat(6, 1fr)'
                                                 }}
                                    >
                                        {filters && filters.owners && filters.owners.map((item, index) =>
                                            <div><Radio value={item.name} label={item.name} size="sm" /></div>
                                            )}
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
