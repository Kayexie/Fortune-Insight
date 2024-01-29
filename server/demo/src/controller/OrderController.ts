import {Request, Response} from "express";
import {getRepository, LockNotSupportedOnGivenDriverError} from "typeorm";
import {Order} from "../entity/Order";
import {OrderLine} from "../entity/OrderLine";

class OrderController {

    static queryAllOrders = async (req: Request, res: Response) => {

        const {userId} = req.params
        console.log(userId)

        try {
            //connect order database
            let orders: Order[] = await getRepository(Order)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.orderLines', 'orderLines')
                .where('order.customerId = :userId', {userId})
                .andWhere({isDelete: false})
                .getMany()

            //connect orderLine database
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

            //connect order database
            let singleOrder: Order = await getRepository(Order)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.orderLines', 'orderLines')
                .leftJoinAndSelect('orderLines.product', 'product')
                .where('order.id =:orderId', {orderId})
                .getOne()

            return res.status(200).send(({
                orderId,
                singleOrder
            }))

        } catch (e) {
            console.log('err', e)
        }
    }

    static createNewOrder = async (req: Request, res: Response) => {

        try {

            const data = req.body
            const productList = data.createOrder.productList

            //to get the userId
            const userId = data.createOrder.userId

            // create a new order
            const newOrder = Order.create({
                customer: userId
            })
            await newOrder.save()

            //obtain the orderId
            const orderId: string = newOrder.id


            //obtain the productRoutes info from req.body, which should contain productId, price & quantity

            //loop over productList and push the value of orderId into the array:
            productList.map(p => p.orderId = orderId)


            //todo:check if productId valid

            // create newOrderLine with orderLine, one productRoutes at a time
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
                orderId,
                newOrderLine
            })


        } catch (e) {
            console.log('err', e)
        }

    }

    static deleteSingleOrder = async (req: Request, res: Response) => {

        const data = req.body
        const orderId = req.params.orderId
        let orderLinesId = data.targetOrder.orderLinesId

        // console.log(orderId)

        try {
            //set order isDelete equals to true
                await getRepository(Order).createQueryBuilder('order')
                    .update(Order)
                    .where("order.id = :orderId",{orderId})
                    .set({isDelete:true})
                    .execute()

            //set orderLines isDelete equals to true
            for (let i = 0; i < orderLinesId.length; i++){
                await getRepository(OrderLine).createQueryBuilder('o')
                    .update(OrderLine)
                    .where("id = :orderLineId",{orderLineId:orderLinesId[i]})
                    .set({isDelete:true})
                    .execute()
            }


            return res.status(200).send(({
                message: "order deleted",
                // targetOrder
            }))
            //
        } catch (e) {
            console.log('err', e)
        }
    }


}

export default OrderController;