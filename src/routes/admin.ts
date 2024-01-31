import { Router } from "express";
import { admin_LogIn, close_adminLogOut } from "../controllers/admin";
import {check_adminSignIn} from "../middlewares/admin";


const route = Router();

/**
 * Endpoint: admin session
 */

route
    .get("/login",(req,res)=>{
        res.status(200)
            .json({message:"Get: Sign Up Page"});
    })
    .post("/login", check_adminSignIn, admin_LogIn)
    .get("/logout", close_adminLogOut)



export default route;