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
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(rateLimiter)

// Simple logging middleware

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use("/api/logs", logsRoutes);
app.use("/api/search", searchRoutes);
app.use('/api/auth', authRoutes);

const MONGO_URI = process.env.MONGO_URI;
console.log('running server.js');



app.listen(parseInt(PORT, 10), () => {
  console.log('Server running at http://localhost:',PORT, '/');
});

