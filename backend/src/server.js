import express from "express";
import logsRoutes from "./routes/logsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import { generateTags } from "./models/AutoTagger.js";
import { generateStuffWithLogs } from "./models/CompareWithDataBase.js";
import { getLogById } from "./controllers/logsController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(rateLimiter);

// Simple logging middleware

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use("/api/logs", logsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects",projectRoutes);
app.post("/api/generateTags", async (req, res) => {
  try {
    const { title, content } = req.body;
    const data = await generateTags(title, content);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/generateTags:", error);
    res.status(500).json({ error: "Failed to generate tags." });
  }
});
app.post("/api/generateStuffWithLogs", async (req, res) => {
  try {
    const { title, content } = req.body;
    const data = await generateStuffWithLogs(title, content);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/generateStuffWithLogs:", error);
    res.status(500).json({ error: "Failed to generate." });
  }
});

app.post("/api/getLogById", async (req, res) => {
  try {
    const { id } = req.body;
    if (!req.params) {
      req.params = {};
    }
    req.params.id = id;
    await getLogById(req, res);
  } catch (error) {
    console.error("Error in /api/getLogById:", error);
    res.status(500).json({ error: "Failed to get log." });
  }
});
const MONGO_URI = process.env.MONGO_URI;
console.log("running server.js");

app.listen(parseInt(PORT, 10), () => {
  console.log("Server running at http://localhost:", PORT, "/");
});
