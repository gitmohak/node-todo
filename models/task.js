import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const Tasks = new mongoose.model("tasks", tasksSchema);