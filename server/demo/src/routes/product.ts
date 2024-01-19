import { Router } from 'express'
import ProductController from "../controller/ProductController";

const product = Router()

// product.get('/', ProductController.queryAllProducts)
// product.get('/page', ProductController.queryProductByPage)
// product.get('/sortByPrice', ProductController.sortByPrice)
product.get('/filters', ProductController.queryAllFilters)

product.post('/abc', ProductController.queryProductBySearchQ)

product.post('/pf', ProductController.fetchProductsByFilter)
// product.get('/search', ProductController.queryProductBySearch)




export default product