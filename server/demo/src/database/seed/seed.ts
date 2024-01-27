import { Factory, Seeder } from 'typeorm-seeding'
import Product from '../../entity/Product'
import {initFirstOrderAndLineTable, initFirstOwnerTable, insertDataIntoDB, readCSV} from "../../utils/utils";
import {Connection, getRepository, Repository} from "typeorm";
import Category from "../../entity/Category";
import Owner from "../../entity/Owner";
import PriceLevel from "../../entity/PriceLevel";
import Role from "../../entity/Role";
import {Order} from "../../entity/Order";

class generateSeeds implements Seeder {

    // initialize categories


    run = async (factory: Factory, connection: Connection): Promise<void> => {

        console.log('op1: seed init')

        // seed random data
        // const products = await factory(Product)().createMany(5)

<<<<<<< HEAD
<<<<<<< HEAD
        //
        // ========== STEP 1 ===initialize categories===============
=======
>>>>>>> cacc0217e05f8652015bddc764f2fd9749d6563d
=======

>>>>>>> f8a1ff9c5607965900f7e1734a78b012aa561250
        // // initialize categories
>>>>>>> f8a1ff9c5607965900f7e1734a78b012aa561250
        // const categories = [
        //     {techType: 'Public Blockchains'},
        //     {techType: 'Private Blockchains'},
        //     {techType: 'Consortium Blockchains'},
        // ]
        // const cateRepo = getRepository(Category)
        // for (const cateData of categories) {
        //     const category = new Category()
        //     category.techType = cateData.techType
        //     await cateRepo.save(category)
        // }
        //
        // // initialize pricelevel
        // const pls = [
        //     {name: 'Cheap'},
        //     {name: 'Mid'},
        //     {name: 'Expensive'},
        // ]
        // const plRepo = getRepository(PriceLevel)
        // for (const plData of pls) {
        //     const pl = new PriceLevel()
        //     pl.name = plData.name
        //     await plRepo.save(pl)
        // }
        //
        // // initialize roles
        // const roles = [
        //     {roleName: 'Admin', permission: 'all_access'},
        //     {roleName: 'Customer', permission: 'view_products'},
        //     {roleName: 'Vendor', permission: 'Edit_products'}
        // ]
        //
        // const repoRole:Repository<Role> = getRepository(Role)
        // console.log('op2: role init')
        // for (const roleData of roles) {
        //     const role = new Role()
        //     role.roleName = roleData.roleName
        //     role.permission = roleData.permission
        //     await repoRole.save(role)
        // }

<<<<<<< HEAD
        // ============ STEP ONE line ===========

        // // ========== STEP TWO======== create categories list
        // let categories
        // try{
        //     const cateRepo = getRepository(Category)
        //     categories = await cateRepo.find()
        // }catch (e){
        //     console.log(e)
        // }
        //
        //
        // // create price level list
        // let pls
        // try{
        //     const plRepo = getRepository(PriceLevel)
        //     pls = await plRepo.find()
        // }catch (e){
        //     console.log(e)
        // }
        //
        // // create roles list
        // let roles
        // try{
        //     const rolesRepo = getRepository(Role)
        //     roles = await rolesRepo.find()
        // }catch (e){
        //     console.log(e)
        // }
        //
        // // ============ for init owner table START ===========
        //
        // // initialize admin in Owner table
        // const repoRole:Repository<Role> = getRepository(Role)
        // const adminRole = await repoRole.findOne({where:{roleName:'Admin'}})
        //
        // const repoOwner = getRepository(Owner)
        // let owner = new Owner()
        // owner.name = "BBs"
        // owner.age = 102
        // owner.email = "bearbbcjtc@gmail.com"
        // owner.password = "bb900415"
        // owner.roles = [adminRole]
        // await repoOwner.save(owner)
        //
        // // generate first 4+1 owners
        // try{
        //     const initOnwerList = [
        //         {name: 'Hao'},
        //         {name: 'Yan'},
        //         {name: 'Xie'},
        //         {name: 'Louis'},
        //     ]
        //     await initFirstOwnerTable(initOnwerList, roles)
        //     console.log('init first 4+1 owners is done')
        // }catch (e){
        //     console.log("init Owner table failure",e)
        // }
        //
        // //generate random customer data
        // let customerRole
        // try{
        //    customerRole = await getRepository(Role)
        //        .findOne({where: {roleName: 'Customer'}})
        //     console.log('customerRole is found')
        // }catch (e){console.log(e)}
        //
        // const owners = await factory(Owner)(customerRole).createMany(5)
        //
        // // ============ for init owner table END ===========
        // //
        // // ============ for init product table START ===========
        // // filter vendor owners
        // let vendors
        // try{
        //     vendors = await getRepository(Owner)
        //         .createQueryBuilder("owner")
        //         .innerJoinAndSelect("owner.roles", "role")
        //         .where("role.roleName = :roleName", {roleName: "Vendor"})
        //         .getMany()
        // }catch (e){
        //     console.log(e)
        // }
        //
        // // generate random product data from csv
        // const filePath = 'src/data/coin-all-data.csv' //regarding current working directory 'demo'
        // try{
        //     const data = await readCSV(filePath)
        //     await insertDataIntoDB(data, categories, vendors, pls)
        //     console.log('csv to DB is done')
        // }catch (e){
        //     console.log(e, 'csv to DB failure')
        // }
        // // ============ for init product table END ===========
        //
        // // ============ for init order and line table START ===========
        //
        // // ============== STEP TWO ==========================
        //
=======
        // ============ line ===========

        // create categories list
        let categories
        try{
            const cateRepo = getRepository(Category)
            categories = await cateRepo.find()
        }catch (e){
            console.log(e)
        }


        // create price level list
        let pls
        try{
            const plRepo = getRepository(PriceLevel)
            pls = await plRepo.find()
        }catch (e){
            console.log(e)
        }

        // create roles list
        let roles
        try{
            const rolesRepo = getRepository(Role)
            roles = await rolesRepo.find()
        }catch (e){
            console.log(e)
        }

        // ============ for init owner table START ===========

        // initialize admin in Owner table
<<<<<<< HEAD
        const repoRole = getRepository(Role)
=======
        const repoRole:Repository<Role> = getRepository(Role)
>>>>>>> f8a1ff9c5607965900f7e1734a78b012aa561250
        const adminRole = await repoRole.findOne({where:{roleName:'Admin'}})

        const repoOwner = getRepository(Owner)
        let owner = new Owner()
        owner.name = "BBs"
        owner.age = 102
        owner.email = "bearbbcjtc@gmail.com"
        owner.password = "bb900415"
        owner.roles = [adminRole]
        await repoOwner.save(owner)

        // generate first 4+1 owners
        try{
            const initOnwerList = [
                {name: 'Hao'},
                {name: 'Yan'},
                {name: 'Xie'},
                {name: 'Louis'},
            ]
            await initFirstOwnerTable(initOnwerList, roles)
            console.log('init first 4+1 owners is done')
        }catch (e){
            console.log("init Owner table failure",e)
        }

        //generate random customer data
        let customerRole
        let owners
        try{
           customerRole = await getRepository(Role)
               .findOne({where: {roleName: 'Customer'}})
            console.log('customerRole is found')
        }catch (e){console.log(e)}

        const owners = await factory(Owner)(customerRole).createMany(5)

        // ============ for init owner table END ===========

<<<<<<< HEAD
        // // ============ for init product table START ===========

        // // filter vendor owners

        // let vendors
        // try{
        //     vendors = await getRepository(Owner)
        //         .createQueryBuilder("owner")
        //         .innerJoinAndSelect("owner.roles", "role")
        //         .where("role.roleName = :roleName", {roleName: "Vendor"})
        //         .getMany()
        // }catch (e){
        //     console.log(e)
        // }
        //
        // // generate random product data from csv
        // const filePath = 'src/data/coin-all-data.csv' //regarding current working directory 'demo'
        // try{
        //     const data = await readCSV(filePath)
        //     await insertDataIntoDB(data, categories, vendors, pls)
        //     console.log('csv to DB is done')
        // }catch (e){
        //     console.log(e, 'csv to DB failure')
        // }

=======
        // ============ for init product table START ===========
        // filter vendor owners
        let vendors
        try{
            vendors = await getRepository(Owner)
                .createQueryBuilder("owner")
                .innerJoinAndSelect("owner.roles", "role")
                .where("role.roleName = :roleName", {roleName: "Vendor"})
                .getMany()
        }catch (e){
            console.log(e)
        }

        // generate random product data from csv
        const filePath = 'src/data/coin-all-data.csv' //regarding current working directory 'demo'
        try{
            const data = await readCSV(filePath)
            await insertDataIntoDB(data, categories, vendors, pls)
            console.log('csv to DB is done')
        }catch (e){
            console.log(e, 'csv to DB failure')
        }
>>>>>>> f8a1ff9c5607965900f7e1734a78b012aa561250
        // ============ for init product table END ===========

        // ============ for init order and line table START ===========
>>>>>>> f8a1ff9c5607965900f7e1734a78b012aa561250
        try{
            await initFirstOrderAndLineTable(5)
            console.log('init order and line table is done')
        }catch (e){console.log(e, 'init order and line table failure')}

    }
}

export default generateSeeds