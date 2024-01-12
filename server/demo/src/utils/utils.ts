
import * as fs from 'fs';
import * as csv from 'csv-parser';
import {getRepository} from "typeorm";
import Product from "../entity/Product";
import {faker} from "@faker-js/faker";

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
export const insertDataIntoDB = async (data) =>{
    const prodRepo =  getRepository(Product)

    for (const item of data) {
        // verify NaN value
        const parseNumOrDefault = (value, defaultValue=1, scale=10000) =>{
            const number = parseFloat(value)
            console.log(number)
            return isNaN(number) ? defaultValue
                : number/scale
        }

        const product = Product.create({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            currentPrice: parseNumOrDefault(item.currentPrice, 1,1),
            totalVolume: parseNumOrDefault(item.totalVolume),
            marketCapRank: parseNumOrDefault(item.marketCapRank, 1,1),
            image: item.image,
            marketCap: parseNumOrDefault(item.marketCap),
        })

        await prodRepo.save(product)
    }
}