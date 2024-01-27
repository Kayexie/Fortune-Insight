import { Router } from 'express'
import UserController from "../controller/UserController";

const orderRoutes = Router()


orderRoutes.post('/login', UserController.loginAuth)
orderRoutes.post('/info', UserController.userInfo)





export default orderRoutes;