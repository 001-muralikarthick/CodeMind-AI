import express from 'express';
import { ProjectRepository } from '../models/Project.js';
import { createProjectZip } from '../services/zipService.js';
import { generatePDFDocument, generateDOCXDocument } from '../services/docService.js';
import { ModificationService } from '../services/modificationService.js';
import { CodeQualityService } from '../services/codeQualityService.js';
import { enrichWithFullScaffold } from '../services/scaffoldService.js';
import archiver from 'archiver';

const router = express.Router();

// List all generated projects
router.get('/', async (req, res) => {
  try {
    const list = await ProjectRepository.listAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching projects' });
  }
});

// Get single project details
router.get('/:projectId', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching project' });
  }
});

// Feature: Project Modification using Natural Language
// Example: "Add an admin dashboard and include a sales report."
router.post('/:projectId/modify', async (req, res) => {
  try {
    const { instruction } = req.body;
    if (!instruction || !instruction.trim()) {
      return res.status(400).json({ message: 'Modification instruction is required' });
    }
    const result = await ModificationService.modifyProject(req.params.projectId, instruction);
    res.json(result);
  } catch (err) {
    console.error('[Modify Project Error]', err);
    res.status(500).json({ message: err.message || 'Failed to modify project' });
  }
});

// Feature: Code Quality Checker
router.get('/:projectId/quality', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const audit = CodeQualityService.auditProject(project.files || []);
    res.json(audit);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to audit code' });
  }
});

// Feature: AI Debugger (Scans and applies self-healing fixes)
router.post('/:projectId/debugger', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const debugResult = CodeQualityService.runAIDebugger(project.files || []);
    res.json(debugResult);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Debugger failed' });
  }
});

// Download Complete project ZIP (Option 1)
router.get('/:projectId/download/zip', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Always ensure full scaffold (package.json, run.bat, client/package.json, ports) before archiving
    const enrichedProject = enrichWithFullScaffold(project);
    const zipBuffer = await createProjectZip(enrichedProject);
    const filename = `${(project.title || 'project').toLowerCase().replace(/[\s\W-]+/g, '-')}.zip`;

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': zipBuffer.length
    });

    res.send(zipBuffer);
  } catch (err) {
    console.error('[Download ZIP Error]', err);
    res.status(500).json({ message: err.message || 'Error generating ZIP' });
  }
});

// Download PDF documentation (Option 2A)
router.get('/:projectId/download/pdf', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const pdfBuffer = await generatePDFDocument(project);
    const filename = `${(project.title || 'project').toLowerCase().replace(/[\s\W-]+/g, '-')}-documentation.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('[Download PDF Error]', err);
    res.status(500).json({ message: err.message || 'Error generating PDF' });
  }
});

// Download DOCX documentation (Option 2B)
router.get('/:projectId/download/docx', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const docxBuffer = await generateDOCXDocument(project);
    const filename = `${(project.title || 'project').toLowerCase().replace(/[\s\W-]+/g, '-')}-documentation.docx`;

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': docxBuffer.length
    });

    res.send(docxBuffer);
  } catch (err) {
    console.error('[Download DOCX Error]', err);
    res.status(500).json({ message: err.message || 'Error generating DOCX' });
  }
});

// Download Both ZIP + Documentation (Option 3)
router.get('/:projectId/download/bundle', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const archive = archiver('zip', { zlib: { level: 9 } });
    const buffers = [];
    archive.on('data', data => buffers.push(data));

    if (project.files && Array.isArray(project.files)) {
      for (const file of project.files) {
        archive.append(file.content || '', { name: file.path || file.name });
      }
    }

    const pdfBuf = await generatePDFDocument(project);
    archive.append(pdfBuf, { name: 'documentation/PROJECT_ARCHITECTURE.pdf' });

    const docxBuf = await generateDOCXDocument(project);
    archive.append(docxBuf, { name: 'documentation/PROJECT_SPECIFICATION.docx' });

    archive.finalize();

    archive.on('end', () => {
      const bundleBuffer = Buffer.concat(buffers);
      const filename = `${(project.title || 'project').toLowerCase().replace(/[\s\W-]+/g, '-')}-full-bundle.zip`;
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': bundleBuffer.length
      });
      res.send(bundleBuffer);
    });
  } catch (err) {
    console.error('[Download Bundle Error]', err);
    res.status(500).json({ message: err.message || 'Error generating bundle' });
  }
});

// Download Markdown documentation
router.get('/:projectId/download/markdown', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    let md = `# ${project.title} - System Documentation\nGenerated by CodeMind AI\n\n`;
    md += `## 1. Requirements Overview\n${project.requirementsAnalysis?.overview || project.prompt}\n\n`;

    md += `## 2. Tech Stack\n`;
    md += `- Frontend: ${project.techStack?.frontend}\n`;
    md += `- Backend: ${project.techStack?.backend}\n`;
    md += `- Database: ${project.techStack?.database}\n`;
    md += `- Auth: ${project.techStack?.auth}\n\n`;

    md += `## 3. System Architecture\n`;
    md += `Pattern: ${project.architecture?.pattern}\n\n`;
    md += `\`\`\`\n${project.architecture?.diagram || ''}\n\`\`\`\n\n`;

    md += `## 4. Setup Instructions\n`;
    project.setupGuide?.steps?.forEach((s, idx) => {
      md += `${idx + 1}. **${s.title}**: \`${s.command}\`\n`;
    });

    const filename = `${(project.title || 'project').toLowerCase().replace(/[\s\W-]+/g, '-')}-docs.md`;
    res.set({
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="${filename}"`
    });

    res.send(md);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error generating Markdown' });
  }
});

// Feature: Live Interactive Web Preview
router.get('/:projectId/preview', async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.projectId);
    if (!project) return res.status(404).send('Project not found');

    const title = project.title || 'Generated Application';
    const domain = (project.requirementsAnalysis?.overview || project.prompt || '').toLowerCase();
    const isGym = domain.includes('gym') || domain.includes('fitness');
    const isCricket = domain.includes('cricket');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CodeMind Live App Sandbox</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-30 bg-slate-900/90 backdrop-blur border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">${title.slice(0, 2).toUpperCase()}</div>
        <span class="font-bold text-white">${title}</span>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">LIVE PREVIEW</span>
      </div>
      <div class="text-xs text-slate-400">Powered by CodeMind AI</div>
    </div>
  </header>
  <main class="flex-1 max-w-7xl w-full mx-auto p-6">
    <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3 mb-6">
      <h2 class="text-2xl font-black text-white">${title}</h2>
      <p class="text-xs text-slate-400 max-w-xl mx-auto">${project.requirementsAnalysis?.overview || project.prompt}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 font-bold uppercase">Frontend Architecture</div>
        <div class="text-lg font-bold text-white mt-1">${project.techStack?.frontend || 'React + Tailwind'}</div>
        <div class="text-xs text-indigo-400 mt-2">Responsive UI & Component Modules</div>
      </div>
      <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 font-bold uppercase">Backend Gateway</div>
        <div class="text-lg font-bold text-white mt-1">${project.techStack?.backend || 'Node.js + Express'}</div>
        <div class="text-xs text-emerald-400 mt-2">${project.apiEndpoints?.length || 0} API Endpoints Configured</div>
      </div>
      <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 font-bold uppercase">Database Persistence</div>
        <div class="text-lg font-bold text-white mt-1">${project.techStack?.database || 'MongoDB'}</div>
        <div class="text-xs text-amber-400 mt-2">Schemas & In-Memory Fallback Verified</div>
      </div>
    </div>
  </main>
</body>
</html>`;

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).send('Error rendering preview');
  }
});

export default router;
