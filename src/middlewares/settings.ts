import User from "../models/user";
import {userUpdate_validator, password_validator, secretQts_validator, answer_validator } from "../schema/user.schema";
import { Request,Response,NextFunction } from "express";
import { handleErrorHttp } from "../utils/errorHandle";
import {IUser} from "../interfaces/models"; 


export const checkUsername = async (req:Request, res:Response, next: NextFunction)=>{
    try {
        //User id and data
        const { username } = req.body;

        const {error} = userUpdate_validator.validate(req.body);

        if(error){
            res.status(404).json({message: error.details});
            return;
        }

        //Search user to compare
        const user:IUser = await User.findById({_id: req.userId});

        //Search username into the data
        const usernameFound = await User.findOne({username: username});

        
        //If this is the same username next
        if(user.username === username) return next();

        
        if(usernameFound){
            return res.status(404).json({message: "User already Exists"});
        }


    } catch (error) {
        const title = "Error Middleware: check Username";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }

}

export const check_password = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const data = req.body;

        //Validator
        const {error} = password_validator.validate(data);

        if(error){
            res.status(404).json({message: error.details});
            return;
        }
        
        next();
    } catch (error) {
        const title = "Error Middleware: check_Password";
        const message = `${error}`
        handleErrorHttp(res,title,message);
    }

};

export const check_securityQuestions = (req:Request, res: Response, next: NextFunction)=>{

    try {
        const data = req.body;
        
        //Evaluate all pins
        const {error} = secretQts_validator.validate(data);

        if(error){
            return res.status(404).json({message: error.details});
        }

        next();
    } catch (error) {
        const title = "Middleware Error: Secret Questions";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}
