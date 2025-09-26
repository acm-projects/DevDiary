import express from 'express';
import logsRoutes from './routes/logsRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/logs", logsRoutes);
console.log('running server.js');



app.listen(PORT, () => {
  console.log('Server running at http://localhost:', PORT, '/');
});

//mongodb+srv://tylerle3_db_user:<db_password>@cluster0.8utcpzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0