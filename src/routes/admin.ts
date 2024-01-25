import { Router } from "express";


const route = Router();

/**
 * Endpoint: admin session
 */

route
    .get("/login",(req,res)=>{
        res.status(200)
            .json({message:"Get: Sign Up Page"});
    })
    .post("/login", (req, res)=>{
        res.status(200)
            .json({message:"Post: Sign Up Page"});
    })
    .get("/logout",(req, res)=>{
        res.status(200)
            .json({message:"Get: Logout Page"});
    })



export default route;