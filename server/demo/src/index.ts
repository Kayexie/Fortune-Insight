import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Application} from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";


// const SERVER_PORT = 8000

const startServer = async () => {
    try {
        await createConnection()

        const app: Application = express()

        const cors = require('cors')
        app.use(cors({
            origin: 'http://localhost:3000', // or your frontend url port
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }))

        app.use(bodyParser.json())

        app.use('/', routes)

        app.listen(process.env.SERVER_PORT, ()=>{
            console.log(`Express server has started on port ${process.env.SERVER_PORT}`)
        })

    }catch (e) {
    console.log(e)
    }
}

startServer()