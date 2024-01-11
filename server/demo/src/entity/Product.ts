import {Entity as entity, Column, ManyToMany, ManyToOne} from 'typeorm';
import {IsDecimal, IsInt, IsPositive, Length, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
import {User} from "./User";
@entity('product')
class Product extends BaseClass {
    @Column()
    @Length(1)
    id: string

    @Column()
    @Length(1, 200)
    symbol: string

    @Column()
    @MinLength(1)
    name: string;

    @Column()
    @Length(1, 200)
    image: string

    @Column()
    @Min(0)
    currentPrice: number

    @Column({
        nullable: false,
        default:1
    })
    @Min(0)
    marketCap: number

    @Column()
    @IsInt()
    @Min(1)
    marketCapRank: number

    @Column()
    @IsInt()
    @Min(0)
    totalVolume: number

    // @ManyToOne(() => User, user => user.orders)
}

export default Product;
