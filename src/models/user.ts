import {Schema,model}from "mongoose";
import {User} from "../interfaces/models";

const userSchema = new Schema<User>({
    username:{type: String, unique: true},
    name: String,
    lastname: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    country: String,
    gender: String,
    roles: [{type:Schema.Types.ObjectId,ref: "Role"}],
    taskHigh: Number,
    taskMiddle: Number,
    taskLow: Number,
    imgPath: String
},
{
    timestamps: true,
    versionKey: true
});


export default model("User", userSchema);