import { Category } from "interfaces/models";
import { Schema, model } from "mongoose";

const categorySchema = new Schema<Category>({
    categoryName: String,
    userId: {type: Schema.Types.ObjectId, ref: "User"}
},
{
    timestamps: true
});

export default model("Category", categorySchema);