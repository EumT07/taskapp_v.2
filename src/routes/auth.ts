import { Router } from "express";
import { signUp,signIn } from "../controllers/auth";
import {checkUser_SignUP,checkUser_SignIn} from "../middlewares/auth";


const route = Router();

/**
 * Endpoint Sign UP
 */

route
    .get("/signup",(req,res)=>{
        res.status(200)
            .json({message:"Get: Sign Up Page"});
    })
    .post("/signup", checkUser_SignUP , signUp )

/**
 * Endpoint Sign in
 */
route
    .get("/signin",(req,res)=>{
        res.status(200)
            .json({message:"Get: Sign in Page"});
    })
    .post("/signin",checkUser_SignIn, signIn )

/**
 * Endpoint Authentication: Pin Code
 */
route
    .get("/pincode",(req,res)=>{
        res.status(200)
            .json({message:"Get: Pin Code Page"});
    })
    .post("/pincode", (req, res)=>{
        res.status(200)
            .json({message:"Post: Pin Code Page"});
    })
/**
 * Endpoint Authentication: secrete Questions
 */
route
    .get("/secretquestions",(req,res)=>{
        res.status(200)
            .json({message:"Get: secretquestions Page"});
    })
    .post("/secretquestions", (req, res)=>{
        res.status(200)
            .json({message:"Post: secretquestions Page"});
    })

/**
 * Endpoint Authentication: Close user session
 */
route
    .get("/logout", (req,res)=>{
        res.status(200)
            .json({message:"Get: Logout"});
    });



export default route;