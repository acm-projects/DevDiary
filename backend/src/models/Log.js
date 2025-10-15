import mongoose from "mongoose";


// 1. Create a schema
// 2. Create a model

const logSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        tags: {
            type: [{ type: String }],
            required: false
        },
        summary: { 
            type: String,
            required: false
        },
        explanation: { 
            type: String,
            required: false
        },
        similar_logs: { 
            type: [{ type: String }],
            required: false
        },
        embedding: { 
            type: [Number],
            required: false, 
            default: []
        }

    },
    { timestamps: true } // createdAt, updatedAt
);

// 2. Create a model
const Log = mongoose.model("Log", logSchema);

export default Log;
