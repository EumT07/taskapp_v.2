import { pin_validator } from "../schema/user.schema";
import { Request, Response, NextFunction } from "express";
import PIN from "../models/pincode";
import { handleErrorHttp } from "../utils/errorHandle";

export const check_pincode = (req:Request, res: Response, next: NextFunction)=>{

    try {
        const data = req.body;
        
        //Evaluate all pins
        const {error} = pin_validator.validate(data);

        if(error){
            res.status(404).json({message: error.details});
            return;
        }

        return next();
    } catch (error) {
        const title = "Middleware Error: Pincode";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}