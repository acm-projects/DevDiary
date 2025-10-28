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
        project: {
            type: String,
            required: false, 
            default: "Unassigned Project"
        },
        project_id: { 
            type: mongoose.Schema.Types.ObjectId,
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
            type: [mongoose.Schema.Types.ObjectId],
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

logSchema.pre('save', async function (next) {
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


const Log = mongoose.model("Log", logSchema);

export default Log;
