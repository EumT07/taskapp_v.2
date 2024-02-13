import { Document } from "mongoose";
import { Request, Response, NextFunction } from "express";

export interface IUser extends Document {
    username: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    country: string,
    gender:string,
    roles: string[],
    taskHigh: number,
    taskMiddle: number,
    taskLow: number,
    totalTasks: number,
    imgPath: string
}

export interface ICategory extends Document  {
    categoryName: string,
    userId?: string
}

export interface IPincode extends Document  {
    pin1: string,
    pin2: string,
    pin3: string,
    pin4: string,
    pin5: string,
    pin6: string,
    userId?: string
}

export interface IImage extends Document {
    filename: string,
    path: string,
    originalname: string,
    mimetype: string,
    size: number,
    created_at: Date,
    userId?: string,
}

export interface IRoles extends Document {
    name: String
}

export interface ISecretQuestions extends Document {
    questionA: {
        question: string,
        answer: string,
    },
    questionB: {
        question: string,
        answer: string,
    },
    questionC: {
        question: string,
        answer: string,
    },
    userId?: string
}

export interface ISecret_reecovery extends Document{
    question_position1:{
        question: string,
        answer: string,
    },
    question_position2:{
        question: string,
        answer: string,
    }
}

export interface ITasks extends Document {
    title: string,
    description: string,
    categoryId?: string,
    priority: string,
    status: boolean,
    userId?: string
    month: string,
    dateLine: string,
}
/**
 * JWT 
 */
export interface IJwtPayload {
    id: string,
    iat: number,
    exp: number
}