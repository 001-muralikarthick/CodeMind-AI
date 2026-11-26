import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import generateRoutes from './routes/generateRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Connect database with in-memory fallback
connectDB();

// API Health Check & AI Status
app.get('/api/health', (req, res) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());

  let aiProvider = 'Built-in Offline Engine';
  if (hasGemini && hasOpenAI) aiProvider = 'Google Gemini & OpenAI GPT-4o';
  else if (hasGemini) aiProvider = 'Google Gemini AI';
  else if (hasOpenAI) aiProvider = 'OpenAI GPT-4o';

  res.json({
    status: 'healthy',
    system: 'CodeMind AI Engine',
    version: '1.0.0',
    aiProvider,
    geminiActive: hasGemini,
    openAIActive: hasOpenAI,
    hasKey: hasGemini || hasOpenAI,
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/generate', generateRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  CodeMind AI Backend Engine Running on Port ${PORT}`);
  console.log(`  AI Provider: ${process.env.GEMINI_API_KEY ? 'Google Gemini (Active)' : 'Offline Domain Engine'}`);
  console.log(`  API Base: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
