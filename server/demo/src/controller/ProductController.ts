import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import Product from "../entity/Product";
import product from "../entity/Product";

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
        console.log('op1')
        try{
            const {page} = req.query
            console.log('op2',page)
            const products: Product[] = await getRepository(Product)
                .createQueryBuilder('product')
                .skip((page-1)*2)
                .take(2)
                .getMany()

            return res.status(200).send({
                page,
                products,
                "message": 'success fetch page products'
            })

        }catch(e){console.log(e)}
    }

    static queryProductBySearch = async (req: Request, res: Response) => {


        try{
            const {search} = req.query

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