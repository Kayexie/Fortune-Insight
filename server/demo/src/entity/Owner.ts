import {
    Entity as entity,
    Column,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    OneToMany, JoinTable
} from 'typeorm';
import {IsDecimal, IsEmail, IsInt, IsPositive, Length, Max, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
import Product from "./Product";
import Role from "./Role";
import {Order} from "./Order";
@entity('owner')
class Owner extends BaseClass {
    // @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid') // if seed, must use PrimaryGeneratedColumn with uuid, default id required
    @Length(1)
    id: string

    @Column()
    @MinLength(1)
    name: string;

    @Column({nullable: true})
    @Min(1)
    @Max(120)
    age: number;

    @Column()
    @IsEmail()
    @Length(5, 100)
    email: string

    @Column()
    @Length(6, 50)
    password: string

    // relation
    @OneToMany(() => Product, p => p.owner)
    products: Product[]

    @OneToMany(() => Order, o => o.customer)
    orders: Order[]

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]
}

export default Owner;
