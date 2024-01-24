import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany, JoinTable
} from "typeorm"
import BaseClass from "./BaseClass";

@Entity('role')
class Role extends BaseClass{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    roleName: string

    @Column({unique:true})
    permission: string
}

export default Role
