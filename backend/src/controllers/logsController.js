import Log from "../models/Log.js";

export async function getAllLogs(req, res) {
    try {
        const logs = await Log.find();
        res.status(200).json(logs);
    }
    catch (error) {
        console.error("Error fetching logs:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function createLog(req, res) {
    try {
        const { title, content, tags } = req.body;
        const newLog = new Log({ title, content, tags });
        console.log(title, content, tags);
        await newLog.save();
        res.status(201).json({ message: "Log created successfully", log: newLog });
    }
    catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export function updateLog(req, res) {
    res.status(200).json({ message: "Log updated successfully"});
};

export function deleteLog(req, res) {
    res.status(200).json({ message: "Log deleted successfully"});
};