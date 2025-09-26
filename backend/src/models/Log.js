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
            type: String,
            required: false
        },

    },
    { timestamps: true } // createdAt, updatedAt
);

// 2. Create a model
const Log = mongoose.model("Log", logSchema);

export default Log;
