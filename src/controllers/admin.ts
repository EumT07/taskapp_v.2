import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/models";
import { token } from "morgan";
import { handleErrorHttp } from "../utils/errorHandle";
import { check_adminPassword } from "../services/admin";

//Enviroment Variables
dotenv.config();
//Cookie Secret
const cookie_Admin = process.env.cookie_Admin as string;


export const admin_LogIn = async (req: Request, res: Response)=>{
    const data:IUser = req.body;

    //Srervices
    const token = await check_adminPassword(data);


    if(token === "Password Incorrect"){
        res.status(404).json({message: "Wrong Pasword"})
    }

    //Set Cookies
    res.cookie(cookie_Admin,token,{
        maxAge: 3600 * 1000, // 1h
        secure: true,
        httpOnly: true,
        sameSite: "lax"
    })
    //Response
    res.status(201).json({message: "Valid User"})
}

export const close_adminLogOut = async (req: Request, res: Response)=>{
    try {
        res.clearCookie(cookie_Admin);
        res.status(200)
            .json({message:"Get: Logout"});   
    } catch (error) {
        const title = "LogOut Admin: Error";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
} 