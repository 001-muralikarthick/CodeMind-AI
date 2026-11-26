import mongoose from 'mongoose';
import { memoryStore, getDBStatus } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    techStack: {
      frontend: { type: String, default: 'React (Vite + Tailwind CSS)' },
      backend: { type: String, default: 'Node.js / Express' },
      database: { type: String, default: 'MongoDB / Mongoose' },
      auth: { type: String, default: 'JWT + bcrypt' },
      styling: { type: String, default: 'Tailwind CSS' },
      tooling: { type: String, default: 'npm / ESM' }
    },
    status: {
      type: String,
      enum: ['pending', 'analyzing', 'planning', 'architecting', 'generating', 'completed', 'failed'],
      default: 'pending'
    },
    currentStep: { type: Number, default: 0 },
    steps: [
      {
        stepNumber: Number,
        name: String,
        status: { type: String, enum: ['pending', 'in-progress', 'completed', 'error'], default: 'pending' },
        summary: String,
        output: mongoose.Schema.Types.Mixed,
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    requirementsAnalysis: mongoose.Schema.Types.Mixed,
    projectPlan: mongoose.Schema.Types.Mixed,
    architecture: mongoose.Schema.Types.Mixed,
    visualDesign: mongoose.Schema.Types.Mixed,
    screenshot: String,
    folderStructure: mongoose.Schema.Types.Mixed,
    schemaDesign: mongoose.Schema.Types.Mixed,
    apiEndpoints: mongoose.Schema.Types.Mixed,
    files: [
      {
        path: String,
        name: String,
        language: String,
        category: String,
        content: String
      }
    ],
    setupGuide: mongoose.Schema.Types.Mixed,
    logs: [
      {
        step: Number,
        message: String,
        timestamp: { type: Date, default: Date.now },
        level: { type: String, default: 'info' }
      }
    ]
  },
  { timestamps: true }
);

const MongoProject = mongoose.models.Project || mongoose.model('Project', projectSchema);

export class ProjectRepository {
  static async create(data) {
    const status = getDBStatus();
    const projectId = data.projectId || uuidv4();
    const projectData = {
      ...data,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (status.connected) {
      return await MongoProject.create(projectData);
    } else {
      memoryStore.set(projectId, projectData);
      return projectData;
    }
  }

  static async findById(projectId) {
    const status = getDBStatus();
    if (status.connected) {
      return await MongoProject.findOne({ projectId });
    } else {
      return memoryStore.get(projectId) || null;
    }
  }

  static async update(projectId, updateData) {
    const status = getDBStatus();
    if (status.connected) {
      return await MongoProject.findOneAndUpdate(
        { projectId },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
    } else {
      const existing = memoryStore.get(projectId) || {};
      const updated = {
        ...existing,
        ...updateData,
        updatedAt: new Date()
      };
      memoryStore.set(projectId, updated);
      return updated;
    }
  }

  static async listAll() {
    const status = getDBStatus();
    if (status.connected) {
      return await MongoProject.find().sort({ createdAt: -1 }).select('projectId title prompt techStack status createdAt updatedAt currentStep');
    } else {
      return Array.from(memoryStore.values())
        .map(p => ({
          projectId: p.projectId,
          title: p.title,
          prompt: p.prompt,
          techStack: p.techStack,
          status: p.status,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          currentStep: p.currentStep
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }
}
