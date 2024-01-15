import { Factory, Seeder } from 'typeorm-seeding'
import Product from '../../entity/Product'
import {insertDataIntoDB, readCSV} from "../../utils/utils";
import {Connection, getRepository} from "typeorm";
import Category from "../../entity/Category";

class generateSeeds implements Seeder {

    // initialize categories


    run = async (factory: Factory, connection: Connection): Promise<void> => {
        console.log('op1')
        // seed random data
        // const products = await factory(Product)().createMany(5)
        //
        // initialize categories
        // const categories = [
        //     {techType: 'Public Blockchains'},
        //     {techType: 'Private Blockchains'},
        //     {techType: 'Consortium Blockchains'},
        // ]
        // const cateRepo = getRepository(Category)
        // for (const cateData of categories) {
        //     const category = new Category()
        //     category.techType = cateData.techType
        //     await cateRepo.save(category)
        // }

        // create categories list
        let categories
        try{
            const cateRepo = getRepository(Category)
            categories = await cateRepo.find()
        }catch (e){
            console.log(e)
        }




        const filePath = 'src/data/coin.csv' //regarding current working directory 'demo'
        try{
            const data = await readCSV(filePath)
            await insertDataIntoDB(data, categories)
            console.log('csv to DB is done')
        }catch (e){
            console.log(e, 'csv to DB failure')
        }
    }
}

export default generateSeeds