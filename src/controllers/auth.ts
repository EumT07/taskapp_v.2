import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { createUser, findUser } from "../services/auth";
import { IUser } from "../interfaces/models";
import { token } from "morgan";


//Enviroment Variables
dotenv.config();


/**
 * Users
 */

export const signUp = async (req: Request, res: Response)=>{
    const data:IUser = req.body;

    //Registry User
    const token = await createUser(data);

    //Set header
    res.header("auth-token",token)
    
    //Message Notification

    // Response
    res.status(201).json({message: "User Created Successfully"})
}
export const signIn = async (req: Request, res: Response)=>{
    const data:IUser = req.body;

    //Find User
    const token = await findUser(data);

    if(token === "Password Incorrect"){
        res.status(404).json({message: "Wrong Pasword"})
    }

    //Set header
    res.header("auth-token", token)

    //message Notification


    //Response
    res.status(201).json({message: "Valid User"})
}
export const close_userLogOut = async (req: Request, res: Response)=>{

}

/**
 * Admin
 */


export const admin_LogIn = async (req: Request, res: Response)=>{

}
export const close_adminLogOut = async (req: Request, res: Response)=>{

}