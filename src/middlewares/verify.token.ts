import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { IJwtPayload } from "../interfaces/models";
import { handleErrorHttp } from "../utils/errorHandle";


dotenv.config();
const cookie_User = process.env.cookie_User as string;
const cookie_Admin = process.env.cookie_Admin as string;
const cookie_Recovery = process.env.cookie_Recovery as string;
const cookie_ResetPassword = process.env.cookie_resetPassword as string;
const cookie_passtoken = process.env.cookie_passtoken as string;
const cookie_secrettoken = process.env.cookie_secrettoken as string;


// User
export const verify_userToken = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_User];
        
        if(!token){
            res.status(404).json({message: "Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
    } catch (error) {
        const title = "Middleware Error: VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

// Admin
export const verify_adminToken = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_Admin];
        
        if(!token){
            res.status(404).json({message: "Admin Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
    } catch (error) {
        const title = "Middleware Error: Admin VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

//Recovery
export const verify_recoveryToken = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_Recovery];
        
        if(!token){
            res.status(404).json({message: "RecoveryToken Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
    } catch (error) {
        const title = "Middleware Error: Recovery VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

//Reset Password
export const verify_resetPasswordToken = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_ResetPassword];
        
        if(!token){
            res.status(404).json({message: "Reset Password Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
    } catch (error) {
        const title = "Middleware Error: Reset Password VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}

//Settings
export const verify_changepasstoken = (req: Request, res: Response, next: NextFunction) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_passtoken];
        
        if(!token){
            res.status(404).json({message: "Change Password Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;
        console.log(user.id);
        
        next();
        
    } catch (error) {
        const title = "Middleware Error: Change Password VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}
export const verify_changesecrettoken = (req: Request, res: Response, next: NextFunction) =>{
    try {
        //get token
        const token: string = req.cookies[cookie_secrettoken];
        
        if(!token){
            res.status(404).json({message: "Change Secret-qts Token Not provided"})
            return;
        }

        //Verify Token
        const user = verifyToken(token) as IJwtPayload;

        //token is correct
        if(!user){
            res.status(404).json({message: "Token Invalid"})
        }
       
        //Verify Token and Get token Id
        req.userId = user.id;

        next();
        
    } catch (error) {
        const title = "Middleware Error: Change Secret-qts Token VerifyToken ";
        const message = `${error}`;
        handleErrorHttp(res,title,message);
    }
}


