import express from 'express';
import logsRoutes from './routes/logsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
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

// define routes
app.use("/api/logs", logsRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/auth', authRoutes);

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