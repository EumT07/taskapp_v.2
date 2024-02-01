import { IPincode, ISecretQuestions } from "../interfaces/models";
import PIN from "../models/pincode";
import secretQuestions from "../models/secretQuestions";
import { handleErrorServer } from "../utils/errorHandle";
import { pin_encrypt,secretAnswer_encrypt } from "../utils/bycrpt";


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

        //Check user id
        const user = await PIN.findOne({userId: id});

        if(user) return;


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
        const title = "Services Error: Security Methods - Create Pin code";
        const message = `${error}`;
        handleErrorServer(title,message)
    }

}

export const create_SecretQuestions = async (data:ISecretQuestions,id:string)=>{
   try {
        const {
            question1,
            answer1,
            question2,
            answer2,
            question3,
            answer3,
        } = data;

        //Encryptin answers
        const answer1Hashed1 = await secretAnswer_encrypt(answer1);
        const answer2Hashed2 = await secretAnswer_encrypt(answer2);
        const answer3Hashed3 = await secretAnswer_encrypt(answer3);

        //Check user id
        const user = await secretQuestions.findOne({userId: id});

        if(user) return;

        //Creating data
        await secretQuestions.create({
            question1: question1.toLowerCase(),
            answer1: answer1Hashed1,
            question2: question2.toLowerCase(),
            answer2: answer2Hashed2,
            question3: question3.toLowerCase(),
            answer3: answer3Hashed3,
            userId: id
        });


    return "Questions created";
    
   } catch (error) {
        const title = "Services Error: Security Methods - Create Secret Questions";
        const message = `${error}`;
        handleErrorServer(title,message)
   }
}