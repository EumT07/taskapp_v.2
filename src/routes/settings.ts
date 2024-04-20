import { Router, Request, Response } from "express";
import { userUpdate,
    creatingPassToken,
    creatingSecretQtsToken,
    changepassword,
    changeSecretQts
} from "../controllers/settings";
import { verify_userToken,
    verify_changepasstoken,
    verify_changesecrettoken
} from "../middlewares/verify.token";
import {checkUsername,
    check_password,
    check_securityQuestions
} from "../middlewares/settings";
import {check_pincode} from "../middlewares/secutiry.methods";


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
    .post("/pinchangepass",verify_userToken,check_pincode,creatingPassToken ,(req:Request,res: Response)=>{
        res.status(200).json({message: "User Authenticated: Change password"})
    })

    //Chack Pincode to change Secret Questions
    .post("/pinchangesecretqts",verify_userToken,check_pincode,creatingSecretQtsToken,(req:Request, res:Response)=>{
        res.status(200).json({message: "User Authenticated: Change Secrete-qts"})
    })



//Change Pincode by mail-token
route
    .get("/changepincode/:token")
    .post("changepincode")


// Change Password
route
    .get("/changepassword", verify_changepasstoken,(req,res)=>{
        res.status(202).json({message: "Change Password Page"})
    })
    .post("/changepassword",check_password ,changepassword)



// Change Security Questions
route
    .get("/changesecretquestions", verify_changesecrettoken,(req, res)=>{
        res.status(202).json({message: "Change Secret Questions Page"})
    })
    .post("/changesecretquestions",check_securityQuestions, changeSecretQts)

//Reset Or delete account
route
    .get("/resetaccount/:id")
    .get("/deleteaccount/:id")


export default route;