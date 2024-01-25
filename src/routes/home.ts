import { Router } from "express";

const route = Router();

/**
 * Endpoint: home
 */
route
    .get("/", (req,res)=>{
        res.status(200).json({
            message:"Hello from Home"
        })
    })
/**
 * Endpoint: Profile
 */
route
    .get("/profile", (req,res)=>{
        res.status(200).json({
            message:"Hello from profile"
        })
    })
/**
 * Endpoint: About
 */
route
    .get("/about", (req,res)=>{
        res.status(200).json({
            message:"Hello from about"
        })
    })
/**
 * Endpoint: Graphics
 */
route
    .get("/graphics", (req,res)=>{
        res.status(200).json({
            message:"Hello from graphics"
        })
    })
/**
 * Endpoint: feedback
 */
route
    .get("/feedback", (req,res)=>{
        res.status(200).json({
            message:"Hello from feedback"
        })
    })



export default route;