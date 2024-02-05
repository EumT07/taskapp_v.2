import { Router } from "express";
import { verify_recoveryToken, verify_resetPasswordToken } from "../middlewares/verify.token";
import { search, resetPassword } from "../controllers/recovery";
import { check_Search, check_password } from "../middlewares/recovery";


const route = Router();

/**
 * Endpoint Recovery
 */
route
    .get("/search",(req,res)=>{
        res.status(200).json({message:"Get: Search Page"})
    })
    .post("/search",check_Search ,search)


/**
 * Endpoint Options
 */
route
.get("/options",verify_recoveryToken,(req,res)=>{
    res.status(200).json({message:"Get: options"})
})

/**
 * Endoint: Pin code
 */
route
    .get("/pincode",verify_recoveryToken,(req,res)=>{
        res.status(200).json({message:"Get: Pin Code"})
    })
    .post("/pincode",)


/**
 * Endoint: Secret Questions
 */
route
    .get("/secretquestions",verify_recoveryToken,(req,res)=>{
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
    .get("/resetpassword",verify_resetPasswordToken,(req,res)=>{
        res.status(200).json({message:"Get: Reset Password"})
    })
    .post("/resetpassword", check_password ,resetPassword)

/**
 * Endoint: 
 */
route
    .get("/resetpassword/:token",verify_resetPasswordToken,(req,res)=>{
        res.status(200).json({message:"Get: "})
    })
    .post("/resetpassword", check_password ,resetPassword)




export default route;