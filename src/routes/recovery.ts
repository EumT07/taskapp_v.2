import { Router } from "express";


const route = Router();

/**
 * Endpoint Recovery
 */
route
    .get("/search",(req,res)=>{
        res.status(200).json({message:"Get: Search"})
    })
    .post("/seach")


/**
 * Endpoint Options
 */
route
.get("/options",(req,res)=>{
    res.status(200).json({message:"Get: options"})
})

/**
 * Endoint: Pin code
 */
route
    .get("/pincode",(req,res)=>{
        res.status(200).json({message:"Get: Pin Code"})
    })
    .post("/pincode")


/**
 * Endoint: Secret Questions
 */
route
    .get("/secretquestions",(req,res)=>{
        res.status(200).json({message:"Get: Secret Questions"})
    })
    .post("/secretquestions")

/**
 * Endoint: Email nodemailer
 */
route
    .get("/email",(req,res)=>{
        res.status(200).json({message:"Get: Email "})
    })


//Recovery password 

/**
 * Endoint: 
 */
route
    .get("/resetpassword",(req,res)=>{
        res.status(200).json({message:"Get: Reset Password"})
    })
    .post("/resetpassword")

/**
 * Endoint: 
 */
route
    .get("/resetpassword/:token",(req,res)=>{
        res.status(200).json({message:"Get: "})
    })
    .post("/resetpassword")




export default route;