import { IUser } from "../interfaces/models";
import User from "../models/user";
import { handleErrorServer } from "../utils/errorHandle";


export const updateProfile_user = async (userId:string,body:IUser)=>{
    try {
        const {name,username,lastname,gender,country} = body;

        const userData = {
            username: username,
            name: name.toLowerCase(),
            lastname: lastname.toLowerCase(),
            gender: gender.toLowerCase(),
            country: country.toLowerCase()
        }
      
        await User.findByIdAndUpdate({_id: userId},userData);

        return "Updated"

    } catch (error) {
        const title = "Internal Error\nSettings Services: Update User";
        const message = `ErrorMessage: ${error}`;
        handleErrorServer(title,message);
    }

}