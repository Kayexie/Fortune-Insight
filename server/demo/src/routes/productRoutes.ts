import { Router } from 'express'
import ProductController from "../controller/ProductController";

const productRoutes = Router()

productRoutes.get('/filters', ProductController.queryAllFilters)

productRoutes.post('/abc', ProductController.queryProductBySearchQ)

productRoutes.post('/pf', ProductController.fetchProductsByFilter)
// productRoutes.get('/search', ProductController.queryProductBySearch)

productRoutes.delete('/delete', ProductController.deleteProduct)

productRoutes.post('/create', ProductController.createProduct)

productRoutes.put('/update', ProductController.updateProduct)




export default productRoutes