import { Router } from 'express'
import ProductController from "../controller/ProductController";

const productRoutes = Router()

productRoutes.get('/filters', ProductController.queryAllFilters)

productRoutes.post('/abc', ProductController.queryProductBySearchQ)

productRoutes.post('/pf', ProductController.fetchProductsByFilter)
// productRoutes.get('/search', ProductController.queryProductBySearch)




export default productRoutes