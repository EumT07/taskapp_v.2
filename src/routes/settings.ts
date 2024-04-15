import { Router, Request, Response } from "express";
import { userUpdate, creatingPassToken, creatingSecretQts } from "../controllers/settings";
import { verify_userToken } from "../middlewares/verify.token";
import {checkUsername} from "../middlewares/settings"

const route = Router();

//Users info
route
    .get("/profile", verify_userToken,(req,res)=>{
        res.status(202).json({message: "Hello from Settings:Profile"})
    })
    .post("/updateprofile",[verify_userToken, checkUsername], userUpdate)

// Check Pin-code
route
    .post("/pincodemail")

    //Check Pincode to change password
    .post("/pinchangepass", creatingPassToken ,(req:Request,res: Response)=>{
        res.status(200).redirect("/api/v2/settings/changepassword")
    })

    //Chack Pincode to change Secret Questions
    .post("pinchangesecretqts", creatingSecretQts,(req:Request, res:Response)=>{
        res.status(200).redirect("/api/v2/settings/changesecretquestions")
    })



//Change Pincode by mail-token
route
    .get("/changepincode/:token")
    .post("changepincode")


// change Password
route
    .get("/changepassword", (req,res)=>{

    })
    .post("/changepassword")



// Change Security Questions
route
    .get("/changesecretquestions", (req, res)=>{

    })
    .post("/changesecretquestions")

//Reset Or delete account
route
    .get("/resetaccount/:id")
    .get("/deleteaccount/:id")


export default route;