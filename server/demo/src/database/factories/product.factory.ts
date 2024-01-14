import {define} from "typeorm-seeding";
import Product from "../../entity/Product";
import {faker} from "@faker-js/faker";

define(Product, ()=>{
    const product:Product = Product.create(
        {
            name: faker.commerce.productName(),
            symbol: faker.finance.currencyCode(),
            currentPrice: parseFloat(faker.commerce.price()), // define as a number
            totalVolume: faker.number.int({min:1, max:999}),
            // description: faker.commerce.productDescription(),
            marketCapRank: faker.number.int({min:1, max:100}),
            image: faker.image.url(),
            marketCap: faker.number.int({min:1, max:1000000000}),
            // category:
        }
    )
    console.log("op2", product)
    return product
})