import { Router } from "express";
import { admin_LogIn, close_adminLogOut } from "../components/authentication/admin/controllers";
import {check_adminSignIn} from "../components/authentication/admin/middleware";
import {verify_adminToken} from "../middlewares/verify.token"


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
    .get("/logout", verify_adminToken,close_adminLogOut)



export default route;