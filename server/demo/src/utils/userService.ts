import { emailRegex, passwordRegex } from "./utils";
import {getRepository} from "typeorm";
import Owner from "../entity/Owner";
export const validateLoginInput = (email, password) => {

    let errors = []

    if(!emailRegex.test(email)){
        errors.push('invalid email')
    }

    if(!passwordRegex.test(password)){
        errors.push('invalid password')
    }

    if(errors.length > 0){
        return errors.join(',')
    }

    return null
}

