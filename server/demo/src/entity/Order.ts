import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import BaseClass from "./BaseClass";
import Product from "./Product";
import {Min} from "class-validator";
import {OrderLine} from "./OrderLine";

@Entity()
export class Order extends BaseClass {

    @PrimaryGeneratedColumn('uuid')
    id: string

    // @ManyToOne(() => User, user => user.orders)
    // user: User

    @OneToMany( ()=> OrderLine, orderLine => orderLine.order)
    orderLines: OrderLine[]

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]
}