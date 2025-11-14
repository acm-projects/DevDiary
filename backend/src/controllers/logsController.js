import Log from "../models/Log.js";
import mongoose from "mongoose";
import OpenAI from "openai";

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
            tags, 
            status,
            type,
            sections, // Array of {type, content, order}
            author
        } = req.body;

        // Parse the tags string into an array
        const tagsArray = typeof tags === 'string' 
            ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
            : tags;
        
        // Create the new log with dynamic sections
        const log = new Log({
            title,
            project,
            status,
            type,
            tags: tagsArray,
            sections: sections || [], 
            author, 
        });
        
        // Generate embedding from all text content
        try {
            const allContent = sections?.map(s => s.content).join(' ') || '';
            const fullText = `${title} ${project} ${allContent}`;
            
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: fullText.trim(),
            });
            log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding:", err.message);
        }
        
        const savedLog = await log.save();
        res.status(201).json(savedLog);

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

        const { title, project, tags, status, type, sections, author } = req.body;
        
        const tagsArray = typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
            : tags;

        // Update all fields
        log.title = title;
        log.project = project;
        log.tags = tagsArray;
        log.status = status;
        log.type = type;
        log.sections = sections || [];
        log.author = author;

        try {
            const allContent = sections?.map(s => s.content).join(' ') || '';
            const fullText = `${title} ${project} ${allContent}`;
            
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: fullText.trim(),
            });
            log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding on update:", err.message);
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