import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { search_username,search_email } from "../services/recovery";
import { handleErrorHttp } from "../utils/errorHandle";
import { password_validator } from "../schema/user.schema";



export const check_Search = async (req: Request, res: Response, next: NextFunction)=>{
    try {

        //get Data
        const {data} = req.body;
        
        //Checking data: username or email
        //Regular expression by Google bard
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isAnEmail = regex.test(data);

        //Check is data is empty
        if(data === ""){
            return res.status(404).json({message: "Field is Empty"});
        }

        //Creating new variables
        let user: string;

        if(isAnEmail){
            user = await search_email(data)as string;
        }else{
            user = await search_username(data)as string;
        }

        if(user === "Not Found"){
            return res.status(400).json({message: `/?data=${data}`})
        }
    
        
        req.userId = user;

        next();
    } catch (error) {
        const title = "Error Middleware: check_Search";
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