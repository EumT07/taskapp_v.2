import { Router } from "express";

const route = Router();

//Home
route
    .get("/", (req,res)=>{
        res.status(200).json({
            message:"Hello from Home"
        })
    })



export default route;