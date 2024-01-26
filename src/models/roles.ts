import { Roles } from "interfaces/models";
import { Schema, model } from "mongoose";


const rolesSchema = new Schema<Roles>({
    name: String,
},{
    versionKey: false
});

export default model("Roles", rolesSchema);