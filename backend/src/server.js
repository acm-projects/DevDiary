import express from 'express';
import logsRoutes from './routes/logsRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json());
app.use("/api/logs", logsRoutes);
console.log('running server.js');



app.listen(parseInt(PORT, 10), () => {
  console.log('Server running at http://localhost:',PORT, '/');
});

//mongodb+srv://tylerle3_db_user:<db_password>@cluster0.8utcpzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0