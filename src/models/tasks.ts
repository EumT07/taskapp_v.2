import { Tasks } from "interfaces/models";
import { Schema, model } from "mongoose";


const taskSchema = new Schema<Tasks>({
    title: String,
    description: String,
    categoryId: {type: Schema.Types.ObjectId,ref: "Category"},
    priority: String,
    status: {type: Boolean, default:false},
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    month: String,
    dateLine:{type: String, default: null}
});

export default model("Task", taskSchema);