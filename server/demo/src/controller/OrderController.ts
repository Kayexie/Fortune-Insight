import {Request, Response} from "express";
import {createQueryBuilder, getRepository} from "typeorm";
import {Order} from "../entity/Order";
import {validate} from "class-validator";
import {OrderLine} from "../entity/OrderLine";
import {create} from "domain";

class OrderController {

    static queryAllOrders = async (req: Request, res: Response) => {

        try {
            //connect order database
            let orders: Order[] = await getRepository(Order)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.orderLines', 'orderLines')
                .getMany()

            console.log(orders)

            return res.status(200).send(({
                orders,
            }))

        } catch (e) {
            console.log('err', e)
        }
    }

    static querySingleOrder = async (req: Request, res: Response) => {

        try {
            const {orderId} = req.params
            console.log(orderId)
            //todo: add userId to request body

            //connect order database
            let singleOrder: Order[] = await getRepository(Order)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.orderLines', 'orderLines')
                .select([
                    'order.id',
                    'orderLines.productId',
                    'orderLines.unitPrice',
                    'orderLines.quantity'
                ])
                .where('order.id =:orderId', {orderId})
                .getRawMany()


            console.log(singleOrder)



            return res.status(200).send(({
                singleOrder,
            }))

        } catch (e) {
            console.log('err', e)
        }
    }

    static createNewOrder = async (req: Request, res: Response) => {

        try {
            //create a new order
            const newOrder = Order.create()
            await newOrder.save()

            //obtain the orderId
            const orderId: string = newOrder.id
            console.log(orderId)

            //obtain the product info from req.body, which should contain productId, price & quantity
            //todo: add userId here also
            const productList = req.body
            // console.log(productList)

            //loop over productList and push the value of orderId into the array:
            //？？？?if i use the orderId directly, it will say format wrong ,don't know why
            productList.map(p => p.orderId = orderId)

            console.log(productList)


            //todo:check if productId valid

            // create newOrderLine with orderLine, one product at a time
            const newOrderLine = productList.map(p => OrderLine.create({
                unitPrice: p.currentPrice,
                quantity: p.quantity,
                product: p.productId,
                order: p.orderId
            }))

            //把 new orderLine 写入数据库
            await newOrderLine.map(n => n.save())

            return res.send({
                message: "YOU CREATE AN ORDER",
                newOrderLine
            })


        } catch (e) {
            console.log('err', e)
        }

    }

    static updateSingleOrder = async (req: Request, res: Response) => {

    }

    static deleteSingleOrder = async (req: Request, res: Response) => {

    }

}

export default OrderController;