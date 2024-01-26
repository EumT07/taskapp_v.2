import User from "../models/user";
import Role from "../models/roles";
import { IUser } from "interfaces/models";
import { handleErrorServer } from "../utils/errorHandle";
import {encrypt} from "../utils/bycrpt";
import util from "node:util";
import dotenv from "dotenv";

dotenv.config();
//time sleep
const sleep = util.promisify(setTimeout);

export const adminRole = async ()=>{
    try {
        const email = process.env.admin_email as string;
        const password = process.env.admin_password as string;
        
        //Sleep 1minute waiting for roles to be created
        await sleep(60000) //30 s

        const admin = await User.findOne({email: email});

        //Return if admin was created.
        if(admin) return;
        

        //Get admin Roles
        const getRoles = await Role.find({name: {$in: ["admin","user"]}});

        //Inserting Admin data
        const newAdmin: IUser = await User.create({
            email: email,
            password: await encrypt(password),
            roles: getRoles
        });
        console.log("Admin was created successfully".bgGreen,newAdmin);
    } catch (error) {
        const title = "Internal Error\nAdmin ctrl: adminRole";
        const message = `ErrorMessage: ${error}`;
        handleErrorServer(title,message);
    }
}

/**
 *
1. Non-Null Assertion Operator (!):

Assert that admin_password will always be a string: 

const password = process.env.admin_password!;

2. as string: Type Assertion

Informs the TypeScript compiler to treat the value as a string type, even if it might be undefined at runtime.
Key Points:

Environment variables offer a way to store sensitive information outside of your code.
TypeScript's type system aids in ensuring type safety.
Type assertions can be used to override the inferred type, but use them with caution.
It's crucial to validate environment variables to guarantee their presence and correct format.
Considerations:

Type Assertions vs. Runtime Checks: Type assertions are primarily for the compiler, not for runtime guarantees. Employ additional checks at runtime to prevent potential errors if a variable is unexpectedly undefined.
Best Practices: Favor techniques like optional chaining (?.), the nullish coalescing operator (??), or conditional checks to handle potentially undefined values more safely and gracefully.
 */
