import User from "../models/user";
import {userUpdate_validator } from "../schema/user.schema";
import { Request,Response,NextFunction } from "express";
import { handleErrorHttp } from "../utils/errorHandle";


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
        const user = await User.findById({_id: req.userId});

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