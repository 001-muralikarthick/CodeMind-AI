const API_BASE = '/api';

async function safeJson(res, defaultMsg = 'Backend request failed') {
  let text = '';
  try {
    text = await res.text();
    if (!text || !text.trim()) {
      if (!res.ok) {
        throw new Error(`Server returned error status ${res.status}. Please check backend logs.`);
      }
      return {};
    }
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.message || `Server error (${res.status})`);
    }
    return data;
  } catch (err) {
    if (err.message && !err.message.includes('Unexpected end') && !err.message.includes('JSON')) {
      throw err;
    }
    throw new Error(`Cannot connect to CodeMind Backend. Please verify the server is running on port 5005.`);
  }
}

export const apiService = {
  // Step 1 -> 2: Understand requirements
  async analyzeRequirements(prompt) {
    const res = await fetch(`${API_BASE}/generate/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return safeJson(res, 'Failed to analyze requirements');
  },

  // Step 2 -> 3: Generate detailed project plan for user review
  async generateProjectPlan(prompt, techSelection) {
    const res = await fetch(`${API_BASE}/generate/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, techSelection })
    });
    return safeJson(res, 'Failed to generate project plan');
  },

  // Step 3 -> 4: User approves plan -> Start building
  async startGeneration(prompt, techSelection, approvedPlan) {
    const res = await fetch(`${API_BASE}/generate/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, techSelection, approvedPlan })
    });
    return safeJson(res, 'Failed to start generation');
  },

  // Step 4: SSE stream listener
  listenToPipeline(projectId, onProgress, onComplete, onError) {
    const eventSource = new EventSource(`${API_BASE}/generate/stream/${projectId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.status === 'all-completed' || data.type === 'completed') {
          eventSource.close();
          onComplete(data.project);
        } else if (data.status === 'error' || data.type === 'error') {
          eventSource.close();
          onError(data.message || 'Generation error');
        } else {
          onProgress(data);
        }
      } catch (err) {
        console.error('SSE JSON parse error:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('SSE connection error:', err);
      eventSource.close();
      setTimeout(async () => {
        try {
          const project = await apiService.getProject(projectId);
          if (project.status === 'completed') {
            onComplete(project);
          } else {
            onError('Connection interrupted');
          }
        } catch (fetchErr) {
          onError('Connection to CodeMind AI stream interrupted');
        }
      }, 1000);
    };

    return () => eventSource.close();
  },

  async getProject(projectId) {
    const res = await fetch(`${API_BASE}/projects/${projectId}`);
    return safeJson(res, 'Failed to load project');
  },

  async listProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return safeJson(res, 'Failed to load project list');
  },

  getZipUrl(projectId) {
    return `${API_BASE}/projects/${projectId}/download/zip`;
  },

  getPdfUrl(projectId) {
    return `${API_BASE}/projects/${projectId}/download/pdf`;
  },

  getDocxUrl(projectId) {
    return `${API_BASE}/projects/${projectId}/download/docx`;
  },

  getBundleUrl(projectId) {
    return `${API_BASE}/projects/${projectId}/download/bundle`;
  },

  getMarkdownUrl(projectId) {
    return `${API_BASE}/projects/${projectId}/download/markdown`;
  },

  // Feature: Technology Advisor - Pros & Cons for tech choices
  async getTechAdvice(tech) {
    const res = await fetch(`${API_BASE}/generate/advisor?tech=${encodeURIComponent(tech)}`);
    return safeJson(res, 'Failed to fetch tech advice');
  },

  async getAllTechAdvice() {
    const res = await fetch(`${API_BASE}/generate/advisor`);
    return safeJson(res, 'Failed to fetch tech advice catalog');
  },

  // Feature: Natural Language Project Modification
  async modifyProject(projectId, instruction) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/modify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction })
    });
    return safeJson(res, 'Failed to modify project');
  },

  // Feature: Code Quality Checker
  async getCodeQuality(projectId) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/quality`);
    return safeJson(res, 'Failed to audit code quality');
  },

  // Feature: AI Debugger
  async runAIDebugger(projectId) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/debugger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return safeJson(res, 'AI Debugger failed');
  }
};
