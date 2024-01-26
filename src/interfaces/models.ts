export interface User {
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

export interface Category {
    categoryName: string,
    userId?: string
}

export interface Pincode {
    pin1: string,
    pin2: string,
    pin3: string,
    pin4: string,
    pin5: string,
    pin6: string,
    userId?: string
}

export interface Image{
    filename: string,
    path: string,
    originalname: string,
    mimetype: string,
    size: number,
    created_at: Date,
    userId?: string,
}

export interface Roles{
    name: String
}

export interface SecretQuestions{
    question1: string,
    answer1: string,
    question2: string,
    answer2: string,
    question3: string,
    answer3: string,
    userId?: string
}

export interface Tasks{
    title: string,
    description: string,
    categoryId?: string,
    priority: string,
    status: boolean,
    userId?: string
    month: string,
    dateLine: string,
}