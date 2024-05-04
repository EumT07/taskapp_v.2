import { Router, Request, Response, NextFunction } from "express";
import { set_pinCode, set_secretQuestions } from "../components/securityMethods/controllers";
import { check_pincode, check_securityQuestions } from "../components/securityMethods/middlewares";
import { verify_userToken } from "../middlewares/verify.token";


const route = Router();

/**
 * Endpoint Authentication: Pin Code
 */
route
    .get("/pincode",verify_userToken,(req,res)=>{
        res.status(200)
            .json({message:"Get: Pin Code Page"});
    })
    .post("/pincode",verify_userToken ,check_pincode ,set_pinCode)
/**
 * Endpoint Authentication: secrete Questions
 */
route
    .get("/secretquestions",verify_userToken,(req,res)=>{
        res.status(200)
            .json({message:"Get: secretquestions Page"});
    })
    .post("/secretquestions", verify_userToken ,check_securityQuestions,set_secretQuestions )




export default route;