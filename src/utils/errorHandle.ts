import { Response } from "express";
import "colors"

export const handleErrorHttp = (res:Response, message:string, code:number = 400)=>{
    // return `Status Code: ${code}\nMessage: ${message}`
    console.log(`Status Code: ${code}\nMessage: ${message}`.bgRed);
    
};
export const handleErrorServer =  (title:string ,message?:string, code:number = 500)=>{
    // return `Status Code: ${code}\n${title}\nMessage: ${message}`
    console.log(`Status Code: ${code}\n${title}\nMessage: ${message}`.bgRed);
    
};