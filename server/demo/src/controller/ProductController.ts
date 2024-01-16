import {getRepository} from "typeorm";
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
                .take(8)
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
            console.log('from back end controller fetchProductsByFilter')
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

}

export default ProductController;