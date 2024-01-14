import {
    Entity as entity,
    Column,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import {IsDecimal, IsInt, IsPositive, Length, Min, MinLength} from "class-validator";
import BaseClass from "./BaseClass";
import {User} from "./User";
import Product from "./Product";
@entity('category')
class Category extends BaseClass {
    // @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid') // if seed, must use PrimaryGeneratedColumn with uuid, default id required
    @Length(1)
    id: string

    @Column()
    @MinLength(1)
    techType: string;

    @OneToMany(() => Product, p => p.category)
    product: Product[]
}

export default Category;
