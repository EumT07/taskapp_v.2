import { IPincode } from "../interfaces/models";
import { Schema, model } from "mongoose";

const pincodeSchema = new Schema<IPincode>({
    pin1: {type: String, required: true,},
    pin2: {type: String, required: true,},
    pin3: {type: String, required: true,},
    pin4: {type: String, required: true,},
    pin5: {type: String, required: true,},
    pin6: {type: String, required: true,},
    userId: {type: Schema.Types.ObjectId, ref:"User"}
})

export default model("PIN", pincodeSchema);