import { Router } from 'express'
import ProductController from "../controller/ProductController";

const productRoutes = Router()

productRoutes.get('/', ProductController.queryAllProducts)
productRoutes.get('/page', ProductController.queryProductByPage)
productRoutes.get('/sortByPrice', ProductController.sortByPrice)
productRoutes.get('/sort2', ProductController.sort2)
productRoutes.get('/sortClear', ProductController.sortClear)
productRoutes.get('/filters', ProductController.queryAllFilters)
productRoutes.post('/', ProductController.fetchProductsByFilter)
// productRoutes.get('/search', ProductController.queryProductBySearch)

productRoutes.post('/search', ProductController.queryProductBySearch)


export default productRoutes