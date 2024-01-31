import { Router } from "express";
import { signUp,signIn,close_userLogOut } from "../controllers/auth";
import {checkUser_SignUP,checkUser_SignIn, } from "../middlewares/auth";


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
 * Endpoint Authentication: Close user session
 */
route
    .get("/logout",close_userLogOut);



export default route;