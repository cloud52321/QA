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

        {/* 對應專案 */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">對應專案</span>
          <div className="flex gap-1.5 flex-wrap items-center">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => handleProjectChange(p.id)}
                className={`py-1 px-3 text-xs font-bold rounded-lg border transition-all ${
                  project.id === p.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900/60 text-slate-500 border-slate-700/50 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>

        {/* 頂部：H5/PCH5 + 進階設定勾選 */}
        <div className="flex items-center justify-end gap-4">
          {/* 進階設定 checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setShowAdv(v => !v)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${showAdv ? 'bg-amber-500 border-amber-500' : 'border-slate-600 hover:border-amber-400'}`}
            >
              {showAdv && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="text-xs font-bold text-slate-400">進階設定</span>
          </label>
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
