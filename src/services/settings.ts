import { IUser,ISecretQuestions } from "../interfaces/models";
import User from "../models/user";
import secretQuestions from "../models/secretQuestions";
import { handleErrorServer } from "../utils/errorHandle";
import { encrypt, secretAnswer_encrypt } from "../utils/bycrpt";


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

export const updatePassword = async (id:string, password:string, confirmPassword:string)=>{
    try {
        //
        if(password !== confirmPassword) return "Invalid";

        //encrypt password
        const passwordHashed = await encrypt(password);

        //Updating password
        await User.findOneAndUpdate({_id: id},{password: passwordHashed});

        return;  
    } catch (error) {
        const title = "Services settings ChangePassword: change password Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}

export const updateSecretQts = async (userId:string,data:ISecretQuestions) => {
    try {
        const {
            questionA,
            questionB,
            questionC,
        } = data;

        //Encrypting Answers
        const answer1Hashed1 = await secretAnswer_encrypt(questionA.answer);
        const answer2Hashed2 = await secretAnswer_encrypt(questionB.answer);
        const answer3Hashed3 = await secretAnswer_encrypt(questionC.answer);

        //Creating  new Secret Qts
        const newSecretQts = {
            questionA: {
                question: questionA.question.toLowerCase().trim(),
                answer: answer1Hashed1,
            },
            questionB: {
                question: questionB.question.toLowerCase().trim(),
                answer: answer2Hashed2,
            },
            questionC: {
                question: questionC.question.toLowerCase().trim(),
                answer: answer3Hashed3,
            }
        }

        //Updating data
        await secretQuestions.findOneAndUpdate({user: userId},newSecretQts)

        return "Questions changed";

    } catch (error) {
        
    }
}