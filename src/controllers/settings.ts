import {Request, Response, NextFunction} from "express";
import { updateProfile_user } from "../services/settings";



export const userUpdate = async (req: Request, res:Response)=>{
    
    
    //Update User data
    const value = await updateProfile_user(req.userId,req.body);

    if(value === "Updated"){
        res.status(202).json({message: "User was Updated"})
    }
}

export const creatingPassToken = async (req: Request, res:Response, next:NextFunction) => {

}

export const creatingSecretQts = async (req: Request, res:Response, next:NextFunction) => {

}