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

//User Vaidator Sign out
export const userValidator = Joi.object({
   username: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),

    email: Joi.string()
        .email()
        .required()
        .pattern(new RegExp(email_regex)),

    password: Joi.string()
        .required()
        .pattern(new RegExp(password)),
        
    confirmPassword: Joi.ref("password")

});
//User Vaidator Sign In
export const user_emailValidator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .pattern(new RegExp(email_regex)),
    password: Joi.string()
        .required()
        .pattern(new RegExp(password)),
});
//Admin Vaidator Sign In
export const admin_emailValidator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .pattern(new RegExp(email_regex)),
    password: Joi.string()
        .required()
        .pattern(new RegExp(password)),
});


//Security methods
export const pin_validator = Joi.object({
    pin1: Joi.string()
        .min(1)
        .max(1)
        .required(),
    pin2: Joi.string()
        .min(1)
        .max(1)
        .required(),
    pin3: Joi.string()
        .min(1)
        .max(1)
        .required(),
    pin4: Joi.string()
        .min(1)
        .max(1)
        .required(),
    pin5: Joi.string()
        .min(1)
        .max(1)
        .required(),
    pin6: Joi.string()
        .min(1)
        .max(1)
        .required(),
})

export const secretQts_validator = Joi.object({
    question1: Joi.string()
        .required(),
    answer1: Joi.string()
        .required(),
    question2: Joi.string()
        .required(),
    answer2: Joi.string()
        .required(),
    question3: Joi.string()
        .required(),
    answer3: Joi.string()
        .required(),
    question4: Joi.string()
        .required(),
    answer4: Joi.string()
        .required(),
    question5: Joi.string()
        .required(),
    answer5: Joi.string()
        .required(),
    question6: Joi.string()
        .required(),
    answer6: Joi.string()
        .required(),
})

//Recovery

//email
export const email_validator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .pattern(new RegExp(email_regex)),
});

//Password
export const password_validator = Joi.object({
    password: Joi.string()
        .required()
        .pattern(new RegExp(password)),
        
    confirmPassword: Joi.ref("password")
})


