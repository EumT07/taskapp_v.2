import { Request, Response, NextFunction } from "express";
import { handleErrorServer } from "../utils/errorHandle";
import {encrypt, checkEncrypt} from "../utils/bycrpt";
import { IUser } from "../interfaces/models";
import User from "../models/user";
import Role from "../models/roles";
import { Interface } from "readline";
import { json } from "body-parser";
import { generateToken } from "../utils/jsonwebtoken";




export const createUser = async (data:IUser)=>{
    try {
        const {username,email,password} = data;
     
        //Getting Role
        const role = await Role.find({name: "user"});

        // Create user
        const newUser: IUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: await encrypt(password),
            roles: [role[0]._id]
        });
        
        
        //Create Token
        const token = generateToken(newUser._id);

        return token;
    } catch (error) {
        const title = "Createing User: Error";
        const message = `${error}`;
        handleErrorServer(title,message);
    }
}

export const findUser = async (data:IUser)=>{
    try {
        const {email,password} = data;

        const user = await User.findOne({email: email});
        const passwordHashed = user?.password as string;

        //Check Password
        const password_IsCorrect = await checkEncrypt(password, passwordHashed)

        if(!password_IsCorrect) return "Password Incorrect";
       
        //Create Token
        const token = generateToken(user?._id);

        return token;
    } catch (error) {
        console.log(error);
        
    }
}