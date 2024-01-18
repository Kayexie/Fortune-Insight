import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Application} from "express";
import * as bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";


const SERVER_PORT = 8000

const startServer = async () => {
    try {
        await createConnection()

        const app: Application = express()

        const cors = require('cors')
        app.use(cors({
            origin: 'http://localhost:3000', // 或者您前端应用的实际域名
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }))

        app.use(bodyParser.json())

        app.use('/product', productRoutes)

        app.listen(SERVER_PORT, ()=>{
            console.log(`Express server has started on port ${SERVER_PORT}`)
        })

    }catch (e) {
    console.log(e)
    }
}

startServer()