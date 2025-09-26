import express from 'express';
import logsRoutes from './routes/logsRoutes.js';

const app = express();

app.use("/api/logs", logsRoutes);
console.log('running server.js');

/*

*/

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
