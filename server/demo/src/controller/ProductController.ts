import {Brackets, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Product from "../entity/Product";
import Category from "../entity/Category";
import Owner from "../entity/Owner";
import PriceLevel from "../entity/PriceLevel";

class ProductController {

    static queryAllProducts = async (req: Request, res: Response) => {
        try{
            const products: Product[] = await getRepository(Product)
                .createQueryBuilder('product')
                .getMany()

            return res.status(200).send({
                products,
                "message": "success fetch all products"
            })
        }catch(e){console.log(e)}
    }

    static queryProductByPage = async (req: Request, res: Response) => {
        try{
            const {page} = req.query
            const products: Product[] = await getRepository(Product)
                .createQueryBuilder('product')
                .skip((page-1)*2)
                .take(10)
                .getMany()

            return res.status(200).send({
                page,
                products,
                "message": 'success fetch page products'
            })
        }catch(e){console.log(e)}
    }
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

            // const products = await getRepository(Product)
            //     .createQueryBuilder('p')
            //     .where('p.categoryId = :id', {id})
            //     .getMany()

            console.log(products)

            res.status(200).send({
                products,
                "message": "success fetch products by filter"
            })
        }catch(e){console.log(e)}
    }

    static queryProductBySearch = async (req: Request, res: Response) => {

        try{
            const {search, sort, page} = req.query
            const {categories, owners, priceLevel} = req.body
            const data = req.body
            // let products = []

            console.log(search, sort, page)
            console.log('from back end controller fetchProductsByFilter', categories, owners, priceLevel)

            const productsQuery = getRepository(Product).createQueryBuilder('product')

            // ==================== filter ====================


            const selectedCateIds = categories.filter(cate=>cate.isChecked).map(cate=>cate.id)
            const selectedOwnerIds = owners.filter(owner=>owner.isChecked).map(owner=>owner.id)
            const selectedPlIds = priceLevel.filter(pl=>pl.isChecked).map(pl=>pl.id)

            // const query = getRepository(Product).createQueryBuilder('p')

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
            }else{
                // console.log('no conditions')
                // products = await query.getMany()
            }
            // ==================== filter ====================


            if(!sort || !page) {
                return res.status(404).send({
                    message: "invalid search/sort/page input"
                })
            }

            if(search){
                productsQuery.andWhere(new Brackets(qb => {
                qb.where('product.id like :search', {search:`%${search}%`})
                        .orWhere('product.symbol like :search', {search:`%${search}%`})
                        .orWhere('product.name like :search', {search:`%${search}%`})
                }))
            }


            const searchCount = await productsQuery.getCount()
            if(searchCount === 0){
                res.status(404).send({
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
                    'page': page,
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

    static sortByPrice = async (req: Request, res: Response) => {
        try {
            const {sort, search} = req.query
            const {id} = req.body

            if (sort !== 'ASC' && sort !== 'DESC') {
                return res.status(300).send({
                    message: 'invalid query sss' + sort
                })
            }

            console.log('sort order by ->', sort)

            let products:Product[] = []

            if(!search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .orderBy('product.currentPrice', sort)
                    .getMany()
            } else if(search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.id like :search', {search:`%${search}%`})
                    .orWhere('product.symbol like :search', {search:`%${search}%`})
                    .orWhere('product.name like :search', {search:`%${search}%`})
                    .orderBy('product.currentPrice', sort)
                    .getMany()
            } else if(!search && id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .orderBy('product.currentPrice', sort)
                    .getMany()
            } else if(search && id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .andWhere('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
                    .orderBy('product.currentPrice', sort)
                    .getMany()
            }

            if (!products) {
                return res.status(404).send({
                    message: 'not found'
                })
            }

            return res.status(200).send({
                products,
                message: 'successfully fetch all products by ' + sort,
            })

        } catch (e) {
            console.log(e)
        }
    }

}

export default ProductController;