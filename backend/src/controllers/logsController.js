import Log from "../models/Log.js";
import mongoose from "mongoose";
import OpenAI from "openai";
import { generateTags } from "../models/AutoTagger.js";
import { generateStuffWithLogs } from "../models/CompareWithDataBase.js";
import { search } from '../models/SearchFeature.js';
import Search from '../models/Search.js';
import Project from "../models/Project.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Gets ALL logs from the database
 */
export async function getAllLogs(req, res) {
    try {
        console.log("Fetching all logs...");
        const logs = await Log.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    }
    catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * Gets a single log by its ID
 */
export async function getLogById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        const log = await Log.findById(req.params.id);

        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }
        res.status(200).json(log);
    }
    catch (error) {
        console.error("Error fetching log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * Creates a new log with dynamic sections
 */
export async function createLog(req, res) {
    try {
        const {
            title,
            project,
            project_id,
            tags, 
            status,
            type,
            sections, // Array of {type, content, order}
            author
        } = req.body;

        //auto generate tags
        let AITagsData = { core_tags: "", summary: "", explanation: "" };
        try {
            AITagsData = await generateTags(title, sections);
        } catch (err) {
            console.error("Failed:", err.message);
        }
        // Parse the tags string into an array
        const tagsManualArray = tags;
        const tagsAIArray = AITagsData.core_tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        //combine manual and AI tags into one array
        const combinedArray = tagsAIArray;
        if (tagsManualArray) combinedArray = tagsAIArray.concat(tagsManualArray);

        //define solution in sections

        // Create the new log with all the data
        const log = new Log({
            title,
            project,
            status,
            type,
            tags: combinedArray || tagsManualArray,
            sections, 
            author, 
            summary: AITagsData.summary || "",
            explanation: AITagsData.explanation || "",
        });
        
        // Generate embedding from all text content
        try {
            const allContent = sections?.map(s => s.content).join(' ') || '';
            const fullText = `${title} ${project} ${allContent}`;
            
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: fullText.trim(), // Use the combined text
                dimensions: 24
            });
            log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding:", err.message);
        }
        
        const savedLog = await log.save();
        console.log("project id",project_id);
        if (project_id && mongoose.Types.ObjectId.isValid(project_id))
        {
            const project = await Project.findById(project_id);
            if (project) {
                project.logs.push(savedLog._id);
                project.tags.push(...log.tags);
                await project.save();
            }
        }
        res.status(201).json(savedLog); // Send the full saved log back

    } catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

/**
 * Updates an existing log with dynamic sections
 */
export async function updateLog(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        let log = await Log.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }

        // Get the new data from the body
        const { title, project, project_id, tags, status, type, sections, author } = req.body;
        const tagsArray = tags;

        // Update all fields
        log.title = title;
        log.project = project;
        log.tags = tagsArray;
        log.status = status;
        log.type = type;
        log.sections = sections || [];
        log.author = author;

        // Generate new AI summary and tags
        let AIOutput = { core_tags: "", summary: "", explanation: "" };
        try {
            AIOutput = await generateTags(title, sections);
        } catch (err) {
            console.error("Failed:", err.message);
        }

        //only save new tags if not enough already existing tags
        if (!tagsArray) {
            log.tags = AIOutput.core_tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
        log.explanation = AIOutput.explanation;
        log.summary = AIOutput.summary;
        // Re-generate embedding on update
        try {
            const allContent = sections?.map(s => s.content).join(' ') || '';
            const fullText = `${title} ${project} ${allContent}`;
            
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: fullText.trim(),
                dimensions: 24,
            });
            log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding on update:", err.message);
        }
        
        //if the project has changed
        if (project_id && mongoose.Types.ObjectId.isValid(project_id) && project_id != log.project_id)
        {
            console.log("here");
            const old_project = await Project.findById(log.project_id)
            if (old_project) {
                old_project.logs.pull(log._id)
                old_project.tags.pull(...log.tags);
                await old_project.save();
            }

            const new_project = await Project.findById(project_id);
            if (new_project) {
                new_project.logs.push(log._id);
                new_project.tags.push(...log.tags);
                await new_project.save();
            }

            log.project_id = project_id
        }
        const updatedLog = await log.save();

        res.status(200).json({ message: "Log updated successfully", log: updatedLog });
    }
    catch (error) {
        console.error("Error updating log:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

/**
 * Deletes a log
 */
export async function deleteLog(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        let log = await Log.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }

        const deletedLog = await Log.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Log deleted successfully", log: deletedLog });
    }
    catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
