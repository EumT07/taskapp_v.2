import dotenv from "dotenv";
import User from "../models/user";
import { IPincode } from "../interfaces/models";
import Pincode from "../models/pincode";
import { handleErrorServer } from "../utils/errorHandle";
import {encrypt, check_pinEncrypt} from "../utils/bycrpt";


//Dot-env
dotenv.config();
const cookie_Recovery = process.env.cookie_Recovery as string;


export const search_username = async (username:string)=>{
    try {
       
        const user = await User.findOne({username: username})
        
        if(!user){
            return "Not Found"
        }

        return user.id;
    } catch (error) {
        const title = "Services Finding User: search_username Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }

}

export const search_email = async (email:string)=>{
    try {
    
        const user = await User.findOne({email: email})


        if(!user){
            return "Not Found"
        }

        return user.id;
    } catch (error) {
        const title = "Services Finding User: search_username Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }

}


export const verify_Pincodes = async (id:string,data:IPincode) => {
    try {
        
        //get data From form
        const {pin1,pin2,pin3,pin4,pin5,pin6} = data;
        const pinListA = [pin1,pin2,pin3,pin4,pin5,pin6]


        //Find pins from user to compare
        const pinUser = await Pincode.findOne({userId:id});

        const pinListB = [
            pinUser?.pin1 as string,
            pinUser?.pin2 as string,
            pinUser?.pin3 as string,
            pinUser?.pin4 as string,
            pinUser?.pin5 as string,
            pinUser?.pin6 as string
        ];

        // Compare result
        let pinVerify: boolean = false;

        for(let i = 0; i < pinListB.length ; i++){
            const value = await check_pinEncrypt(pinListA[i],pinListB[i])
            if(value){
                pinVerify = true;
                continue;
            }else{
                pinVerify = false;
                break;
            }
        }
        
        if(!pinVerify){
            return "Invalid";
        }

        return "Ok";
        
    } catch (error) {
        const title = "Services verify_PinCodes: Verify PinsCore Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}

export const verify_SecretQuestions = async (id:string,data:IPincode)=>{

}

export const updatePassword = async (id:string, password:string, confirmPassword:string)=>{
    try {
        //
        if(password !== confirmPassword) return "Invalid";

        //encrypt password
        const passwordHashed = encrypt(password);

        //Updating password
        await User.findOneAndUpdate({_id: id},{password: passwordHashed});

        return;  
    } catch (error) {
        const title = "Services updatePassword: Update password Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}
