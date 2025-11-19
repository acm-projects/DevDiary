import express from 'express';
import logsRoutes from './routes/logsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { generateTags } from './models/AutoTagger.js';
import { generateStuffWithLogs } from './models/CompareWithDataBase.js';
import { getLogById } from './controllers/logsController.js';

dotenv.config();

const app = express();
// Use port 5000 or 5001 to avoid the Mac AirPlay conflict
const PORT = process.env.PORT || 5001; 

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

const corsOptions = {
  // Use a Regular Expression to match all localhost ports
  origin: /^http:\/\/localhost:[0-9]+$/,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON request bodies
// app.use(rateLimiter);

// Define routes
app.use("/api/logs", logsRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/projects", projectRoutes);

// AI Insights endpoints
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

// Server Startup
const startServer = async () => {
  try {
    // Wait for the database to connect
    await connectDB(); 
    
    // listening for requests
    app.listen(parseInt(PORT, 10), () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start server
startServer();