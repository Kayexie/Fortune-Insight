import { Factory, Seeder } from 'typeorm-seeding'
import Product from '../../entity/Product'
import {insertDataIntoDB, readCSV} from "../../utils/utils";
import {Connection, getRepository} from "typeorm";
import Category from "../../entity/Category";
import Owner from "../../entity/Owner";
import PriceLevel from "../../entity/PriceLevel";

class generateSeeds implements Seeder {

    // initialize categories


    run = async (factory: Factory, connection: Connection): Promise<void> => {
        console.log('op1')
        // seed random data
        // const products = await factory(Product)().createMany(5)
        //
        // // initialize categories
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
        //
        // // initialize owners
        // const owners = [
        //     {name: 'Hao'},
        //     {name: 'Yan'},
        //     {name: 'Xie'},
        //     {name: 'Louis'},
        // ]
        // const ownerRepo = getRepository(Owner)
        // for (const ownerData of owners) {
        //     const owner = new Owner()
        //     owner.name = ownerData.name
        //     await ownerRepo.save(owner)
        // }
        //
        // // initialize pricelevel
        // const pls = [
        //     {name: 'Cheap'},
        //     {name: 'Mid'},
        //     {name: 'Expensive'},
        // ]
        // const plRepo = getRepository(PriceLevel)
        // for (const plData of pls) {
        //     const pl = new PriceLevel()
        //     pl.name = plData.name
        //     await plRepo.save(pl)
        // }

        // ============ line ===========

        // create categories list
        let categories
        try{
            const cateRepo = getRepository(Category)
            categories = await cateRepo.find()
        }catch (e){
            console.log(e)
        }
        //
        // // create owner list
        let owners
        try{
            const ownerRepo = getRepository(Owner)
            owners = await ownerRepo.find()
        }catch (e){
            console.log(e)
        }

        // create price level list
        let pls
        try{
            const plRepo = getRepository(PriceLevel)
            pls = await plRepo.find()
        }catch (e){
            console.log(e)
        }

        const filePath = 'src/data/coin-all-data.csv' //regarding current working directory 'demo'
        try{
            const data = await readCSV(filePath)
            await insertDataIntoDB(data, categories, owners, pls)
            console.log('csv to DB is done')
        }catch (e){
            console.log(e, 'csv to DB failure')
        }
    }
}

export default generateSeeds