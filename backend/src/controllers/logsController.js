import Log from "../models/Log.js";
import mongoose from "mongoose";
import OpenAI from "openai";

 import { generateTags } from "../models/AutoTagger.js";
 import { generateStuffWithLogs } from "../models/CompareWithDataBase.js";
 import { search } from '../models/SearchFeature.js';
  import Search from '../models/Search.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Gets all logs for the currently authenticated user
 */
export async function getAllLogs(req, res) {
    // This assumes that there already is an auth middleware that adds `req.user.id`
    try {
        console.log("Fetching logs for user:", req.user.id);
        const logs = await Log.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(logs);
    }
    catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Gets a single log by its ID, checking that it belongs to the user
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

        // ensure the log belongs to the user
        if (log.user.toString() !== req.user.id) {
             return res.status(401).json({ message: "Not authorized" });
        }

        res.status(200).json(log);
    }
    catch (error) {
        console.error("Error fetching log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * Creates a new log, based on the full frontend data structure
 */
export async function createLog(req, res) {
    try {
        // Get all the data from the frontend body
        const {
            title,
            project,
            tags, 
            status,
            type,
            sections, // object with { error, code, solution, ... }
            author // object with { initials, name } 
        } = req.body;

        // Get user ID from the auth token 
        const userId = req.user.id; 

        // Parse the tags string into an array
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
        
        // Create the new log with all the data
        const log = new Log({
            user: userId, // Link the log to the user
            title,
            project,
            status,
            type,
            tags: tagsArray,
            sections, // Save the whole sections object
            author, // Save the author object
        });
        
        // Generate embedding from all text content
        try {
            const fullText = `${title} ${project} ${sections.error} ${sections.code} ${sections.solution} ${sections.resources} ${sections.comments}`;
            
            const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: fullText.trim(), // Use the combined text
            });
            log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding:", err.message);
        }
        
        const savedLog = await log.save();
        res.status(201).json(savedLog); // Send the full saved log back

    } catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Update the existing log
 */
export async function updateLog(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        // Find the log 
        let log = await Log.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }

        // Check if the user owns the log
        if (log.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Get the new data from the body
        const { title, project, tags, status, type, sections, author } = req.body;
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);

        // Update the log fields
        log.title = title;
        log.project = project;
        log.tags = tagsArray;
        log.status = status;
        log.type = type;
        log.sections = sections;
        log.author = author;
        
        // Re-generate embedding on update
        try {
            const fullText = `${log.title} ${log.project} ${log.sections.error} ${log.sections.code} ${log.sections.solution} ${log.sections.resources} ${log.sections.comments}`;
            
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
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Delete log, checks that it belongs to the user first
 */
export async function deleteLog(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        // Find the log
        let log = await Log.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }

        // Check ownership
        if (log.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const deletedLog = await Log.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Log deleted successfully", log: deletedLog });
    }
    catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};