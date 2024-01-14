import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
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
                .take(2)
                .getMany()

            return res.status(200).send({
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

}

export default ProductController;