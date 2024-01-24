
import * as fs from 'fs';
import * as csv from 'csv-parser';
import {getRepository} from "typeorm";
import Product from "../entity/Product";
import {faker} from "@faker-js/faker";
import Owner from "../entity/Owner";
import {Order} from "../entity/Order";
import {OrderLine} from "../entity/OrderLine";

export const emailRegex = /\S+@\S+\.\S+/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

export const readCSV = async (filePath) => {
    const results = [];

    return new Promise((resolve, reject)=>{
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results)
            })
            .on('error', (error) => {
                reject(error)
            })

    })

}
export const insertDataIntoDB = async (data, cateList, vendorList, plList) =>{

    const prodRepo =  getRepository(Product)

    for (const item of data) {
        // verify NaN value
        const parseNumOrDefault = (value, defaultValue=1, scale=10000) =>{
            const number = parseFloat(value)
            console.log('parseNumOrDefault',value , number)
            return isNaN(number) ? defaultValue
                : number/scale
        }

        // random category
        let randomCate
        if(cateList.length){
            randomCate = cateList[Math.floor(Math.random()*cateList.length)]
            // console.log("randomCate from each", randomCate)
        }

        // decide price level
        let currentPl
        if(plList.length){
            if(item.currentPrice < 10 ){
                currentPl = plList[1]
            }else if(item.currentPrice > 1000){
                currentPl = plList[0]
            }else{
                currentPl = plList[2]
            }
        }



        const product = Product.create({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            currentPrice: parseNumOrDefault(item.currentPrice, 1,1),
            totalVolume: parseNumOrDefault(item.totalVolume),
            marketCapRank: parseNumOrDefault(item.marketCapRank, 1,1),
            image: item.image,
            // image: faker.image.url(),
            marketCap: parseNumOrDefault(item.marketCap),
            category: randomCate, //sync db first to connect two tables, then can save the entity with Id
            owner: vendorList[Math.floor(Math.random()*vendorList.length)],
            priceLevel: currentPl,
            priceChange24h: parseNumOrDefault(item.priceChangePercentage24h, 1, 1)
        })

        await prodRepo.save(product)
    }
}
export const initFirstOwnerTable = async (initOnwerList, roles) =>{
    const ownerRepo = getRepository(Owner)
    // // first clear the table
    // await ownerRepo.createQueryBuilder()
    //     .delete()
    //     .from(Owner)
    //     .execute()

    for(const initOwner of initOnwerList){
        const owner = Owner.create({
            name: initOwner.name,
            age: faker.number.int({ min: 18, max: 99 }),
            email: faker.internet.email({firstName:initOwner.name}),
            password: initOwner.name+'7777',
            // password: faker.internet.password(8, false, /[A-Za-z0-9]/),
            roles: [roles[2], roles[1]],
        })
        await ownerRepo.save(owner)
    }
}

export const initFirstOrderAndLineTable = async (orderNumber) =>{
    const orderRepo = getRepository(Order)
    const prodRepo = getRepository(Product)
    const ownerRepo = getRepository(Owner)
    const orderLineRepo = getRepository(OrderLine)

    const prodList = await prodRepo.find()
    const customerList = await ownerRepo
        .createQueryBuilder('owner')
        .leftJoinAndSelect('owner.roles', 'role')
        .where('role.roleName = :roleName', {roleName: 'Customer'})
        .getMany()

    for(let i = 0; i < orderNumber; i++){
        const randomCustomer = faker.helpers.arrayElement(customerList)

        const order = Order.create({
            customer: randomCustomer,
        })

        await orderRepo.save(order)

        const orderLineNumber = faker.number.int({min:1, max:5})
        for(let j = 0; j < orderLineNumber; j++){
            const randomProd = faker.helpers.arrayElement(prodList)
            const orderLine = OrderLine.create({
                unitPrice: randomProd.currentPrice,
                quantity: faker.number.int({min:1, max:99}),
                order: order,
                product: randomProd,
            })
            await orderLineRepo.save(orderLine)
        }
    }
}