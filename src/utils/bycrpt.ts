import {hash, compare, genSalt} from "bcryptjs";


/**
 * Password
 */
export const encrypt = async (password:string)=>{
    const salt = await genSalt(12);
    const passwordHased = hash(password,salt);
    return passwordHased;
}

export const checkEncrypt = async (password:string, passwordToCompare:string)=>{
    const result = compare(password,passwordToCompare);
    return result;
}

/**
 * Pin Code
 */

export const pin_encrypt = async (pin:string)=>{
    const salt = await genSalt(12);
    const pinHashed = hash(pin,salt);
    return pinHashed;
}

export const check_pinEncrypt = async (pin:string, pinToCompare:string)=>{
    const result = compare(pin,pinToCompare);
    return result;
}

/**
 * Secrete Answer
 */

export const secretAnswer_encrypt = async (answer:string)=>{
    const salt = await genSalt(12);
    const answerHashed = hash(answer,salt);
    return answerHashed;
}

export const check_secretAnswerEncrypt = async (answer:string,answerToCompare: string) => {
    const result = compare(answer, answerToCompare);
    return result;
}