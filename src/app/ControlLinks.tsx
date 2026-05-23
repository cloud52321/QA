"use client";

import React from 'react';
import { ExternalLink, Layout } from 'lucide-react';

const STUDIOS = [
  {
    name: '穩贏 WinWin',
    bg: 'bg-sky-500/5',
    border: 'border-sky-500/20',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    cardBg: 'bg-sky-500/5 border-sky-500/15 hover:border-sky-400/30',
    projects: ['TG001','TG002'],
  },
  {
    name: '王牌 Ace',
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    cardBg: 'bg-violet-500/5 border-violet-500/15 hover:border-violet-400/30',
    projects: ['TG102','TG104','TG106','TG108','TG110','TG112','TG126'],
  },
  {
    name: '八方來財',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cardBg: 'bg-amber-500/5 border-amber-500/15 hover:border-amber-400/30',
    projects: ['TG103','TG105','TG107','TG109','TG111','TG113','TG115','TG117','TG119','TG121','TG123','TG125','TG139'],
  },
];

// URL 對照表，之後填入
const PROJECT_LINKS: Record<string, { rn: string; module: string }> = {
  TG001: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/CzUVwHj0OiJai9kHO7clOtiJg8d',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/BZW5wdUixiCdOTkqGRDlSMSjgRf?sheet=878381&open_in_browser=true',
  },
  TG102: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/D64fwI6wgisINOkOUPNlf5F7gps',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/N1H2wXWQti4bc0kiqI0lRiZmgSe?table=tblPO4bJKUg4Npwk&view=vew9gGopfl',
  },
  TG104: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/RtGqwqLsEi0pDlkbBRflasg1g6f',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/W6Y9wzEvqis1vzkzULvl1G1Vgvf?table=tbl6Tyv9nAlLNOq7&view=vew9gGopfl',
  },
  TG106: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/R42rwOO9Ni7jnlkGNNolzzsCgOd',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/CYLfwn17uifvCAkGNg2leONXgPb?table=tblhU0qizhjj6Kmd&view=vew9gGopfl',
  },
  TG108: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/YsUfwI0Q6iXIbgkXf8ol4rg1gcb',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/OrWAwpNrliuOCvkMJb9lZ6oRg2V?table=tblGrUIMqTh2gfQW&view=vew9gGopfl',
  },
};

const LinkBtn: React.FC<{ label: string; url: string; isBusy?: boolean; accent: string }> = ({ label, url, accent }) => {
  if (!url) return (
    <div className="flex-1 flex items-center justify-center py-1.5 rounded-lg border border-slate-700/30 text-[11px] font-bold cursor-not-allowed select-none" style={{color:'#475569'}}>
      {label}
    </div>
  );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className={`flex-1 flex items-center justify-center py-1.5 rounded-lg border text-[11px] font-bold transition-all ${accent}`}
      style={{color:'#ffffff'}}>
      {label}
    </a>
  );
};

export const ControlLinks: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
        <Layout size={15} className="text-blue-400" />
      </div>
      <h1 className="text-2xl font-extrabold text-white tracking-tight">控版連結</h1>
    </div>

    {STUDIOS.map(studio => (
      <div key={studio.name} className={`${studio.bg} border ${studio.border} rounded-2xl p-5 space-y-4`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${studio.badge}`}>
            {studio.name}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {studio.projects.map(id => {
            const links = PROJECT_LINKS[id] ?? { rn: '', module: '' };
            return (
              <div key={id} className={`border rounded-xl p-3 transition-all w-32 flex flex-col gap-2.5 ${studio.cardBg}`}>
                <p className="text-sm font-extrabold text-slate-200 text-center">{id}</p>
                <div className="flex gap-2">
                  <LinkBtn label="RN" url={links.rn}
                    accent="border-slate-600 bg-slate-700 hover:bg-slate-600" />
                  <LinkBtn label="模塊" url={links.module}
                    accent="border-slate-600 bg-slate-700 hover:bg-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}

    {/* 其他相關連結 */}
    <div className="bg-slate-900/40 border border-dashed border-slate-700/40 rounded-2xl px-6 py-5">
      <p className="text-sm font-extrabold text-slate-400 mb-2">其他相關連結</p>
      <p className="text-xs text-slate-600 italic">待補充</p>
    </div>
  </div>
);
