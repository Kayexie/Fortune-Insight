import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Product from "../entity/Product";
import Category from "../entity/Category";

class ProductController {

    static queryAllProducts = async (req: Request, res: Response) => {
        try{
            const products: Product[] = await getRepository(Product)
                .createQueryBuilder('product')
                .limit(10)
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

}

export default ProductController;