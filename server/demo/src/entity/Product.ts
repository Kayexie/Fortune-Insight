import {Entity as entity, Column, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {IsDecimal, IsInt, IsPositive, Length, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
import {User} from "./User";
import Category from "./Category";
@entity('product')
class Product extends BaseClass {
    @PrimaryColumn()
    // @PrimaryGeneratedColumn('uuid') // if seed random, must use PrimaryGeneratedColumn with uuid, default id required
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

    @ManyToOne(() => Category, cate => cate.product)
    category: Category
}

export default Product;
