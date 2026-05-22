"use client";

import React, { useState } from 'react';
import { ExternalLink, Layout } from 'lucide-react';

// ─── 資料 ─────────────────────────────────────────────────────────────────────

const STUDIOS: { name: string; projects: { id: string; rn: string; module: string }[] }[] = [
  {
    name: '穩贏 WinWin',
    projects: [
      { id: 'TG001', rn: '', module: '' },
      { id: 'TG002', rn: '', module: '' },
    ],
  },
  {
    name: '王牌 Ace',
    projects: [
      { id: 'TG102', rn: '', module: '' },
      { id: 'TG104', rn: '', module: '' },
      { id: 'TG106', rn: '', module: '' },
      { id: 'TG108', rn: '', module: '' },
      { id: 'TG110', rn: '', module: '' },
      { id: 'TG112', rn: '', module: '' },
      { id: 'TG126', rn: '', module: '' },
    ],
  },
  {
    name: '八方來財',
    projects: [
      { id: 'TG103', rn: '', module: '' },
      { id: 'TG105', rn: '', module: '' },
      { id: 'TG107', rn: '', module: '' },
      { id: 'TG109', rn: '', module: '' },
      { id: 'TG111', rn: '', module: '' },
      { id: 'TG113', rn: '', module: '' },
      { id: 'TG115', rn: '', module: '' },
      { id: 'TG117', rn: '', module: '' },
      { id: 'TG119', rn: '', module: '' },
      { id: 'TG121', rn: '', module: '' },
      { id: 'TG123', rn: '', module: '' },
      { id: 'TG125', rn: '', module: '' },
      { id: 'TG139', rn: '', module: '' },
    ],
  },
];

// ─── LinkButton ───────────────────────────────────────────────────────────────

const LinkButton: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  if (!url) return (
    <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-slate-700/40 bg-slate-800/20 text-slate-600 text-xs font-bold cursor-not-allowed">
      <ExternalLink size={10} />
      {label}
    </div>
  );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-all"
    >
      <ExternalLink size={10} />
      {label}
    </a>
  );
};

// ─── ControlLinks ─────────────────────────────────────────────────────────────

export const ControlLinks: React.FC = () => {
  const [activeStudio, setActiveStudio] = useState(STUDIOS[0].name);
  const studio = STUDIOS.find(s => s.name === activeStudio)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
          <Layout size={15} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">控版連結</h1>
      </div>

      {/* Studio tabs */}
      <div className="flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50 w-fit">
        {STUDIOS.map(s => (
          <button
            key={s.name}
            onClick={() => setActiveStudio(s.name)}
            className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeStudio === s.name
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-3 gap-4">
        {studio.projects.map(p => (
          <div
            key={p.id}
            className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all"
          >
            <p className="text-sm font-extrabold text-slate-200">{p.id}</p>
            <div className="flex gap-2">
              <LinkButton label="RN" url={p.rn} />
              <LinkButton label="模塊" url={p.module} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
