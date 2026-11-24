import { AIService } from './src/services/aiService.js';
import { PipelineService } from './src/services/pipelineService.js';
import { ProjectRepository } from './src/models/Project.js';
import { createProjectZip } from './src/services/zipService.js';
import { generatePDFDocument, generateDOCXDocument } from './src/services/docService.js';

async function runTest() {
  console.log('--- TEST 1: Requirement Analysis & Feature Extraction ---');
  const prompt = "I want to build an online shopping website. Users should register, login, browse products, search products, add products to cart, place orders, and make payments. Admins should manage products and orders.";
  const analysis = AIService.analyzePromptRequirements(prompt);
  console.log('Detected features count:', analysis.detectedFeatures.length);
  console.log('Suggested preset:', analysis.suggestedPreset.name);

  console.log('\n--- TEST 2: Start Project & 11-Step Pipeline ---');
  const project = await ProjectRepository.create({
    projectId: 'test-proj-001',
    title: 'Testing Project',
    prompt,
    techStack: {
      frontend: 'React (Vite + Tailwind CSS)',
      backend: 'Node.js / Express',
      database: 'MongoDB / Mongoose',
      auth: 'JWT + bcrypt',
      styling: 'Tailwind CSS'
    }
  });

  console.log('Running 11 steps:');
  await PipelineService.executePipeline('test-proj-001', prompt, project.techStack, (evt) => {
    if (evt.status === 'completed' && evt.step) {
      console.log(`  ✓ Step ${evt.step}: ${evt.name}`);
    }
  });

  const completed = await ProjectRepository.findById('test-proj-001');
  console.log('Project Status:', completed.status);
  console.log('Total Generated Files:', completed.files.length);
  console.log('API Endpoints:', completed.apiEndpoints.length);
  console.log('Database Collections:', completed.schemaDesign.collections.length);

  console.log('\n--- TEST 3: ZIP Packaging (Step 10) ---');
  const zipBuffer = await createProjectZip(completed);
  console.log('Generated ZIP Size (bytes):', zipBuffer.length);

  console.log('\n--- TEST 4: PDF Generation (Step 11) ---');
  const pdfBuffer = await generatePDFDocument(completed);
  console.log('Generated PDF Size (bytes):', pdfBuffer.length);

  console.log('\n--- TEST 5: DOCX Generation (Step 11) ---');
  const docxBuffer = await generateDOCXDocument(completed);
  console.log('Generated DOCX Size (bytes):', docxBuffer.length);

  console.log('\nALL TESTS PASSED SUCCESSFULLY! 🚀');
  process.exit(0);
}

runTest().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
