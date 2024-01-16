import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Product from "../entity/Product";
import Category from "../entity/Category";
import {privateDecrypt} from "crypto";

class ProductController {

    static queryAllProducts = async (req: Request, res: Response) => {
        try{
            const {search, sort, page} = req.query
            const {id} = req.body

            const products = getRepository(Product).createQueryBuilder('product')

            if(search && !id) {
                products.where('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
            }

            if(!search && id) {
                products.where('product.categoryId = :id', {id})
            }

            if(search && id) {
                products.where('product.categoryId = :id', {id})
                    .andWhere('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
            }

            if(sort) {
                if(sort === 'ASC' || sort === 'DESC') {
                    products.orderBy('product.currentPrice', sort)
                } else if(sort === 'Letter' || sort === 'Rank') {
                    let sequence:string = ''
                    if(sort === 'Letter') {
                        sequence = 'product.name'
                    } else {
                        sequence = 'product.marketCapRank'
                    }
                    products.orderBy(`${sequence}`, 'ASC')
                } else if(sort !== 'None') {
                    return res.status(300).send({
                        message: 'invalid query'
                    })
                }
            }

            const total = await products.getCount()
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

            products.offset((newPage - 1) * perPage).limit(perPage)

            const data = await products.getMany()

            if(!data) {
                return res.status(404).send({
                    message: 'not found'
                })
            }

            return res.status(200).send({
                data,
                "message": "success fetch all products"
            })
        }catch(e){
            console.log(e)
            return res.status(500).send({
                message: e
            })
        }
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
            const filters = await getRepository(Category)
                .createQueryBuilder('cate')
                .select(['cate.techType', 'cate.id'])
                .orderBy('cate.techType', 'ASC')
                .getMany()


            res.status(200).send({
                filters,
                "message": "success fetch filters"
            })

        }catch(e){console.log(e)}
    }


    static fetchProductsByFilter = async (req:Request, res:Response)=>{
        try{
            const {id} = req.body
            const products = await getRepository(Product)
                .createQueryBuilder('p')
                .where('p.categoryId = :id', {id})
                .getMany()

            res.status(200).send({
                products,
                "message": "success fetch products by filter"
            })
        }catch(e){console.log(e)}
    }

    static queryProductBySearch = async (req: Request, res: Response) => {

        try{
            const {search} = req.query

            console.log(search)

            //如果search query 不存在 或search query为其他不是字母的输入
            if(!search) {
                return res.status(404).send({
                    message: "invalid search input"
                })
            }

            // console.log(typeof(search))

            //与数据库建立联系，搜出来可能是一个或多个结果
            const products:Product[] = await getRepository(Product)
                .createQueryBuilder('product')
                .where('product.id like :search', {search:`%${search}%`})
                .orWhere('product.symbol like :search', {search:`%${search}%`})
                .orWhere('product.name like :search', {search:`%${search}%`})
                .getMany()

            return res.status(200).send({
                message: 'successfully get the search products',
                products
            })

        }catch (e){
            return res.status(500).send('error', e)
        }
    }

    static sortByPrice = async (req: Request, res: Response) => {
        try {
            const {sort, search} = req.query
            const {id} = req.body

            if (sort !== 'ASC' && sort !== 'DESC') {
                return res.status(300).send({
                    message: 'invalid query'
                })
            }

            console.log('sort order by ->', sort)

            let products:Product[] = []

            if(!search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .orderBy('product.currentPrice', sort)
                    .getMany()
                console.log(`sort by price, search ${search} or id ${id}`)
            } else if(search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
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
                message: 'successfully sort all products by ' + sort,
            })

        } catch (e) {
            console.log(e)
            return res.status(500).send({
                message: e
            })
        }
    }

    static sort2 = async(req: Request, res: Response) => {
        try{
            const {sort, search} = req.query
            const {id} = req.body

            if(sort !== 'Letter' && sort !== 'Rank') {
                return res.status(300).send({
                    message: 'invalid query'
                })
            }

            console.log('sort order by -> ', sort)

            let sequence:string = ''
            if(sort === 'Letter') {
                sequence = 'product.name'
            } else {
                sequence = 'product.marketCapRank'
            }

            let products: Product[] = []

            if(!search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .orderBy(`${sequence}`, 'ASC')
                    .getMany()
            } else if(search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
                    .orderBy(`${sequence}`, 'ASC')
                    .getMany()
            } else if(!search && id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .orderBy(`${sequence}`, 'ASC')
                    .getMany()
            } else if(search && id){
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .andWhere('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
                    .orderBy(`${sequence}`, 'ASC')
                    .getMany()
            }

            if(!products) {
                return res.status(404).send({
                    message: 'not found'
                })
            }

            return res.status(200).send({
                products,
                message: 'successfully sort all products by' + sort
            })
        }catch (e) {
            console.log(e)
            return res.status(500).send({
                message: e
            })
        }
    }

    static sortClear = async (req: Request, res: Response) => {
        try{
            const {sort, search} = req.query
            const {id} = req.body

            if(sort !== 'None') {
                return res.status(300).send({
                    message: 'invalid query'
                })
            }

            console.log('clear sort')

            let products: Product[] = []

            if(!search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .getMany()
                console.log(`sort by price, search ${search} or id ${id}`)
            } else if(search && !id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
                    .getMany()
            } else if(!search && id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .getMany()
            } else if(search && id) {
                products = await getRepository(Product)
                    .createQueryBuilder('product')
                    .where('product.categoryId = :id', {id})
                    .andWhere('product.id like :search OR product.symbol like :search OR product.name like :search', {search:`%${search}%`})
                    .getMany()
            }

            if(!products) {
                return res.status(404).send({
                    message: 'not found'
                })
            }

            return res.status(200).send({
                products,
                message: 'successfully clear sort'
            })
        }catch (e) {
            console.log(e)
            return res.status(500).send({
                message: e
            })
        }
    }

}

export default ProductController;