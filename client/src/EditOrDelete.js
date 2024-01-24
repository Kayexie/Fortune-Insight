import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditNoteIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import {useDispatch} from "react-redux";
import {
    deleteProductById,
    fetchProductsByAllQuery,
    updateProduct
} from "./redux/features/productSlice.js";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import {useEffect} from "react";

export default function BasicSpeedDial({p}) {
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editProduct, setEditProduct] = React.useState(Object.assign({}, p, {categoryName: p?.category?.techType, ownerName: p?.owner?.name}))
    const dispatch = useDispatch()
    // console.log('edit page --> ', editProduct)

    const deleteHandler = () => {
        const id = p.id
        dispatch(deleteProductById({id}))
        const conditions = JSON.parse(localStorage.getItem('conditions'))
        dispatch(fetchProductsByAllQuery(conditions))
    }

    const editHandler = ({target}) => {
        setEditProduct({...editProduct, [target.name]: target.value})
    }

    useEffect(() => {
        setEditProduct(Object.assign({}, p,
            {categoryName: p?.category?.techType, ownerName: p?.owner?.name}))
    }, [p]);

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ zIndex: 2, position: 'absolute', top: '-1.2rem', right: '0.5rem', transform: 'scale(0.6)', '& .MuiFab-primary': { backgroundColor: '#E3FBE3', color: 'black', '&:hover': {backgroundColor: '#C7F7C7'}}}}
                icon={<SpeedDialIcon sx={{transform: 'scale(1.4)'}}/>}
                direction='down'
            >
                <SpeedDialAction
                    key='Edit'
                    icon={<EditNoteIcon />}
                    tooltipTitle='Edit'
                    tooltipPlacement='right'
                    sx={{transform: 'scale(1.2)'}}
                    onClick={() => setOpenEdit(true)}
                />
                <SpeedDialAction
                    key='Delete'
                    icon={<DeleteIcon/>}
                    tooltipTitle='Delete'
                    tooltipPlacement='right-start'
                    sx={{transform: 'scale(1.2)'}}
                    onClick={() => setOpenDelete(true)}
                />
            </SpeedDial>
            <React.Fragment>
                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                    <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <WarningRoundedIcon/>
                            Confirmation
                        </DialogTitle>
                        <Divider/>
                        <DialogContent>
                            Are you sure you want to delete this product?
                        </DialogContent>
                        <DialogActions>
                            <Button variant="solid" color="danger"
                                    onClick={() => {
                                        setOpenDelete(false)
                                        deleteHandler()
                                    }}>
                                Delete the product
                            </Button>
                            <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                    <ModalDialog sx={{width: 550, bgcolor: 'white'}}>
                        <DialogTitle>Edit the product</DialogTitle>
                        <DialogContent>Please change the information of the product.</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpenEdit(false);
                                if(editProduct) {
                                    console.log('will create the new product -> ', editProduct)
                                    dispatch(updateProduct(editProduct))
                                    const conditions = JSON.parse(localStorage.getItem('conditions'))
                                    dispatch(fetchProductsByAllQuery(conditions))
                                }
                            }}
                        >
                            <Stack spacing={2} >
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input autoFocus required name='name'
                                           onChange={editHandler}
                                           value={editProduct.name}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Symbol</FormLabel>
                                    <Input required name='symbol'
                                           onChange={editHandler}
                                           value={editProduct.symbol}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Id (Cannot change)</FormLabel>
                                    <Input disabled name='id'
                                           color='#000'
                                           sx={{backgroundColor: '#CDD7E1', width: editProduct.image ? '330px' : '500px'}}
                                           onChange={editHandler}
                                           value={editProduct.id}/>
                                </FormControl>
                                <FormControl sx={{position: 'relative'}}>
                                    <FormLabel>Image</FormLabel>
                                    <div>
                                        <Input required name='image'
                                               onChange={editHandler}
                                               sx={{height: 36, width: editProduct.image ? '330px' : '500px'}}
                                               value={editProduct.image}/>
                                        {editProduct.image && <img width='120px' style={{right: '20px', top: '-15px', position: 'absolute'}} src={editProduct.image} alt=""/> }
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Current Price</FormLabel>
                                    <Input required name='currentPrice'
                                           onChange={editHandler}
                                           sx={{width: editProduct.image ? '330px' : '500px'}}
                                           value={editProduct.currentPrice}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Price Change 24h</FormLabel>
                                    <Input required name='priceChange24h'
                                           onChange={editHandler}
                                           value={editProduct.priceChange24h}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Market Cap</FormLabel>
                                    <Input required name='marketCap'
                                           onChange={editHandler}
                                           value={editProduct.marketCap}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Total Volume</FormLabel>
                                    <Input required name='totalVolume'
                                           onChange={editHandler}
                                           value={editProduct.totalVolume}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Category</FormLabel>
                                    <RadioGroup  name="categoryName" orientation='horizontal'
                                                 defaultValue={editProduct.categoryName}
                                                 onChange={editHandler}>
                                        <Radio value="Public Blockchains" label="Public Blockchains" size="sm" />
                                        <Radio value="Consortium Blockchains" label="Consortium Blockchains" size="sm" />
                                        <Radio value="Private Blockchains" label="Private Blockchains" size="sm" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Owner</FormLabel>
                                    <RadioGroup  name="ownerName" orientation='horizontal'
                                                 defaultValue={editProduct.ownerName}
                                                 onChange={editHandler}
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
        </div>
    );
}