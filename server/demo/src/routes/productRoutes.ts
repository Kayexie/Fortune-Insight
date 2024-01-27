import { Router } from 'express'
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";

const productRoutes = Router()


productRoutes.get('/filters', ProductController.queryAllFilters)

productRoutes.post('/', ProductController.queryProductBySearchQ)

productRoutes.delete('/delete', UserController.verifyVendorRole, ProductController.deleteProduct)

productRoutes.post('/create', ProductController.createProduct)

productRoutes.put('/update', ProductController.updateProduct)




export default productRoutes
