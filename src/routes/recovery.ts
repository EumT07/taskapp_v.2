import { Router } from "express";
import { verify_recoveryToken, verify_resetPasswordToken } from "../middlewares/verify.token";
import { search, resetPassword, compare_PinCode, compare_answers } from "../controllers/recovery";
import { check_Search, check_password } from "../middlewares/recovery";
import { check_pincode, check_securityQuestions, check_answers } from "../middlewares/secutiry.methods";


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
    .post("/pincode",check_pincode, verify_recoveryToken ,compare_PinCode)


/**
 * Endoint: Secret Questions
 */
route
    .get("/secretquestions",verify_recoveryToken,(req,res)=>{
        res.status(200).json({message:"Get: Secret Questions"})
    })
    .post("/secretquestions",check_answers,verify_recoveryToken, compare_answers)

/**
 * Endoint: Email nodemailer
 */
route
    .get("/email",(req,res)=>{
        res.status(200).json({message:"Get: Email "})
    })


//Recovery password 

/**
 * Endpoint: 
 */
route
    .get("/resetpassword",verify_resetPasswordToken,(req,res)=>{
        res.status(200).json({message:"Get: Reset Password"})
    })
    .post("/resetpassword", check_password,verify_resetPasswordToken ,resetPassword)

/**
 * Endopint: 
 */
route
    .get("/resetpassword/:token",verify_resetPasswordToken,(req,res)=>{
        res.status(200).json({message:"Get: Reset Password by token"})
    })
    .post("/resetpassword", check_password, verify_resetPasswordToken ,resetPassword)




export default route;