import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { IPincode} from "interfaces/models";
import { create_PinsCode } from "../services/security.methods";
import { verifyToken } from "../utils/jsonwebtoken";



//Enviroment Variables
dotenv.config();
const cookie_User = process.env.cookie_User as string;

export const set_pinCode = async (req: Request, res:Response, next:NextFunction)=>{

    const data:IPincode = req.body;
    //Get token?
    const token: string = req.cookies[cookie_User];

    if(!token){
        res.status(404).json({message: "Token Not provided"})
        return;
    }

    //Verify Token and Get token Id
    const user:any = verifyToken(token);
    
    //Creating Security Pins
    const value = await create_PinsCode(data,user.id);

    if(value !== "Pins Created"){
        res.status(404).json({message: "Error Pin"})
        return;
    }
    
    
    res.status(201).json({message: "Pin Created"});
    return;
}
export const set_secretQuestions = async (req: Request, res:Response)=>{

}