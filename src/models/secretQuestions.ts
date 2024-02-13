import { ISecretQuestions } from "../interfaces/models";
import { Schema, model } from "mongoose";


const secretQuestionsSchema = new Schema<ISecretQuestions>({
    questionA: {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true
        }
    },
    questionB: {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true
        }
    },
    questionC: {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true
        }
    },
    userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            unique: true
    }
});

export default model("SecretQuestions", secretQuestionsSchema);