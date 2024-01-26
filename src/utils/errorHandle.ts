import { Response } from "express";
import "colors"

export const handleErrorHttp = (res:Response, message:string, code:number = 400)=>{
    return `Status Code: ${code}\nMessage: ${message}`
};
export const handleErrorServer =  (res:Response, message:string, code:number = 500)=>{
    return `Status Code: ${code}\nMessage: ${message}`
};