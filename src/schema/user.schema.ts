import Joi, { options } from "joi";

//REgex
const email_regex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';


/**
* PAssword
* At least One Upper Letter.
* At least One Lower letter.
* At least one number or special character.
* At least with a minimum of 8 characters.
**/
const password = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;


export const userValidator = Joi.object({
   username: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),

    email: Joi.string()
        .email()
        .pattern(new RegExp(email_regex)),

    password: Joi.string()
        .pattern(new RegExp(password)),
        
    confirmPassword: Joi.ref("password")

});

export const emailValidator = Joi.object({
    email: Joi.string()
        .email()
        .pattern(new RegExp(email_regex)),
    password: Joi.string()
        .pattern(new RegExp(password)),
})

