import {hash, compare, genSalt} from "bcryptjs";

export const ecrypt = async (password:string)=>{
    const salt = await genSalt(12);
    const passwordHased = hash(password,salt);
    return passwordHased;
}

export const chechEncrypt = async (password:string, passwordToCompare:string)=>{
    const result = compare(password,passwordToCompare);
    return result;
}

