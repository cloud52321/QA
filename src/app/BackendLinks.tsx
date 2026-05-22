"use client";

import React, { useState } from 'react';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';

// ─── 後台資料 ─────────────────────────────────────────────────────────────────

const BACKENDS = [
  { id: 'PP01', label: 'PP01', sub: '遊戲後台', slug: 'pp-game-backstage' },
  { id: 'PP02', label: 'PP02', sub: '數據中台', slug: 'pp-operations-center' },
  { id: 'PP03', label: 'PP03', sub: '風控後台', slug: 'pp-risk-control' },
];

const ENVS = [
  {
    key: 'DEV', label: 'DEV',
    borderClass: 'border-sky-500/30', badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    buildUrl: (slug: string) => `https://${slug}-frontend.trevi-dev.cc/#/`,
  },
  {
    key: 'STG', label: 'STG',
    borderClass: 'border-violet-500/30', badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    buildUrl: (slug: string) => `https://${slug}-frontend.trevi-stage.cc:30904/${slug.includes('backstage') || slug.includes('risk') ? 'login' : '#/'}`,
  },
  {
    key: 'UAT', label: 'UAT',
    borderClass: 'border-amber-500/30', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    buildUrl: (slug: string) => `https://${slug}.reelx.fun/${slug.includes('operations') ? '#/dashboard' : '#/'}`,
  },
  {
    key: 'PROD', label: 'PROD',
    borderClass: 'border-rose-500/30', badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    buildUrl: (slug: string) => `https://prod-${slug}.reelx.fun/#/`,
  },
];

// ─── 帳號資料 ─────────────────────────────────────────────────────────────────

const SHARED_PASSWORD = 'a1234567';
const ACCOUNTS = [
  { name: 'root1',        isRoot: true },
  { name: 'admin1',       isRoot: false },
  { name: 'custom1',      isRoot: false },
  { name: 'ops1',         isRoot: false },
  { name: 'Opsbygame123', isRoot: false },
  { name: 'qa12',         isRoot: false },
  { name: 'PM12',         isRoot: false },
  { name: 'math1',        isRoot: false },
  { name: 'server1',      isRoot: false },
];

// ─── CopyCell ─────────────────────────────────────────────────────────────────

const CopyCell: React.FC<{ value: string; dim?: boolean }> = ({ value, dim }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 group w-full text-left px-2 py-1 rounded-lg hover:bg-slate-800/60 transition-all ${dim ? 'text-slate-500' : 'text-slate-200'}`}
    >
      <span className="text-sm font-mono flex-1">{value}</span>
      <span className={`text-[9px] font-bold px-1 py-0.5 rounded border flex-shrink-0 transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-600 group-hover:text-slate-400'}`}>
        {copied ? '✓' : '複製'}
      </span>
    </button>
  );
};

// ─── BackendLinks ─────────────────────────────────────────────────────────────

const PwCopyBtn: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(SHARED_PASSWORD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'}`}
    >
      {copied ? '✓' : '複製'}
    </button>
  );
};

export const BackendLinks: React.FC = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
          <ExternalLink size={15} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">後台連結</h1>
      </div>

      <div className="flex gap-6 items-stretch">

        {/* 左側：環境卡片 */}
        <div className="flex-1 space-y-5">
          {ENVS.map(env => (
            <div key={env.key}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${env.badgeClass}`}>{env.label}</span>
                <div className="flex-1 h-px bg-slate-800/60" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {BACKENDS.map(b => (
                  <a
                    key={b.id}
                    href={env.buildUrl(b.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group bg-slate-900/40 border ${env.borderClass} hover:bg-slate-800/60 rounded-xl p-3 transition-all flex flex-col gap-1.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${env.badgeClass}`}>{b.label}</span>
                      <ExternalLink size={11} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{b.sub}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 右側：帳號資訊 */}
        <div className="w-64 flex-shrink-0 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-200 tracking-wide">帳號資訊</span>
          </div>

          {/* 共用密碼 */}
          <div className="px-4 py-3 border-b border-blue-500/15 bg-slate-900/40">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">共用密碼</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-slate-300 flex-1">
                {showPw ? SHARED_PASSWORD : '••••••••'}
              </span>
              <button onClick={() => setShowPw(v => !v)} className="text-slate-500 hover:text-slate-300 transition-colors">
                {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
              <PwCopyBtn />
            </div>
            <p className="text-xs text-slate-600 mt-1">所有帳號皆共用此密碼</p>
          </div>

          {/* 帳號表頭 */}
          <div className="px-4 py-1.5 border-b border-blue-500/15">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account</span>
          </div>

          {/* 帳號列表 */}
          <div className="divide-y divide-slate-800/40">
            {ACCOUNTS.map(acc => (
              <div key={acc.name} className={`flex items-center gap-1 px-2 py-1 ${acc.isRoot ? 'bg-amber-500/5' : ''}`}>
                {acc.isRoot && <span className="text-amber-400 text-sm flex-shrink-0">★</span>}
                <CopyCell value={acc.name} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
