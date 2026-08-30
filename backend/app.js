import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;