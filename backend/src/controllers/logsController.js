import Log from "../models/Log.js";
import mongoose from "mongoose";
import { generateTags } from "../models/AutoTagger.js";
import { generateStuffWithLogs } from "../models/CompareWithDataBase.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAllLogs(_, res) {
    try {
        console.log("Fetching logs...");
        const logs = await Log.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    }
    catch (error) {
        console.error("Error fetching logs:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function getLogById(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        const log = await Log.findById(req.params.id);

        res.status(200).json(log);
    }
    catch (error) {
        console.error("Error fetching log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createLog(req, res) {
    try {
        const { title, content } = req.body;

        let tagsData = { core_tags: [], summary: "", explanation: "" };

        try {
          tagsData = await generateTags(title, content);
        } catch (err) {
            console.error("Failed:", err.message);
        }
        const log = new Log({ title, 
            content, 
            tags: tagsData.core_tags || [],
            summary: tagsData.summary || "",
            explanation: tagsData.explanation || "" });
        
        try {
        const embeddingRes = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: `${title} ${content}`,
        });
        log.embedding = embeddingRes.data[0].embedding;
        } catch (err) {
            console.error("Failed to generate embedding:", err.message);
        }
        
        const savedLog = await log.save();
        res.status(201).json(savedLog);
    }
    catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function createLogWithContext(req, res) {
    try {
        const { title, content } = req.body;

        let tagsData = { core_tags: [], summary: "", explanation: "", similar_logs: [] };

        try {
          tagsData = await generateStuffWithLogs(title, content);
        } catch (err) {
            console.error("Failed:", err.message);
        }
        const log = new Log({ title, 
            content, 
            tags: tagsData.core_tags || [],
            summary: tagsData.summary || "",
            explanation: tagsData.explanation || "",
            similar_logs: tagsData.similar_logs || []});
        
            try {
                const embeddingRes = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: `${title} ${content}`,
            });
                log.embedding = embeddingRes.data[0].embedding;
            } catch (err) {
                console.error("Failed to generate embedding:", err.message);
            }

        const savedLog = await log.save();
        res.status(201).json(savedLog);
    }
    catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export async function updateLog(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        const { title, content, tags } = req.body;
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            { title, content, tags },
            { 
                new: true, 
                runValidators: true
            }
    );

        res.status(200).json({ message: "Log updated successfully", log: updatedLog });
    }
    catch (error) {
        console.error("Error updating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function deleteLog(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Log not found" });
        }

        const deletedLog = await Log.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Log deleted successfully", log: deletedLog });
    }
    catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};