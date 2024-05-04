import User from "../../../database/models/user";
import { Request, Response, NextFunction } from "express";
import { admin_emailValidator } from "../../../utils/schema/user.schema";
import { handleErrorHttp } from "../../../utils/errorHandle";



export const check_adminSignIn = async (req:Request, res: Response, next: NextFunction ) =>{
    try {
        const { email } = req.body;

        const {error} =  admin_emailValidator.validate(req.body,{abortEarly: false});

        if(error){
            return res.status(404).json({message: error.details});  
        }
        
        const adminEmail = await User.findOne({email: email});

        if(!adminEmail){
            return res.status(404).json({message: "Email not Found"});
        }

        return next();
    } catch (error) {
        const title = "Error Middleware: Admin_SignIn";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }
}