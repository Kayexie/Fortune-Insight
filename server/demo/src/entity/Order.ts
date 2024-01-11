import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import BaseClass from "./BaseClass";
import {Min} from "class-validator";
import Product from "./Product";
import {User} from "./User";

@Entity()
export class Order extends BaseClass {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Min(1)
    items: number

    @Column()
    @Min(0)
    total: number

    // @ManyToOne(() => User, user => user.orders)
    // user: User
    //
    // @ManyToMany(() => Product)
    // @JoinTable()
    // products: Product[]
}