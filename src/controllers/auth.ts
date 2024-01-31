import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { createUser, findUser } from "../services/auth";
import { IUser } from "../interfaces/models";
import { token } from "morgan";
import { handleErrorHttp } from "../utils/errorHandle";

//Enviroment Variables
dotenv.config();
//Cookie Secret
const cookie_User = process.env.cookie_User as string;


/**
 * Users
 */

export const signUp = async (req: Request, res: Response)=>{
    const data:IUser = req.body;

    //Registry User
    const token = await createUser(data);

    //Set Cookies
    res.cookie(cookie_User,token,{
        maxAge: 3600 * 1000, // 1h
        secure: true,
        httpOnly: true,
        sameSite: "lax"
    });
    
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

    //Set Cookies
    res.cookie(cookie_User,token,{
        maxAge: 3600 * 1000, // 1h
        secure: true,
        httpOnly: true,
        sameSite: "lax"
    });

    //message Notification


    //Response
    res.status(201).json({message: "Valid User"})
}
export const close_userLogOut = async (req: Request, res: Response)=>{
    try {
        res.clearCookie(cookie_User);
        res.status(200)
            .json({message:"Get: Logout"});   
    } catch (error) {
        const title = "LogOut User: Error";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

/**
 * Admin
 */


