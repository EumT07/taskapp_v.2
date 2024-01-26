export interface IUser {
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

export interface ICategory {
    categoryName: string,
    userId?: string
}

export interface IPincode {
    pin1: string,
    pin2: string,
    pin3: string,
    pin4: string,
    pin5: string,
    pin6: string,
    userId?: string
}

export interface IImage{
    filename: string,
    path: string,
    originalname: string,
    mimetype: string,
    size: number,
    created_at: Date,
    userId?: string,
}

export interface IRoles{
    name: String
}

export interface ISecretQuestions{
    question1: string,
    answer1: string,
    question2: string,
    answer2: string,
    question3: string,
    answer3: string,
    userId?: string
}

export interface ITasks{
    title: string,
    description: string,
    categoryId?: string,
    priority: string,
    status: boolean,
    userId?: string
    month: string,
    dateLine: string,
}