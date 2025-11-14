import mongoose from 'mongoose';

// A sub-schema to hold the author info
const AuthorSchema = new mongoose.Schema({
    initials: { type: String, default: 'N/A' },
    name: { type: String, default: 'No Author' }
}, { _id: false });

// Dynamic section schema: each section has a type and content
const DynamicSectionSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true,
        enum: ['error', 'code', 'solution', 'resources', 'comments', 'heading', 'text', 'list']
    },
    content: { 
        type: String, 
        default: '' 
    },
    order: { 
        type: Number, 
        required: true 
    }
}, { _id: false });

const LogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true
        },
        project: {
            type: String,
            required: [true, 'Please add a project name'],
            trim: true
        },
        status: {
            type: String,
            enum: ['In Progress', 'Completed', 'On Hold'],
            default: 'In Progress'
        },
        type: {
            type: String,
            enum: ['Feature', 'Bug', 'Refactor', 'Testing'],
            default: 'Bug'
        },
        tags: {
            type: [String],
            default: []
        },
        sections: {
            type: [DynamicSectionSchema],
            default: []
        },
        // old sections structure (deleted after migration)
        legacySections: {
            type: mongoose.Schema.Types.Mixed,
            required: false
        },
        author: {
            type: AuthorSchema, 
            default: () => ({})
        },
        embedding: { 
            type: [Number],
            required: false, 
            default: undefined
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
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        },
    },
    { timestamps: true }
);

const Log = mongoose.model("Log", LogSchema);

export default Log;