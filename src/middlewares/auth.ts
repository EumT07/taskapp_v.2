import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import { userValidator, emailValidator } from "../schema/user.schema";




export const checkUser_SignUP = async (req: Request, res: Response, next: NextFunction) =>{

    try {
        const {username,email} = req.body;
        
        //Check if Data is correct
        const { error } =  userValidator.validate(req.body, {abortEarly: false});
    
        if(error){
            res.status(404).json({message: error.details});
            return;
        }

        const user = await User.findOne({username: username});
        const user_email = await User.findOne({email: email});

        //User Exists
        if(user){
            res.status(404).json({message: "User is already exists"});
            return;
        }
        //Email Exists
        if(user_email){
            res.status(404).json({message: "Email is already exists"});
            return;
        }

        return next();
    } catch (error) {
        
    }

}
export const checkUser_SignIn = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {username,email} = req.body;

        const {error} = emailValidator.validate(req.body);

        if(error){
            res.status(404).json({message: error.details});
            return;
        }
        
        const user_email = await User.findOne({email: email});

        //Email Not exist
        if(!user_email){
            res.status(404).json({message: "User Not Found"});
            return;
        }

        return next();
    } catch (error) {
        
    }
}