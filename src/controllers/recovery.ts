import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { generateToken, verifyToken } from "../utils/jsonwebtoken";
import {updatePassword,verify_Pincodes, verify_answers as verify_answers} from "../services/recovery";
import { IJwtPayload } from "../interfaces/models";


//Dot-env
dotenv.config();
const cookie_Recovery = process.env.cookie_Recovery as string;
const cookie_ResetPassword = process.env.cookie_ResetPassword as string;


export const search =  (req: Request, res: Response)=>{

    //Service Get token
    const token = generateToken(req.userId);

    //Create new Cookies to recovery password
    res.cookie(cookie_Recovery,token,{
        maxAge: 750 * 1000, //7 minutes
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    //Message Notification

    // Response
    res.status(201).json({message: "Search: ready"})
}

export const compare_PinCode = async (req: Request, res: Response, next: NextFunction)=>{
    //get data
    const data = req.body;
    const id = req.userId;


    //Services: Verify codes in order to get access
    const pins = await verify_Pincodes(id,data);
    
    //verify?
    if(pins === "Invalid") return res.status(404).json({message:"Pins are Invalid"});

    //Delete Previous Cookies
    res.clearCookie(cookie_Recovery);
    //Create a new one
    const newToken = generateToken(id);

    res.cookie(cookie_ResetPassword,newToken,{
        maxAge: 750 * 1000, //7 minutes
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    //Response
    res.status(201).json({message: "Pins code are correct"});
}

export const compare_answers = async (req: Request, res: Response, next: NextFunction)=>{
    //get data
    const data = req.body;
    const id = req.userId;

    //Services: Verify answer in order to get access -> reset password
    const answers = await verify_answers(id,data);

    //verify?
    if(answers === "Invalid") return res.status(404).json({message:"Answers are Invalid"});

    //Delete Previous Cookies
    res.clearCookie(cookie_Recovery);
    //Create a new one
    const newToken = generateToken(id);

    res.cookie(cookie_ResetPassword,newToken,{
        maxAge: 750 * 1000, //7 minutes
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    //Response
    res.status(201).json({message: "Pins code are correct"});

}

export const resetPassword = async (req: Request, res: Response)=>{
    //get data
    const {password, confirmPassword} = req.body;
    const id = req.userId;

    
    //Service: change password
    const response = await updatePassword(id,password,confirmPassword);

    if (response === "Invalid"){
        return res.status(404).json({message: "Password are Different"});
    }

    //Message Notificacion

    //Response
    res.status(201).json({message: "Password have been reset"})
}