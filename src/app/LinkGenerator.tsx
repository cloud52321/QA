"use client";

import React, { useState } from 'react';
import { Link2, Zap, ExternalLink, ChevronDown } from 'lucide-react';
import { studioData, studioList, ProjectInfo } from './wikiData';

const ALL_STUDIO = '全部';
const allProjects: ProjectInfo[] = studioList.flatMap(s => studioData[s]);

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeneratedLink { title: string; icon: React.ReactNode; url: string; desc: string; }
interface EnvGroup {
  env: 'DEV' | 'STG' | 'UAT' | 'PROD';
  label: string; borderClass: string; badgeClass: string;
  links: GeneratedLink[];
}

// ─── CopyGoButtons ────────────────────────────────────────────────────────────

const CopyGoButtons: React.FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  const go = (e: React.MouseEvent) => { e.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer'); };
  return (
    <div className="flex gap-2 mt-2">
      <button onClick={copy} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
        {copied ? '✓ COPIED' : 'COPY'}
      </button>
      <button onClick={go} className="flex-1 py-1.5 rounded-lg text-xs font-bold border bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all flex items-center justify-center gap-1">
        <ExternalLink size={11} /> GO TO
      </button>
    </div>
  );
};

// ─── LinkGenerator ────────────────────────────────────────────────────────────

const PROJECT_ICON: Record<string, string> = {
  TG102: '🔴', TG104: '⚡', TG110: '🪙', TG112: '🃏', TG114: '🛺',
  TG116: '🧙', TG118: '🪙', TG120: '🧙', TG122: '🪙', TG124: '🪙',
  TG126: '♠️', TG128: '🧙', TG130: '🪙',
  TG103: '🍒', TG105: '🍿', TG107: '🧙', TG109: '🎯',
  TG115: '🏀', TG117: '💥',
  TG139: '💯', TG119: '⚽', TG121: '🚀', TG123: '🎈',
};

const PROJECT_SVG_ICON: Record<string, React.ReactNode> = {
  TG106: (
    <svg width="16" height="16" viewBox="0 0 88 88">
      <defs><radialGradient id="bs2" cx="35%" cy="30%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.4"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs>
      <circle cx="44" cy="44" r="42" fill="#1a1a2e" stroke="#3b3b6e" strokeWidth="2"/>
      <circle cx="44" cy="44" r="42" fill="url(#bs2)"/>
      <circle cx="44" cy="44" r="18" fill="white"/>
      <text x="44" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#111">8</text>
    </svg>
  ),
  TG108: (
    <svg width="16" height="16" viewBox="0 0 88 76">
      <ellipse cx="44" cy="38" rx="42" ry="36" fill="#f9a8c9" stroke="#e879a0" strokeWidth="1"/>
      <ellipse cx="44" cy="46" rx="25" ry="19" fill="#f472b6" stroke="#db2777" strokeWidth="0.5"/>
      <ellipse cx="35" cy="48" rx="7" ry="8" fill="#c2185b"/>
      <ellipse cx="53" cy="48" rx="7" ry="8" fill="#c2185b"/>
      <circle cx="28" cy="24" r="5" fill="#1a1a1a"/>
      <circle cx="60" cy="24" r="5" fill="#1a1a1a"/>
    </svg>
  ),
  TG111: (
    <svg width="16" height="16" viewBox="0 0 88 96">
      <circle cx="30" cy="18" r="9" fill="#ef4444"/><circle cx="18" cy="12" r="10" fill="#ef4444"/><circle cx="6" cy="18" r="9" fill="#ef4444"/>
      <ellipse cx="30" cy="52" rx="30" ry="32" fill="white" stroke="#f3f4f6" strokeWidth="1.5"/>
      <path d="M4,44 L-16,48 L4,54 Z" fill="#f59e0b"/>
      <ellipse cx="2" cy="66" rx="8" ry="10" fill="#ef4444"/>
      <circle cx="42" cy="44" r="11" fill="#1a1a1a"/><circle cx="39" cy="41" r="4" fill="white"/>
    </svg>
  ),
  TG113: (
    <svg width="16" height="16" viewBox="0 0 88 96">
      <rect x="4" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="22" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
      <rect x="40" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="58" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
      <rect x="2" y="28" width="76" height="60" rx="4" fill="#9b8fe0"/>
      <path d="M30,88 L30,60 Q30,48 44,48 Q58,48 58,60 L58,88 Z" fill="#3730a3"/>
      <rect x="8" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/><rect x="54" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/>
      <line x1="44" x2="44" y1="28" y2="6" stroke="#e11d48" strokeWidth="2"/>
      <path d="M44,6 L60,14 L44,22 Z" fill="#e11d48"/>
    </svg>
  ),
  TG125: (
    <svg width="16" height="16" viewBox="0 0 88 100">
      <path d="M16,58 Q10,88 20,96 L44,80 L68,96 Q78,88 72,58 Z" fill="#4a1d6e"/>
      <circle cx="44" cy="44" r="32" fill="#fde8d0"/>
      <path d="M16,52 Q24,16 44,14 Q64,16 72,52 Q64,40 44,38 Q24,40 16,52Z" fill="#3d2c6e"/>
      <circle cx="34" cy="44" r="6" fill="#ff3366"/><circle cx="54" cy="44" r="6" fill="#ff3366"/>
      <rect x="30" y="58" width="6" height="10" rx="3" fill="white"/><rect x="46" y="58" width="6" height="10" rx="3" fill="white"/>
    </svg>
  ),
  TG107: (
    <svg width="16" height="16" viewBox="0 0 88 100">
      <path d="M16,58 Q12,90 22,96 L44,80 L66,96 Q76,90 72,58 Z" fill="#4c1d95"/>
      <circle cx="44" cy="44" r="32" fill="#3730a3"/>
      <path d="M18,48 Q20,34 44,34 Q68,34 70,48 Q68,58 44,58 Q20,58 18,48Z" fill="#d4956a"/>
      <circle cx="32" cy="46" r="5" fill="#1a1a1a"/><circle cx="56" cy="46" r="5" fill="#1a1a1a"/>
      <rect x="38" y="14" width="12" height="8" rx="3" fill="#a855f7"/>
      <path d="M38,22 L28,34 M50,22 L60,34" stroke="#a855f7" strokeWidth="3"/>
    </svg>
  ),
};

const ProjectIcon: React.FC<{ id: string }> = ({ id }) => {
  if (PROJECT_SVG_ICON[id]) return <span className="flex-shrink-0 flex items-center">{PROJECT_SVG_ICON[id]}</span>;
  if (PROJECT_ICON[id]) return <span className="text-sm leading-none">{PROJECT_ICON[id]}</span>;
  return null;
};

export const LinkGenerator: React.FC = () => {
  const [activeStudio, setActiveStudio] = useState(ALL_STUDIO);
  const projects = activeStudio === ALL_STUDIO ? allProjects : studioData[activeStudio];
  const firstProject = projects[0];

  const [project,  setProject]   = useState<ProjectInfo>(firstProject);
  const [account,  setAccount]   = useState(firstProject.account);
  const [token,    setToken]     = useState(firstProject.token);
  const [room,     setRoom]      = useState(firstProject.roomPrefix);
  const [serial,   setSerial]    = useState('01');
  const [platform, setPlatform]  = useState<'h5' | 'pch5'>('h5');
  const [stgPort,  setStgPort]   = useState('30907');
  const [showAdv,  setShowAdv]   = useState(false);
  const [envGroups, setEnvGroups] = useState<EnvGroup[]>([]);
  const [generated, setGenerated] = useState(false);

  const handleAccountChange = (val: string) => {
    setAccount(val);
    const match = val.match(/^C88test(\d+)$/i);
    if (match) setToken(match[1]);
  };

  const handleStudioChange = (s: string) => {
    setActiveStudio(s);
    const first = s === ALL_STUDIO ? allProjects[0] : studioData[s][0];
    setProject(first); setAccount(first.account); setToken(first.token); setRoom(first.roomPrefix); setSerial('01'); setGenerated(false);
  };

  const handleProjectChange = (id: string) => {
    const pool = activeStudio === ALL_STUDIO ? allProjects : studioData[activeStudio];
    const p = pool.find(x => x.id === id)!;
    setProject(p); setAccount(p.account); setToken(p.token); setRoom(p.roomPrefix); setSerial('01'); setGenerated(false);
  };

  const makeLinks = (env: string): GeneratedLink[] => {
    const path = platform === 'pch5' ? '/pch5/index.html' : '/h5/index.html';
    const query = `?account=${account}&token=${token}&roomid=${room}${serial}`;
    const urlMap: Record<string, string> = {
      DEV:  `http://${project.id}-game-client-frontend.trevi-dev.cc${path}${query}`,
      STG:  `https://${project.id}-game-client.trevi-stage.cc:${stgPort}${path}${query}`,
      UAT:  `https://${project.id}-game-client.reelx.fun${path}${query}`,
      PROD: `https://prod-${project.id}-game-client.reelx.fun${path}${query}`,
    };
    return [{ title: '', icon: null, url: urlMap[env], desc: '' }];
  };

  const generate = () => {
    setEnvGroups([
      { env: 'DEV',  label: 'Development',    borderClass: 'border-sky-500/40',    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',         links: makeLinks('DEV') },
      { env: 'STG',  label: 'Staging',         borderClass: 'border-violet-500/40', badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/30', links: makeLinks('STG') },
      { env: 'UAT',  label: 'User Acceptance', borderClass: 'border-amber-500/40',  badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',   links: makeLinks('UAT') },
      { env: 'PROD', label: 'Production',      borderClass: 'border-rose-500/40',   badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',      links: makeLinks('PROD') },
    ]);
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
          <Link2 size={15} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">直連帳號連結</h1>
      </div>

      {/* Studio tabs */}
      <div className="space-y-2">
        <div className="inline-flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50">
          {[ALL_STUDIO, ...studioList].map(s => (
            <button key={s} onClick={() => handleStudioChange(s)}
              className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activeStudio === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}>
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* Form */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-5">

        {/* 對應專案 + H5/PCH5 + 進階設定 同一列，專案太多會換行 */}
        <div className="flex items-start gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap pt-1.5">對應專案</span>
          <div className="flex gap-1.5 flex-wrap items-center flex-1">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => handleProjectChange(p.id)}
                className={`flex items-center gap-1.5 py-1 px-3 text-xs font-bold rounded-lg border transition-all ${
                  project.id === p.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900/60 text-slate-500 border-slate-700/50 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <ProjectIcon id={p.id} />
                {p.id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* 進階設定 checkbox */}
            <div
              onClick={() => setShowAdv(v => !v)}
              className="flex items-center gap-1.5 cursor-pointer select-none"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${showAdv ? 'bg-amber-500 border-amber-500' : 'border-slate-600 hover:border-amber-400'}`}>
                {showAdv && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="text-xs font-bold text-slate-400">進階設定</span>
            </div>
            {/* H5 / PCH5 */}
            <div className="flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50">
              {(['h5', 'pch5'] as const).map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all uppercase ${
                    platform === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 基礎設定：Account、Token、房間流水號 橫向 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Account</label>
            <input type="text" value={account} onChange={e => handleAccountChange(e.target.value)} placeholder="帳號"
              className="w-full bg-slate-950/60 border border-amber-500/50 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Token</label>
            <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Token"
              className="w-full bg-slate-950/60 border border-amber-500/50 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">房間流水號</label>
            <input type="text" value={serial} onChange={e => setSerial(e.target.value)} placeholder="例如：01"
              className="w-full bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>

          {/* 進階設定欄位（Account 底下，勾選後出現） */}
          {showAdv && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">STG Port</label>
                <input type="text" value={stgPort} onChange={e => setStgPort(e.target.value)} placeholder="30907"
                  className="w-full bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">房間前綴</label>
                <input type="text" value={room} onChange={e => setRoom(e.target.value)} placeholder="例如：PP"
                  className="w-full bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
            </>
          )}
        </div>

      </div>
      <button onClick={generate}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2">
        <Zap size={15} /> 立即生成連結
      </button>

      {/* Results */}
      {generated && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">生成結果</p>
          <div className="grid grid-cols-2 gap-4">
            {envGroups.map(g => (
              <div key={g.env} className={`bg-slate-900/30 border-2 ${g.borderClass} rounded-2xl p-5 flex flex-col gap-4`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${g.badgeClass}`}>{g.env}</span>
                  <span className="text-xs text-slate-600 font-medium">{g.label}</span>
                </div>
                <div className="space-y-3">
                  {g.links.map((l, i) => (
                    <div key={i} className="bg-slate-950/40 rounded-xl p-3">
                      <p className="text-sm font-mono text-slate-300 break-all mb-1">{l.url}</p>
                      <CopyGoButtons url={l.url} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
