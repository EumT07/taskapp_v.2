import { IRoles } from "../interfaces/models";
import { Schema, model } from "mongoose";


const rolesSchema = new Schema<IRoles>({
    name: String,
},{
    versionKey: false,
});

export default model("Role", rolesSchema);