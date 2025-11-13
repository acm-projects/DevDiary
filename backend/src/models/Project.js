import mongoose from "mongoose";
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
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log'}],
            required: false
        },
        tags: {
            type: [String],
            required: false,
        },
        emoji: {
            type: String,
            required: true,
        },
        image: { 
            type: {
                data: Buffer,
                contentType: String,
            },
            required: false,
        },
    },
    { timestamps: true } // createdAt, updatedAt
);
// 2. Create a model
const Project = mongoose.model("Project", projectSchema);
export default Project;