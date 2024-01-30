import {hash, compare, genSalt} from "bcryptjs";

export const encrypt = async (password:string)=>{
    const salt = await genSalt(12);
    const passwordHased = hash(password,salt);
    return passwordHased;
}

export const checkEncrypt = async (password:string, passwordToCompare:string)=>{
    const result = compare(password,passwordToCompare);
    return result;
}

