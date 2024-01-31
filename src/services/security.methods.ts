import { IPincode } from "../interfaces/models";
import PIN from "../models/pincode";
import { handleErrorServer } from "../utils/errorHandle";
import { pin_encrypt } from "../utils/bycrpt";


export const create_PinsCode = async (data:IPincode,id:string) =>{
    try {
        
        //Get Codes
        const {pin1,pin2,pin3,pin4,pin5,pin6} = data;

        //Encrypting all Pins
        const pin1Hashed = await pin_encrypt(pin1);
        const pin2Hashed = await pin_encrypt(pin2);
        const pin3Hashed = await pin_encrypt(pin3);
        const pin4Hashed = await pin_encrypt(pin4);
        const pin5Hashed = await pin_encrypt(pin5);
        const pin6Hashed = await pin_encrypt(pin6);

        //Creating all pins with user ID
        await PIN.create({
            pin1: pin1Hashed,
            pin2: pin2Hashed,
            pin3: pin3Hashed,
            pin4: pin4Hashed,
            pin5: pin5Hashed,
            pin6: pin6Hashed,
            userId: id
        })

        return "Pins Created";
        
    } catch (error) {
        const title = "Services Error: Security Methods";
        const message = `${error}`;
        handleErrorServer(title,message)
    }

}