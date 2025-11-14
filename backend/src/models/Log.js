import mongoose from 'mongoose';

// Define a schema
const SectionSchema = new mongoose.Schema({
    error: { type: String, default: '' },
    code: { type: String, default: '' },
    solution: { type: String, default: '' },
    resources: { type: String, default: '' },
    comments: { type: String, default: '' }
}, { _id: false }); // _id: false stops Mongoose from creating sub-document IDs

// A sub-schema to hold the author info
const AuthorSchema = new mongoose.Schema({
    initials: { type: String, default: 'N/A' },
    name: { type: String, default: 'No Author' }
}, { _id: false });


const LogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false // Made optional since logs may not be linked to users
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
        project_id: { 
            type: mongoose.Schema.Types.ObjectId,
            required: false
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
            type: [String], // An array of strings
            default: []
        },
        sections: {
            type: SectionSchema, 
            default: () => ({})
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
    { timestamps: true } // createdAt, updatedAt
);

// 2. Create a model

LogSchema.pre('save', async function (next) {
  // Only run if this.project_id isn’t already set
  if (!this.project_id && this.project) {
    const existingLog = await this.constructor.findOne({ project: this.project });

    if (existingLog && existingLog.project_id) {
      this.project_id = existingLog.project_id;
    } else {
      this.project_id = new mongoose.Types.ObjectId();
    }
  }
  else if (this.project_id && !this.project) {
    const existingLog = await this.constructor.findOne({ project_id: this.project_id });
    if (existingLog && existingLog.project) {
      this.project = existingLog.project;
    } else {
      this.project = "Unassigned Project";
    }
  }
  next();
});


const Log = mongoose.model("Log", LogSchema);

export default Log;