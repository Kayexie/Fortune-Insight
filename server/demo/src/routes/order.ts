import { Router } from 'express'
import ProductController from "../controller/ProductController";

const productRoutes = Router()

// product.get('/', ProductController.queryAllProducts)
// product.get('/page', ProductController.queryProductByPage)
// product.get('/sortByPrice', ProductController.sortByPrice)
productRoutes.get('/filters', ProductController.queryAllFilters)

productRoutes.post('/abc', ProductController.queryProductBySearchQ)

productRoutes.post('/pf', ProductController.fetchProductsByFilter)
// product.get('/search', ProductController.queryProductBySearch)




export default productRoutes