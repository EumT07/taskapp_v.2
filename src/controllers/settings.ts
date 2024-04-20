import dotenv from "dotenv"
import {Request, Response, NextFunction} from "express";
import { updateProfile_user, updatePassword, updateSecretQts } from "../services/settings";
import {verify_Pincodes} from "../services/recovery";
import { generateToken } from "../utils/jsonwebtoken";


dotenv.config();
//Cookies names
const cookie_User = process.env.cookie_User as string;
const cookie_passtoken = process.env.cookie_passtoken as string;
const cookie_secrettoken = process.env.cookie_secrettoken as string;


export const userUpdate = async (req: Request, res:Response)=>{
    
    
    //Update User data
    const value = await updateProfile_user(req.userId,req.body);

    if(value === "Updated"){
        res.status(202).json({message: "User was Updated"})
    }
}

export const creatingPassToken = async (req: Request, res:Response) => {
    //get data
    const data = req.body;
    const id = req.userId;
    
    //Services: Verify codes in order to get access
    const pins = await verify_Pincodes(id,data);

    //verify?
    if(pins === "Invalid") return res.status(404).json({message:"Pins are Invalid"});

    
    //Create a new one
    const newToken = generateToken(id);

    res.cookie(cookie_passtoken,newToken,{
        maxAge: 750 * 1000, //7 minutes
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    //Response
    res.status(201).json({message: "Pins code are correct"});
    
}

export const creatingSecretQtsToken = async (req: Request, res:Response) => {
    //get data
    const data = req.body;
    const id = req.userId;

    //Services: Verify codes in order to get access
    const pins = await verify_Pincodes(id,data);

    //verify?
    if(pins === "Invalid") return res.status(404).json({message:"Pins are Invalid"});

    
    //Create a new one
    const newToken = generateToken(id);

    res.cookie(cookie_secrettoken,newToken,{
        maxAge: 750 * 1000, //7 minutes
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    //Response
    res.status(201).json({message: "Pins code are correct"});

}

export const changepassword = async (req: Request, res:Response)=>{
    const {password, confirmPassword} = req.body;
    const id = req.userId;

    //Service: change password
    const response = await updatePassword(id,password,confirmPassword);

    if (response === "Invalid"){
        return res.status(404).json({message: "Password are Different"});
    }
    //Clean cookies
    res.clearCookie(cookie_passtoken);
    //Message Notificacion

    //Response
    res.status(201).json({message: "Password have been changed"})
}

export const changeSecretQts = async (req: Request, res:Response) =>{
    const {data} = req.body;
    const id = req.userId;


    //Services: Change Secret Questions
    const response = await updateSecretQts(id,data);

    if(response !== "Questions changed"){
        return res.status(404).json({message:"Error Changing Secret Questions"});
    }
    
    //Clean Cookies

    //message Notificacion

    //Response
    res.status(201).json({message:"Secret Questions have been changed"})
}