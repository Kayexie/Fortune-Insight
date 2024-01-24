import { Router } from 'express'
import UserController from "../controller/UserController";

const orderRoutes = Router()


orderRoutes.post('/login', UserController.loginAuth)





export default orderRoutes;