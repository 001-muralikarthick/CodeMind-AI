import React, { useState, useEffect } from 'react';
import { X, FolderArchive, ArrowRight, Download, Calendar, Layers } from 'lucide-react';
import { apiService } from '../services/api';

export default function HistoryModal({ isOpen, onClose, onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await apiService.listProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-2">
          <FolderArchive className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Generated Projects History</h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Select any generated software project to inspect its architecture, code, or download artifacts.
        </p>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-2" />
              <span>Loading saved projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm border border-dashed border-slate-800 rounded-2xl">
              <p>No projects generated in this session yet.</p>
              <p className="text-xs text-slate-500 mt-1">Start by typing your project idea on the home screen!</p>
            </div>
          ) : (
            projects.map((p) => (
              <div
                key={p.projectId}
                onClick={async () => {
                  const fullProject = await apiService.getProject(p.projectId);
                  onSelectProject(fullProject);
                  onClose();
                }}
                className="p-4 bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300">
                      {p.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                    "{p.prompt}"
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-2 font-mono">
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{p.techStack?.frontend?.split(' ')[0]} + {p.techStack?.backend?.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <a
                    href={apiService.getZipUrl(p.projectId)}
                    onClick={(e) => e.stopPropagation()}
                    download
                    className="p-2 bg-slate-800 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-300 rounded-xl transition"
                    title="Download ZIP"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
