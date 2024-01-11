import {BaseEntity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column} from "typeorm";
class BaseClass extends BaseEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        nullable: false,
        default: true
    })
    isActive: boolean;

    @Column({
        nullable: false,
        default: false
    })
    isDelete: boolean;
}

export default BaseClass;
