import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import ProductController from "./ProductController";
import Owner from "../entity/Owner";
import {validateLoginInput} from "../utils/userService";
import * as jwt from 'jsonwebtoken';

class UserController {

    // role verify middleware
    static verifyVendorRole = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        if(authHeader){
            const token = authHeader && authHeader.split(' ')[1]
            const key = process.env.JWT_SECRET
            jwt.verify(token, key, (err, decoded)=>{
                if(err){
                    res.status(400).send({
                        message: 'token is invalid',
                        err
                    })
                }

                //verify vendor role
                if(decoded.roles.includes('Vendor')){
                    next()
                }else{
                    res.status(400).send({
                        message: 'Permission denied'
                    })
                }
            })
        }else{
            res.status(400).send({
                message: 'token is not provided'
            })
        }
    }

    static loginAuth = async (req: Request, res: Response, next: NextFunction)=> {
        try{
            const {email, password} = req.body

            // validate email and password
            const validateError = validateLoginInput(email, password)
            if(validateError){
                return res.status(400).send({
                    message:'invalid login email or password',
                    validateError
            })
            }

            // authenticate user
                try{
                    const user = await getRepository(Owner)
                        .createQueryBuilder('owner')
                        .leftJoinAndSelect('owner.roles', 'role')
                        .where('owner.email = :email', {email})
                        .getOne()
                    if(!user){
                        return res.status(400).send({
                            message:'user does not exist'
                        })
                    }

                    //todo: hash password
                    if(user.password !== password){
                        return res.status(400).send({
                            message:'incorrect password'
                        })
                    }

                    //generate token JWT
                    if(user && user.password === password) {
                        const payload = {
                            userId: user.id,
                            email: user.email,
                            name: user.name,
                            age: user.age,
                            roles: user.roles.map(role=>role.roleName)
                        }
                        console.log('payload', payload)

                        const token = jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: '1h'}
                        )

                        return res.status(200).send({
                            token,
                            userInfo: {
                                ...payload,
                            },
                            message: 'login success'
                        })
                    }

                    } catch(e){console.log(e)}

            }catch(e){console.log(e)}
    }

    static userInfo = async (req:Request, res: Response)=>{
        try{
            const authHeader = req.headers.authorization
            if(authHeader){
                const token = authHeader && authHeader.split(' ')[1]
                const key = process.env.JWT_SECRET
                jwt.verify(token, key, (err, decoded)=>{
                    if(err){
                        res.status(400).send({
                            message: 'token is invalid',
                            err
                        })
                    }
                    res.status(200).send({
                        message: 'Welcome back',
                        decoded
                    })
                })

            }else{
                res.status(400).send({
                    msg: 'no token is provided in header'
                })
            }




        }catch(e){console.log(e)}

    }
}

export default UserController;
