import { pin_validator, secretQts_validator, answer_validator } from "../../utils/schema/user.schema";
import { Request, Response, NextFunction } from "express";
import { handleErrorHttp } from "../../utils/errorHandle";

export const check_pincode = (req:Request, res: Response, next: NextFunction)=>{

    try {
        const data = req.body;
        
        //Evaluate all pins
        const {error} = pin_validator.validate(data);

        if(error){
            return res.status(404).json({message: error.details});
        }

        return next();
    } catch (error) {
        const title = "Middleware Error: Pincode";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

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

export const check_answers = (req:Request, res: Response, next: NextFunction)=>{

    try {
        const data = req.body;

        //Check answers
        const {error} = answer_validator.validate(data);

        if(error){
            return res.status(404).json({message: error.details})
        }

        next();
    } catch (error) {
        const title = "Middleware Error: Answers";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}