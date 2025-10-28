import mongoose from "mongoose";
import FormData from "form-data";
import Log from "./Log.js";


// 1. Create a schema
// 2. Create a model

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        logs: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
            required: false
        },
        tags: {
            type: [String],
            required: false, 
        },
        FormData: {
            type: Object,
            required: false
        }
    },
    { timestamps: true } // createdAt, updatedAt
);

// 2. Create a model
const Project = mongoose.model("Project", projectSchema);

export default Project;