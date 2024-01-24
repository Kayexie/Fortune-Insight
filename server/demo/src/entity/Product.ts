import {
    Entity as entity,
    Column,
    ManyToOne,
    PrimaryColumn,
    OneToOne, OneToMany
} from 'typeorm';
import {IsInt, Length, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
import Category from "./Category";
import Owner from "./Owner";
import PriceLevel from "./PriceLevel";
import {OrderLine} from "./OrderLine";
import {Order} from "./Order";
// import {OrderDetail} from "./OrderDetail";

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

    @Column()
    priceChange24h: number

    //relations:

    @ManyToOne(() => Category, cate => cate.product)
    category: Category

    @ManyToOne(() => Owner, owner => owner.products)
    owner: Owner

    @ManyToOne(() => PriceLevel, pl => pl.product)
    priceLevel: PriceLevel

    @OneToMany( ()=> OrderLine, orderLine => orderLine.product)
    orderLines: OrderLine[]
}

export default Product;
