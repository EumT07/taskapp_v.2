import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { IPincode, ISecretQuestions} from "interfaces/models";
import { create_PinsCode, create_SecretQuestions } from "../services/security.methods";
import { verifyToken } from "../utils/jsonwebtoken";



//Enviroment Variables
dotenv.config();
const cookie_User = process.env.cookie_User as string;

export const set_pinCode = async (req: Request, res:Response, next:NextFunction)=>{

    const data:IPincode = req.body;
   
    //Creating Security Pins
    const pins = await create_PinsCode(data,req.userId);

    if(pins !== "Pins Created"){
        res.status(404).json({message: "User Already has Pins"})
        return;
    }
    
    res.status(201).json({message: "Pin Created"});
    return;
}
export const set_secretQuestions = async (req: Request, res:Response)=>{
    const data:ISecretQuestions = req.body;

    // Creating Secret Questions
    const secretQTS = await create_SecretQuestions(data,req.userId);

    if(secretQTS !== "Questions created"){
        res.status(404).json({message: "User already has Secret questions"})
        return;
    }

    res.status(201).json({message: "Questions Created"});
    return;
}