import { Factory, Seeder } from 'typeorm-seeding'
import Product from '../../entity/Product'
import {insertDataIntoDB, readCSV} from "../../utils/utils";
import {Connection} from "typeorm";

class generateSeeds implements Seeder {
    run = async (factory: Factory, connection: Connection): Promise<void> => {
        console.log('op1')
        // const products = await factory(Product)().createMany(5)

        const filePath = 'src/data/coin.csv' //regarding current working directory 'demo'
        try{
            const data = await readCSV(filePath)
            await insertDataIntoDB(data)
            console.log('csv to DB is done')
        }catch (e){
            console.log(e, 'csv to DB failure')
        }
    }
}

export default generateSeeds