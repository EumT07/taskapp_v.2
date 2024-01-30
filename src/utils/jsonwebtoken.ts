import dotenv from "dotenv"
import {sign, verify} from "jsonwebtoken";


dotenv.config();
const jwt_secret = process.env.jwt_secret as string;


export const generateToken = (id:string) => {
    const jwt = sign({id}, jwt_secret,{
        expiresIn: "1h"
    });
    return jwt;
}

export const verifyToken = (token: string)=>{
    const verified = verify(token,jwt_secret);
    return verified;
}