import User from "../../../database/models/user";
import { Request, Response, NextFunction } from "express";
import { userValidator, user_emailValidator } from "../../../utils/schema/user.schema";
import { handleErrorHttp } from "../../../utils/errorHandle";




export const checkUser_SignUP = async (req: Request, res: Response, next: NextFunction) =>{

    try {
        const {username,email} = req.body;
        
        //Check if Data is correct
        const { error } =  userValidator.validate(req.body, {abortEarly: false});
    
        if(error){
            return res.status(404).json({message: error.details});
        }

        const user = await User.findOne({username: username});
        const user_email = await User.findOne({email: email});

        //User Exists
        if(user){
            return res.status(404).json({message: "User is already exists"});
        }
        //Email Exists
        if(user_email){
            return res.status(404).json({message: "Email is already exists"});
        }

        return next();
    } catch (error) {
        const title = "Error Middleware: SignUp";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }

}
export const checkUser_SignIn = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {email} = req.body;

        const {error} = user_emailValidator.validate(req.body);

        if(error){
            return res.status(404).json({message: error.details});
        }
        
        const user_email = await User.findOne({email: email});

        //Email Not exist
        if(!user_email){
            return res.status(404).json({message: "User Not Found"});
        }

        return next();
    } catch (error) {
        const title = "Error Middleware: SignIn";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }
}