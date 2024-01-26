import { IImage } from "../interfaces/models";
import { Schema, model } from "mongoose";


const imageSchema = new Schema<IImage>({
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number,
    created_at: {type: Date, default: Date.now()},
    userId: {type: Schema.Types.ObjectId, ref: "User"}
});

export default model("Image", imageSchema);