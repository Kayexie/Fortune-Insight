import {Brackets, createQueryBuilder, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Product from "../entity/Product";
import Category from "../entity/Category";
import Owner from "../entity/Owner";
import PriceLevel from "../entity/PriceLevel";
import {validate} from "class-validator";

class ProductController {
    static queryAllFilters = async (req:Request, res:Response)=>{
        try{
            // get cate filters
            const categories = await getRepository(Category)
                .find()
            const cateFilters = categories.map(cate => {
                return {
                    id: cate.id,
                    name: cate.techType,
                    isChecked: false
                }
            })

            // get owner filters
            const owners = await getRepository(Owner)
                .find()
            const ownerFilters = owners.map(owner => {
                return {
                    id: owner.id,
                    name: owner.name,
                    isChecked: false
                }
            })

            // get price level filters
            const pls= await getRepository(PriceLevel)
                .find()
            const priceLevel = pls.map(pl => {
                return {
                    id: pl.id,
                    name: pl.name,
                    isChecked: false
                }
            })

            // const filters = await getRepository(Category)
            //     .createQueryBuilder('cate')
            //     .select(['cate.techType', 'cate.id'])
            //     .orderBy('cate.techType', 'ASC')
            //     .getMany()

            const response = {
                categories: cateFilters,
                owners: ownerFilters,
                priceLevel: priceLevel
            }

            res.status(200).send({
                "message": "success fetch filters",
                response
            })
        }catch(e){console.log(e)}
    }


    static fetchProductsByFilter = async (req:Request, res:Response)=>{
        try{
            const {categories, owners, priceLevel} = req.body
            const data = req.body
            console.log('from back end controller fetchProductsByFilter', categories, owners, priceLevel)
            let products = []

            const selectedCateIds = categories.filter(cate=>cate.isChecked).map(cate=>cate.id)
            const selectedOwnerIds = owners.filter(owner=>owner.isChecked).map(owner=>owner.id)
            const selectedPlIds = priceLevel.filter(pl=>pl.isChecked).map(pl=>pl.id)

            const query = getRepository(Product).createQueryBuilder('p')

            let conditions = []
            const updateConditions = (ids, fields) => {
                if(ids.length > 0){
                    conditions.push(`p.${fields} IN (:...${fields})`)
                }
            }

            updateConditions(selectedCateIds, 'categoryId')
            updateConditions(selectedOwnerIds, 'ownerId')
            updateConditions(selectedPlIds, 'priceLevelId')

            if(conditions.length > 0){
                // console.log('conditions', conditions)
                products = await query.where(conditions.join(' AND '), {
                    categoryId:selectedCateIds,
                    ownerId:selectedOwnerIds,
                    priceLevelId:selectedPlIds
                }).getMany()
            }else{
                // console.log('no conditions')
                products = await query.getMany()
            }

            console.log(products)

            res.status(200).send({
                products,
                "message": "success fetch products by filter"
            })
        }catch(e){console.log(e)}
    }

    static queryProductBySearchQ = async (req: Request, res: Response) => {

        try{
            const {search, sort, page} = req.query
            const {categories, owners, priceLevel} = req.body
            const data = req.body

            console.log(search, sort, page)
            console.log('from back end controller queryProductBySearchQ')

            const productsQuery = getRepository(Product).createQueryBuilder('product').where('product.isDelete = false')

            // ==================== filter ====================

            if(categories !== undefined || owners !== undefined || priceLevel !== undefined) {
                const selectedCateIds = categories.filter(cate=>cate.isChecked).map(cate=>cate.id)
                const selectedOwnerIds = owners.filter(owner=>owner.isChecked).map(owner=>owner.id)
                const selectedPlIds = priceLevel.filter(pl=>pl.isChecked).map(pl=>pl.id)

                let conditions = []
                const updateConditions = (ids, fields) => {
                    if(ids.length > 0){
                        conditions.push(`product.${fields} IN (:...${fields})`)
                    }
                }

                updateConditions(selectedCateIds, 'categoryId')
                updateConditions(selectedOwnerIds, 'ownerId')
                updateConditions(selectedPlIds, 'priceLevelId')

                if(conditions.length > 0){
                    // console.log('conditions', conditions)
                    productsQuery.where(conditions.join(' AND '), {
                        categoryId:selectedCateIds,
                        ownerId:selectedOwnerIds,
                        priceLevelId:selectedPlIds
                    })
            }
            }else {
                console.log('no conditions')
            }
            // ==================== filter ====================
            if(search){
                productsQuery.andWhere(new Brackets(qb => {
                    qb.where('product.id like :search', {search:`%${search}%`})
                        .orWhere('product.symbol like :search', {search:`%${search}%`})
                        .orWhere('product.name like :search', {search:`%${search}%`})
                }))
            }

            const searchCount = await productsQuery.getCount()
            if(searchCount === 0){
                res.status(200).send({
                    products: [],
                    message: 'no search result'
                })
                return // not execute the following code
            }

            if(sort){
                if(sort === 'ASC' || sort === 'DESC') {
                    productsQuery.orderBy('product.currentPrice', sort)
                } else if(sort === 'Letter' || sort === 'Rank') {
                    let sequence:string = ''
                    if(sort === 'Letter') {
                        sequence = 'product.name'
                    } else {
                        sequence = 'product.marketCapRank'
                    }
                    productsQuery.orderBy(`${sequence}`, 'ASC')
                } else if(sort !== 'None') {
                    return res.status(404).send({
                        message: 'invalid sort query'
                    })
                }
            }

            const total = await productsQuery.getCount()
            const perPage = 10
            //round up
            const totalPage = Math.ceil(total / perPage)
            let newPage = 1

            // count whether page is valid or not
            if(page) {
                if (0 < page && page <= totalPage) {
                    newPage = page
                } else if (page > totalPage) {
                    newPage = totalPage
                }
            }

            productsQuery.offset((newPage - 1) * perPage).limit(perPage)

            const products:Product[] = await productsQuery.getMany()

            if(!products) {
                return res.status(404).send({
                    message: 'final products not found'
                })
            }

            return res.status(200).send({
                products,
                params: {
                    'search': search,
                    'sort': sort,
                    'total products counts': total,
                    'total pages':totalPage,
                    'current page': newPage,
                    "message": "successfully get the search/sort/page products",
                }
            })

        }catch (e){
            return res.status(404).send(e)
        }
    }

    static createProduct = async (req: Request, res: Response) => {
        try{
            for(const key in req.body) {
                if(!req.body[key]) {
                    return res.status(300).send({
                        message: key + 'is not allowed to be empty, invalid body'
                    })
                }
            }

            const {name, symbol, id, image, marketCap, totalVolume, categories, owners, priceLevel} =req.body

        }catch (e) {
            return res.status(404).send({
                message: e
            })
        }
    }

    static updateProduct = async (req: Request, res: Response) => {
        try{
            for(const item in req.body) {
                if(!req.body[item]) {
                    return res.status(300).send({
                        message: item + 'is not allowed to be empty'
                    })
                }
            }

            const {name, symbol, id, image, currentPrice, priceChange24h, marketCap, totalVolume, category, owner} = req.body

            const builder = getRepository(Product).createQueryBuilder('product')

            const product: Product = await builder
                .where('product.id = :id', {id})
                .getOne()

            if(!product) {
                return res.status(404).send({
                    message: 'not found'
                })
            }

            const updateP = Product.create({
                name,
                id,
                symbol,
                image,
                currentPrice,
                priceChange24h,
                marketCap,
                totalVolume,
                category,
                owner
            })

            const errors = await validate(updateP)

            if(errors.length > 0) {
                return res.status(300).send({
                    message: errors
                })
            }

            await builder.update(Product)
                .set(updateP)
                .where('product.id = :id', {id})
                .execute()

            // if update product market cap, market cap rank column needs to be updated as well.
            if(product.marketCap !== updateP.marketCap) {
                const products: Product[] = await builder
                    .orderBy('product.marketCap', 'DESC').
                    getMany()
                for (let i = 0; i < products.length; i++) {
                    await builder.update(Product)
                        .where('product.id = :id', {id: products[i].id})
                        .setParameter('marketCapRank', i + 1)
                        .execute()
                }
            }

            return res.status(200).send({
                message: 'successfully update ' + name
            })

        }catch (e) {
            return res.status(404).send({
                message: e
            })
        }
    }

    static deleteProduct = async (req: Request, res: Response) => {
       try{
           const {id} = req.query

           if(!id) {
               return res.status(300).send({
                    message: 'invalid query of deleting product'
               })
           }

           const deleteQuery = getRepository(Product).createQueryBuilder('product')

           const deleteProduct = await deleteQuery
               .where('product.id = :id', {id})
               .getOne()

           if(!deleteProduct) {
               return res.status(404).send({
                   message: 'not found'
               })
           }

           await deleteQuery
               .where('product.id = :id', {id})
               .setParameter('isDelete', true)
               .execute()

           return res.status(200).send({
               message: 'successfully delete ' + deleteProduct.name
           })

       }catch (e) {
           return res.status(404).send({
               message: e
           })
       }
    }
}

export default ProductController;