import { Router } from "express";


const route = Router();


//Error Page NOT FOUND
route
    .get("/notfound",(req,res)=>{
        res.status(404).json({message:"Page Not Found"});
    })
    .get("/505",(req,res)=>{
        res.status(505).json({message:"Server Error"});
    })
    .get("/token",(req,res)=>{
        res.status(404).json({message:"Invalid Token"});
    })
    .get("/session",(req,res)=>{
        res.status(404).json({message:"Session finish"});
    })


export default route;