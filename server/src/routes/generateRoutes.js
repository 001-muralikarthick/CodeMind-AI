import express from 'express';
import { AIService } from '../services/aiService.js';
import { PipelineService } from '../services/pipelineService.js';
import { ProjectRepository } from '../models/Project.js';
import { getTechnologyAdvice, TECH_PROS_CONS } from '../services/generators/techAdvisorCatalog.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Step 1 -> Step 2: Understand requirements & suggest selectable technologies
router.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: 'Please provide a project prompt or idea' });
    }
    const analysis = AIService.analyzePromptRequirements(prompt);
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error analyzing requirements' });
  }
});

// Feature: Technology Advisor - Explains advantages and disadvantages of technology choices
router.get('/advisor', (req, res) => {
  try {
    const { tech } = req.query;
    if (tech) {
      return res.json(getTechnologyAdvice(tech));
    }
    return res.json(TECH_PROS_CONS);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving technology advice' });
  }
});

// Step 2 -> Step 3: User chooses technologies -> AI generates detailed Project Plan for review
router.post('/plan', async (req, res) => {
  try {
    const { prompt, techSelection } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    const plan = await AIService.generateProjectPlan(prompt, techSelection);
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error generating project plan' });
  }
});

// Step 3 -> Step 4: User reviews plan and clicks "Approve & Generate Project"
router.post('/start', async (req, res) => {
  try {
    const { prompt, techSelection, approvedPlan } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const projectId = uuidv4();
    const project = await ProjectRepository.create({
      projectId,
      title: approvedPlan?.title || 'Generating Project...',
      prompt,
      techStack: {
        frontend: techSelection?.frontend || 'React',
        backend: techSelection?.backend || 'Node.js + Express',
        database: techSelection?.database || 'MongoDB',
        auth: techSelection?.withAuth !== false ? 'JWT + bcrypt' : 'None',
        styling: 'Tailwind CSS',
        aiModel: techSelection?.aiModel || 'Gemini',
        scope: techSelection?.scope || 'Full-stack application',
        payment: techSelection?.withPayment !== false
      },
      status: 'pending'
    });

    res.status(201).json({
      projectId,
      message: 'Project generation approved. Connect to SSE stream for live progress.'
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to initialize project' });
  }
});

// Step 4: Server-Sent Events (SSE) stream for live generation progress
router.get('/stream/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const project = await ProjectRepository.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write(`data: ${JSON.stringify({ type: 'connected', projectId })}\n\n`);

  if (project.status === 'completed') {
    res.write(`data: ${JSON.stringify({ type: 'completed', project })}\n\n`);
    return res.end();
  }

  try {
    await PipelineService.executePipeline(projectId, project.prompt, project.techStack, (progress) => {
      res.write(`data: ${JSON.stringify(progress)}\n\n`);
    });
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`);
    res.end();
  }
});

export default router;
