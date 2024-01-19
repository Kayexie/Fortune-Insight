import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import BaseClass from "./BaseClass";
import {Min} from "class-validator";
import Product from "./Product";
import {Order} from "./Order";

@Entity()
export class OrderLine extends BaseClass{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    unitPrice: number

    @Column()
    @Min(1)
    quantity: number

    @ManyToOne( () => Order, order => order.orderLines )
    order: Order

    @ManyToOne( () => Product, product => product.orderLines )
    product: Product

}