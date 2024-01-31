import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import { admin_emailValidator } from "../schema/user.schema";
import { handleErrorHttp } from "../utils/errorHandle";



export const check_adminSignIn = async (req:Request, res: Response, next: NextFunction ) =>{
    try {
        const { email } = req.body;

        const {error} =  admin_emailValidator.validate(req.body,{abortEarly: false});

        if(error){
            res.status(404).json({message: error.details});
            return;
        }
        
        const adminEmail = await User.findOne({email: email});

        if(!adminEmail){
            res.status(404).json({message: "Wrong email"});
            return;
        }

        return next();
    } catch (error) {
        const title = "Error Middleware: Admin_SignIn";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }
}