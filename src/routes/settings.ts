import { Router, Request, Response } from "express";

const route = Router();

//Users info
route
    .get("/profile",(req,res)=>{

    })
    .post("/updateprofile", (req,res)=>{

    })

// Check Pin-code
route
    .post("/pincodemail")

    //Check Pincode to change password
    .post("/pinchangepass", (req:Request,res: Response)=>{
        res.status(200).redirect("/api/v2/settings/changepassword")
    })

    //Chack Pincode to change Secret Questions
    .post("pinchangesecretqts",(req:Request, res:Response)=>{
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