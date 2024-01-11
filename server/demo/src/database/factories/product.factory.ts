import {define} from "typeorm-seeding";
import Product from "../../entity/Product";
import {faker} from "@faker-js/faker";

define(Product, ()=>{
    const product:Product = Product.create(
        {
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            store: faker.number.int({min:1, max:999}),
            description: faker.commerce.productDescription(),
            rank: faker.number.int({min:1, max:100}),
            img: faker.image.url()
        }
    )
    console.log("op2", product)
    return product
})