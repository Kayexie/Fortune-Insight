import { Entity as entity, Column } from 'typeorm';
import {IsDecimal, IsInt, IsPositive, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
@entity('product')
class Product extends BaseClass {
    @Column()
    @MinLength(1)
    name: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    @IsDecimal()
    price: string;

    @Column({nullable:false, default:1})
    @IsInt()
    @IsPositive()
    store: number;

    @Column()
    description: string;

    @Column()
    @IsInt()
    @Min(1)
    rank: number;

    @Column()
    img: string;


}

export default Product;