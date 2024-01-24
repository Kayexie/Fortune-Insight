import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import ProductController from "./ProductController";
import Owner from "../entity/Owner";
import {validateLoginInput} from "../utils/userService";
import * as jwt from 'jsonwebtoken';

class UserController {

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

}

export default UserController;
