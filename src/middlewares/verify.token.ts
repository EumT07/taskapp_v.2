import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { IJwtPayload } from "../interfaces/models";
import { handleErrorHttp } from "../utils/errorHandle";


dotenv.config();
const cookie_User = process.env.cookie_User as string;
const cookie_Admin = process.env.cookie_Admin as string;



export const verify_token = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_User] || req.cookies[cookie_Admin];
        
        if(!token){
            res.status(404).json({message: "Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
    } catch (error) {
        const title = "Middleware Error: VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}
// 