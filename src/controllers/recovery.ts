import dotenv from "dotenv";
import { Request, Response } from "express";
import { generateToken } from "../utils/jsonwebtoken";
import {updatePassword} from "../services/recovery";


//Dot-env
dotenv.config();
const cookie_Recovery = process.env.cookie_Recovery as string;


export const search =  (req: Request, res: Response)=>{

    //Service Get token
    const token = generateToken(req.userId);

    //Create new Cookies to recovery password
    res.cookie(cookie_Recovery,token,{
        maxAge: 3600 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    //Message Notification

    // Response
    res.status(201).json({message: "Search: ready"})
}

export const resetPassword = (req: Request, res: Response)=>{
    //get data
    const {password, confirmPassword} = req.body;
    
    //Service: change password
    updatePassword(req.userId,password,confirmPassword)

    //Message Notificacion

    //Response
    res.status(201).json({message: "Password have been reset"})
}