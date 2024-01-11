import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import Product from "../entity/Product";

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
                products,
                "message": 'success fetch page products'
            })


        }catch(e){console.log(e)}


    }

}

export default ProductController;