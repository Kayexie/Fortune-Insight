import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import BaseClass from "./BaseClass";
import Product from "./Product";
import {Min} from "class-validator";
import {OrderLine} from "./OrderLine";
import Owner from "./Owner";

@Entity()
export class Order extends BaseClass {

    @PrimaryGeneratedColumn('uuid')
    id: string

    //relations:

    @ManyToOne(() => Owner, o => o.orders)
    customer: Owner

    @OneToMany( ()=> OrderLine, orderLine => orderLine.order)
    orderLines: OrderLine[]

    // @OneToMany(
    //     type => Invite,
    //     invite => invite.order,
    // )
    // invites?:Invite[]

}