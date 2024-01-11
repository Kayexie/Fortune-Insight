import { Factory, Seeder } from 'typeorm-seeding'
import Product from '../../entity/Product'

class generateSeeds implements Seeder {
    run = async (factory: Factory): Promise<void> => {
        console.log('op1')
        const products = await factory(Product)().createMany(5)
    }
}

export default generateSeeds