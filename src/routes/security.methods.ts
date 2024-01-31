import { Router } from "express";
import { set_pinCode } from "../controllers/security.methods";
import { check_pincode } from "../middlewares/secutiry.methods";


const route = Router();

/**
 * Endpoint Authentication: Pin Code
 */
route
    .get("/pincode",(req,res)=>{
        res.status(200)
            .json({message:"Get: Pin Code Page"});
    })
    .post("/pincode", check_pincode ,set_pinCode)
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




export default route;