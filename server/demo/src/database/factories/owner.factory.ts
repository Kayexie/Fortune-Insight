import {define} from "typeorm-seeding";
import Product from "../../entity/Product";
import {faker} from "@faker-js/faker";
import Owner from "../../entity/Owner";
import Role from "../../entity/Role";

define(Owner, (faker1, context:Role)=>{
    const customerRole:Role = context
    // console.log('from user define:', customerRole)

    const name = faker.person.firstName()

    const customer:Owner = Owner.create(
        {
            name: name,
            age: faker.number.int({ min: 18, max: 99 }),
            email: faker.internet.email(),
            password: name+'7777',
            roles: [customerRole],
        }
    )
    return customer
})