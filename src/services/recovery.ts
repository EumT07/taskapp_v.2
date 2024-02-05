import User from "../models/user";
import { IUser } from "../interfaces/models";
import { handleErrorServer } from "../utils/errorHandle";
import {encrypt, checkEncrypt} from "../utils/bycrpt";


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

export const updatePassword = async (id:string, password:string, confirmPassword:string)=>{
    try {


        //encrypt password
        const passwordHashed = encrypt(password);

        const user = User.findOneAndUpdate({_id: id},{password: passwordHashed});
        
    } catch (error) {
        const title = "Services updatePassword: Update password Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}
