import { SecretQuestions } from "interfaces/models";
import { Schema, model } from "mongoose";


const secretQuestionsSchema = new Schema<SecretQuestions>({
    question1: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true
    },
    question2: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    question3: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: true
    },
    userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
    }
});

export default model("SecretQuestions", secretQuestionsSchema);