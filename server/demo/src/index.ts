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
        app.use(cors())

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