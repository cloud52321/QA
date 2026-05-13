"use client";

import React, { useState } from 'react';
import { Link2, Zap, ExternalLink, ChevronDown } from 'lucide-react';
import { studioData, studioList, ProjectInfo } from './wikiData';

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
  const [activeStudio, setActiveStudio] = useState(studioList[0]);
  const projects = studioData[activeStudio];
  const firstProject = projects[0];

  const [project,  setProject]   = useState<ProjectInfo>(firstProject);
  const [account,  setAccount]   = useState(firstProject.account);
  const [token,    setToken]     = useState(firstProject.token);
  const [room,     setRoom]      = useState(firstProject.roomPrefix);
  const [serial,   setSerial]    = useState('01');
  const [platform, setPlatform]  = useState<'h5' | 'pch5'>('h5');
  const [envGroups, setEnvGroups] = useState<EnvGroup[]>([]);
  const [generated, setGenerated] = useState(false);

  const handleStudioChange = (s: string) => {
    setActiveStudio(s);
    const first = studioData[s][0];
    setProject(first); setAccount(first.account); setToken(first.token); setRoom(first.roomPrefix); setSerial('01'); setGenerated(false);
  };

  const handleProjectChange = (id: string) => {
    const p = studioData[activeStudio].find(x => x.id === id)!;
    setProject(p); setAccount(p.account); setToken(p.token); setRoom(p.roomPrefix); setSerial('01'); setGenerated(false);
  };

  const makeLinks = (env: string): GeneratedLink[] => {
    const path = platform === 'pch5' ? '/pch5/index.html' : '/h5/index.html';
    const query = `?account=${account}&token=${token}&roomid=${room}${serial}`;
    const urlMap: Record<string, string> = {
      DEV:  `http://${project.id}-game-client-frontend.trevi-dev.cc${path}${query}`,
      STG:  `https://${project.id}-game-client.trevi-stage.cc:30904${path}${query}`,
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
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
            <Link2 size={15} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">客戶端連結</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">輸入測試參數，一鍵生成各環境連結</p>
      </div>

      {/* Studio tabs */}
      <div className="space-y-2">
        <div className="inline-flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50">
          {studioList.map(s => (
            <button key={s} onClick={() => handleStudioChange(s)}
              className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activeStudio === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* 對應專案 sub-tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-slate-300 whitespace-nowrap">對應專案</span>
          <div className="flex gap-1.5 flex-wrap">
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
      </div>

      {/* Form */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        {/* 平台切換（右上角） */}
        <div className="flex justify-end mb-4">
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

        <div className="grid grid-cols-2 gap-6">

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-300 border-b border-slate-800 pb-2">帳戶資訊</p>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Account</label>
              <input type="text" value={account} onChange={e => setAccount(e.target.value)} placeholder="帳號"
                className="w-full bg-slate-950/60 border border-amber-500/50 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Token</label>
              <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Token"
                className="w-full bg-slate-950/60 border border-amber-500/50 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all" />
            </div>
          </div>

          <div className="space-y-3 flex flex-col">
            <p className="text-sm font-bold text-slate-300 border-b border-slate-800 pb-2">房間設定</p>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">房間前綴</label>
              <input type="text" value={room} onChange={e => setRoom(e.target.value)} placeholder="例如：PP"
                className="w-full bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">房間流水號</label>
              <input type="text" value={serial} onChange={e => setSerial(e.target.value)} placeholder="例如：01"
                className="w-full bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
            <button onClick={generate}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 mt-auto">
              <Zap size={15} /> 立即生成連結
            </button>
          </div>

        </div>
      </div>

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
