import { Router, Request, Response } from "express";
import { verify_token } from "../middlewares/verify.token";

const route = Router();

/**
 * Endpoint: home
 */
route
    .get("/", (req:Request,res:Response)=>{
        res.status(200).json({
            message:"Hello from Home"
        })
    })
/**
 * Endpoint: home
 */
route
    .get("/dashboard", verify_token, (req:Request,res:Response)=>{
        res.status(200).json({
            message:"Hello from dashboard"
        })
    })
/**
 * Endpoint: Profile
 */
route
    .get("/profile",verify_token, (req:Request,res:Response)=>{
        res.status(200).json({
            message:"Hello from profile"
        })
    })
/**
 * Endpoint: About
 */
route
    .get("/about",verify_token, (req,res)=>{
        res.status(200).json({
            message:"Hello from about"
        })
    })
/**
 * Endpoint: Graphics
 */
route
    .get("/graphics",verify_token, (req,res)=>{
        res.status(200).json({
            message:"Hello from graphics"
        })
    })
/**
 * Endpoint: feedback
 */
route
    .get("/feedback",verify_token, (req,res)=>{
        res.status(200).json({
            message:"Hello from feedback"
        })
    })



export default route;