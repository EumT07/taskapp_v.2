import dotenv from "dotenv";
import User from "../models/user";
import { IPincode, ISecretQuestions, ISecret_reecovery,IGet_answers } from "../interfaces/models";
import Pincode from "../models/pincode";
import SecretQuestions from "../models/secretQuestions";
import { handleErrorServer } from "../utils/errorHandle";
import {encrypt, check_pinEncrypt, check_secretAnswerEncrypt } from "../utils/bycrpt";
import { string } from "joi";


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
        const pinListA = [pin1,pin2,pin3,pin4,pin5,pin6];

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

export const verify_answers = async (id:string,data:ISecret_reecovery)=>{
    try {
        //Get data
        const {question_position1
            ,question_position2} = data;

        const questions: string[] = [question_position1.question,question_position2.question];
        const answers: string[] = [question_position1.answer,question_position2.answer];

        //Get answers and questions
        const secretQts_data = await SecretQuestions.findOne({userId: id}) as ISecretQuestions;
        const secretQts_data_questions: string[] = [
            secretQts_data?.questionA.question as string,
            secretQts_data?.questionB.question as string,
            secretQts_data?.questionC.question as string
        ]
        const secretQts_data_answers: string[] = [
            secretQts_data?.questionA.answer as string,
            secretQts_data?.questionB.answer as string,
            secretQts_data?.questionC.answer as string,
        ]

      
        const questiongArray = await getCoincidingElements(questions,secretQts_data_questions,secretQts_data,answers);

        
        if(!questiongArray){
            return "Invalid";
        }
        
        return;

    } catch (error) {
        const title = "Services verify_PinCodes: Verify Answers Error";
        const message = `${error}`;
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
        const title = "Services updatePassword: Update password Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}

//By google Bard and updated by me
const getCoincidingElements = async (arrayA: string[], arrayB: string[], secretQts_data: ISecretQuestions,answerPositons: string[])=>{
    //Change string to lower letters
    
    
    const lowerCase_ArrayA = arrayA.map((element:string) => element.toLowerCase());
    const lowerCase_ArrayB = arrayB.map((element:string) => element.toLowerCase());

    //Get all element that are the same
    const coincidingElements: string[] = [];

    //Filtering all items that are iqual and pushing into a new array
    coincidingElements.push(...lowerCase_ArrayA.filter((element:string) => lowerCase_ArrayB.includes(element)));


    //get Questions and answer
    const get_answer: IGet_answers[] = [];

    coincidingElements.forEach((item:string)=>{
        if(item === secretQts_data.questionA.question){
            get_answer.push(secretQts_data.questionA);
        }
        if(item === secretQts_data.questionB.question){
            get_answer.push(secretQts_data.questionB);
        }
        if(item === secretQts_data.questionC.question){
            return get_answer.push(secretQts_data.questionC);
        }
    });

    //Check and comparing answers
    let [verifyAnswer1, verifyAnswer2] = get_answer;
    let [answerPositon1, answerPositon2] = answerPositons;

    //Question position 1
    let answerHashed1 = verifyAnswer1.answer;
    let value1 = await check_secretAnswerEncrypt(answerPositon1,answerHashed1);
    //question position 2
    let answerHashed2 = verifyAnswer2.answer;
    let value2 = await check_secretAnswerEncrypt(answerPositon2,answerHashed2);
    
    if(value1 && value2){
        return true;
    }

    return false;
    
 }