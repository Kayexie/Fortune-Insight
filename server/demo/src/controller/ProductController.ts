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
            const perPage = 9
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
            const {name, symbol, id, image, currentPrice, priceChange24h, marketCap, totalVolume, category, owner} =req.body
            let marketCapRank = 1

            const createP = Product.create({
                name,
                symbol,
                id,
                image,
                currentPrice,
                priceChange24h,
                marketCap,
                marketCapRank,
                totalVolume,
                category,
                owner,
                isDelete: false
            })

            const error = await validate(createP)

            if(error.length > 0) {
                return res.status(300).send({
                    message: error
                })
            }

            //determine the priceLevel of the new product
            const prList = await getRepository(PriceLevel).find()
            let priceLevel = new PriceLevel()

            if(currentPrice < 10) {
                priceLevel = prList[0]
            } else if(currentPrice > 1000) {
                priceLevel = prList[1]
            } else {
                priceLevel = prList[2]
            }
            createP.priceLevel = priceLevel

            //count the marketCapRank
            const products = await getRepository(Product).createQueryBuilder('product')
                .where('product.marketCap < :marketCap', {marketCap})
                .orderBy('product.marketCap', 'DESC')
                .getMany()

            if(!products.length) {
                createP.marketCapRank = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.isDelete = false')
                    .getCount() + 1
            } else {
                createP.marketCapRank = products[0].marketCapRank
                for (let i = 0; i < products.length; i++) {
                    await createQueryBuilder('product').update(Product)
                        .where('product.id = :id', {id: products[i].id})
                        .set({marketCapRank: products[i].marketCapRank + 1})
                        .execute()
                }
            }

            await createP.save()

            return res.status(200).send({
                message: 'successfully add new product'
            })

        }catch (e) {
            return res.status(404).send({
                message: e
            })
        }
    }

    static updateProduct = async (req: Request, res: Response) => {
        try{
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
                marketCapRank: product.marketCapRank,
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

            if(updateP.currentPrice !== product.currentPrice) {
                const prList = await getRepository(PriceLevel).find()
                let priceLevel = new PriceLevel()

                if(currentPrice < 10) {
                    priceLevel = prList[0]
                } else if(currentPrice > 1000) {
                    priceLevel = prList[1]
                } else {
                    priceLevel = prList[2]
                }
                updateP.priceLevel = priceLevel
            }

            await createQueryBuilder('product').update(Product)
                .set(updateP)
                .where('product.id = :id', {id})
                .execute()

            // if update product market cap, market cap rank column needs to be updated as well.
            if(updateP.marketCap !== product.marketCap) {
                const products: Product[] = await getRepository(Product)
                    .createQueryBuilder('product')
                    .orderBy('product.marketCap', 'DESC')
                    .getMany()
                for (let i = 0; i < products.length; i++) {
                    await createQueryBuilder('product').update(Product)
                        .where('product.id = :id', {id: products[i].id})
                        .set({marketCapRank: i + 1})
                        .execute()
                }
            }

            return res.status(200).send({
                message: 'successfully update ' + name,
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

           await createQueryBuilder('product')
               .update(Product)
               .where('product.id = :id', {id})
               .set({isDelete: true})
               .execute()

           //change marketCapRank after this product
           const products: Product[] = await getRepository(Product)
               .createQueryBuilder('product')
               .where('product.marketCap < :marketCap', {marketCap: deleteProduct.marketCap})
               .andWhere('product.isDelete = false')
               .orderBy('product.marketCap', 'DESC')
               .getMany()

           if(products.length > 0) {
               let rank = deleteProduct.marketCapRank
               for (let i = 0; i < products.length; i++) {
                   await createQueryBuilder('product')
                       .update(Product)
                       .where('product.id = :id', {id: products[i].id})
                       .set({marketCapRank: rank++})
                       .execute()
               }
           }

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