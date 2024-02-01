import { Router, Request, Response, NextFunction } from "express";
import { set_pinCode, set_secretQuestions } from "../controllers/security.methods";
import { check_pincode, check_securityQuestions } from "../middlewares/secutiry.methods";
import { verify_token } from "../middlewares/verify.token";


const route = Router();

/**
 * Endpoint Authentication: Pin Code
 */
route
    .get("/pincode",verify_token,(req,res)=>{
        res.status(200)
            .json({message:"Get: Pin Code Page"});
    })
    .post("/pincode",verify_token ,check_pincode ,set_pinCode)
/**
 * Endpoint Authentication: secrete Questions
 */
route
    .get("/secretquestions",verify_token,(req,res)=>{
        res.status(200)
            .json({message:"Get: secretquestions Page"});
    })
    .post("/secretquestions", verify_token ,check_securityQuestions,set_secretQuestions )




export default route;