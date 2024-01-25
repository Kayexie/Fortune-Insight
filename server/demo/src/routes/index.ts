import {Router} from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import orderRoutes from "./orderRoutes";



const routes = Router()

routes.use('/product', productRoutes)
routes.use('/user', userRoutes)
routes.use('/order', orderRoutes)

export default routes

