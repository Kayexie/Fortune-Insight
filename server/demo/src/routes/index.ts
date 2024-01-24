import {Router} from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";


const routes = Router()

routes.use('/product', productRoutes)
routes.use('/order', productRoutes)
routes.use('/user', userRoutes)

export default routes

