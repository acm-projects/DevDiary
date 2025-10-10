import mongoose from "mongoose";


// 1. Create a schema
// 2. Create a model

const searchSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        logs: {
            type: [{ type: Log }],
            required: false
        }
    },
    { timestamps: true } // createdAt, updatedAt
);

// 2. Create a model
const Search = mongoose.model("Search", searchSchema);

export default Search;