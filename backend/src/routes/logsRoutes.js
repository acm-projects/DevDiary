import express from 'express';
import { createLog, createLogWithContext, deleteLog, getAllLogs, getLogById, updateLog } from '../controllers/logsController.js';
import { get } from 'mongoose';

const router = express.Router();

router.get("/", getAllLogs);
router.get("/:id", getLogById);

router.post("/", createLog);
router.post("/context", createLogWithContext);


router.put("/:id", updateLog); 

router.delete("/:id", deleteLog);

export default router;
/*
app.get("/api/logs", (req, res) => {
    res.status(200).send("# waof logs");
});

app.post("/api/logs", (req, res) => {
    res.status(201).json({ message: "Log created successfully"});
});

app.put("/api/logs/:id", (req, res) => {
    res.status(200).json({ message: "Log updated successfully"});
});

app.delete("/api/logs/:id", (req, res) => {
    res.status(200).json({ message: "Log deleted successfully"});
});


app.get("/api/create", (req, res) => {
    res.send("create a log");
});

*/