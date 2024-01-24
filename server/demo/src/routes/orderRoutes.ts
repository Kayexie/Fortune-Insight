import { Router } from 'express'
import OrderController from "../controller/OrderController";

const orderRoutes = Router()


orderRoutes.get('/', OrderController.queryAllOrders)
orderRoutes.get('/:orderId', OrderController.querySingleOrder)
orderRoutes.post('/', OrderController.createNewOrder)
orderRoutes.put('/:orderId', OrderController.updateSingleOrder)
orderRoutes.delete('/:orderId', OrderController.deleteSingleOrder)




export default orderRoutes;