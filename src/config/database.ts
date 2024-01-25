import Mongoose from "mongoose";
import dotenv from "dotenv";
import "colors";

//.env
dotenv.config();

const url:string = process.env.mongooseURL || "";

export const startDataBase = async () => {
    try {
        await Mongoose.connect(url);
        console.log("Data Base is running".bgBlue);
    } catch (error) {
        console.log("Error Database".red);
        console.log(`Error Message: ${error}`.red);
    }
}

