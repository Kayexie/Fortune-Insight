import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import BaseClass from "./BaseClass";
import {IsEmail, Length, Max, Min} from "class-validator";
import {Order} from "./Order";

@Entity()
@Unique(['email'])
export class User extends BaseClass{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 100)
    firstName: string;

    @Column()
    @Length(1, 100)
    lastName: string;

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

    @Column({nullable: true, default: false})
    isStaff: boolean

    // @OneToMany(() => Order, order =>order.user)
    // orders: Order[]
}

