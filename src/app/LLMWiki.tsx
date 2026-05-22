"use client";

import React, { useState } from 'react';
import { BookOpen, Zap, FileText, Link2, Home } from 'lucide-react';

import {
  wikiDocs, studioGroups, WikiDoc, Mode,
} from './wikiData';
import { WikiCardGrid, CategoryCardGrid } from './WikiComponents';
import { HomeView } from './HomeView';
import { LinkGenerator } from './LinkGenerator';
import { BackendLinks } from './BackendLinks';
import { PayoutCalc } from './PayoutCalc';
import { RTPConverter } from './RTPConverter';

const FONT_STYLE = {
  fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  fontSize: '140%',
};

const LLMWiki: React.FC = () => {
  const [mode, setMode]                         = useState<Mode>('project');
  const [selectedGroup, setSelectedGroup]       = useState<string>('');
  const [selectedSubTitle, setSelectedSubTitle] = useState<string>('');
  const [selectedProject, setSelectedProject]   = useState<string>('PP01');
  const [showHome, setShowHome]                 = useState(true);
  const [isToolbox, setIsToolbox]               = useState(false);
  const [selectedStudio, setSelectedStudio]     = useState<string>(studioGroups[0]?.studio ?? '');
  const [toolPage, setToolPage]                 = useState<'link' | 'calc' | 'sandbox' | 'backend' | 'control' | 'log'>('link');
  const [calcTool, setCalcTool]                 = useState<string>('');

  const categoryStructure = [...new Set(wikiDocs.map(d => d.section))].map(section => ({
    section,
    titles: [...new Set(wikiDocs.filter(d => d.section === section).map(d => d.title))],
  }));

  const goHome = () => {
    setShowHome(true); setIsToolbox(false);
    setSelectedGroup(''); setSelectedSubTitle('');
  };

  const handleStudioSelect = (studio: string) => {
    setSelectedStudio(studio);
    const sg = studioGroups.find(s => s.studio === studio);
    if (sg) { setSelectedProject(sg.projects[0]); }
    setShowHome(false); setIsToolbox(false);
  };

  const handleProjectSelect = (p: string) => {
    setSelectedProject(p); setShowHome(false); setIsToolbox(false);
  };

  const projectDocs = wikiDocs.filter(d =>
    d.project === selectedProject || d.project.split('、').includes(selectedProject)
  );

  const currentStudioProjects = studioGroups.find(s => s.studio === selectedStudio)?.projects ?? [];

  const PROJECT_ICON: Record<string, string> = {
    TG102: '🔴', TG104: '⚡', TG112: '🃏', TG114: '🛺',
    TG116: '🧙', TG118: '🪙', TG120: '🧙', TG122: '🪙', TG124: '🪙',
    TG126: '♠️', TG128: '🧙', TG130: '🪙',
    TG103: '🍒', TG105: '🍿', TG107: '🧙', TG109: '🎯',
    TG111: '🐣',  TG115: '🏀', TG117: '💥',
    TG139: '💯', TG119: '⚽', TG121: '🚀', TG123: '🎈', TG125: '🏎️',
  };

  const PROJECT_SVG_ICON: Record<string, React.ReactNode> = {
    TG001: (
      <svg width="22" height="22" viewBox="0 0 88 100">
        <path d="M8,20 C14,4 22,12 18,26" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="18" cy="26" r="5" fill="#fde047"/>
        <line x1="18" y1="26" x2="26" y2="18" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="26" x2="28" y2="28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="44" cy="58" r="36" fill="#111827" stroke="#374151" strokeWidth="2"/>
        <circle cx="34" cy="46" r="8" fill="white" opacity="0.1"/>
        <rect x="38" y="20" width="12" height="8" rx="3" fill="#374151"/>
      </svg>
    ),
    TG002: (
      <svg width="22" height="22" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="42" fill="#ea580c"/>
        <line x1="44" y1="2" x2="44" y2="86" stroke="#1c1917" strokeWidth="3"/>
        <line x1="2" y1="44" x2="86" y2="44" stroke="#1c1917" strokeWidth="3"/>
        <path d="M44,2 C20,16 20,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/>
        <path d="M44,2 C68,16 68,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/>
        <circle cx="44" cy="44" r="42" fill="none" stroke="#c2410c" strokeWidth="2"/>
        <ellipse cx="32" cy="28" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-25,32,28)"/>
      </svg>
    ),
    TG110: (
      <svg width="22" height="22" viewBox="0 0 88 88">
        <ellipse cx="48" cy="48" rx="38" ry="38" fill="#92400e" opacity="0.4"/>
        <circle cx="44" cy="44" r="38" fill="#f59e0b"/>
        <circle cx="44" cy="44" r="38" fill="none" stroke="#d97706" strokeWidth="4"/>
        <circle cx="44" cy="44" r="28" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
        <text x="45" y="56" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="140" fontWeight="900" fill="#78350f">₱</text>
        <ellipse cx="30" cy="28" rx="10" ry="6" fill="white" opacity="0.25" transform="rotate(-35,30,28)"/>
      </svg>
    ),
    TG106: (
      <svg width="22" height="22" viewBox="0 0 88 88">
        <defs>
          <radialGradient id="ball-shine" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="44" cy="44" r="42" fill="#1a1a2e" stroke="#3b3b6e" strokeWidth="2"/>
        <circle cx="44" cy="44" r="42" fill="url(#ball-shine)"/>
        <circle cx="44" cy="44" r="18" fill="white"/>
        <text x="44" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#111">8</text>
      </svg>
    ),
    TG108: (
      <svg width="22" height="22" viewBox="0 0 88 76">
        <ellipse cx="44" cy="38" rx="42" ry="36" fill="#f9a8c9" stroke="#e879a0" strokeWidth="1"/>
        <ellipse cx="44" cy="46" rx="25" ry="19" fill="#f472b6" stroke="#db2777" strokeWidth="0.5"/>
        <ellipse cx="35" cy="48" rx="7" ry="8" fill="#c2185b"/>
        <ellipse cx="53" cy="48" rx="7" ry="8" fill="#c2185b"/>
        <circle cx="28" cy="24" r="5" fill="#1a1a1a"/>
        <circle cx="60" cy="24" r="5" fill="#1a1a1a"/>
        <circle cx="30" cy="22" r="1.5" fill="white"/>
        <circle cx="62" cy="22" r="1.5" fill="white"/>
      </svg>
    ),
    TG111: (
      <svg width="22" height="22" viewBox="0 0 88 96">
        <circle cx="30" cy="18" r="9" fill="#ef4444"/>
        <circle cx="18" cy="12" r="10" fill="#ef4444"/>
        <circle cx="6" cy="18" r="9" fill="#ef4444"/>
        <ellipse cx="30" cy="52" rx="30" ry="32" fill="white" stroke="#f3f4f6" strokeWidth="1.5"/>
        <path d="M4,44 L-16,48 L4,54 Z" fill="#f59e0b"/>
        <ellipse cx="2" cy="66" rx="8" ry="10" fill="#ef4444"/>
        <circle cx="42" cy="44" r="11" fill="#1a1a1a"/>
        <circle cx="39" cy="41" r="4" fill="white"/>
        <circle cx="20" cy="58" r="10" fill="#fda4af" opacity="0.5"/>
      </svg>
    ),
    TG113: (
      <svg width="22" height="22" viewBox="0 0 88 96">
        <rect x="4" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
        <rect x="22" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
        <rect x="40" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
        <rect x="58" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
        <rect x="2" y="28" width="76" height="60" rx="4" fill="#9b8fe0"/>
        <path d="M30,88 L30,60 Q30,48 44,48 Q58,48 58,60 L58,88 Z" fill="#3730a3"/>
        <rect x="8" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/>
        <rect x="54" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/>
        <line x1="44" x2="44" y1="28" y2="6" stroke="#e11d48" strokeWidth="2"/>
        <path d="M44,6 L60,14 L44,22 Z" fill="#e11d48"/>
      </svg>
    ),
    TG125: (
      <svg width="22" height="22" viewBox="0 0 88 100">
        <path d="M16,58 Q10,88 20,96 L44,80 L68,96 Q78,88 72,58 Z" fill="#4a1d6e"/>
        <circle cx="44" cy="44" r="32" fill="#fde8d0"/>
        <path d="M16,52 Q24,16 44,14 Q64,16 72,52 Q64,40 44,38 Q24,40 16,52Z" fill="#3d2c6e"/>
        <path d="M36,38 L44,26 L52,38 Z" fill="#3d2c6e"/>
        <circle cx="34" cy="44" r="6" fill="#ff3366"/>
        <circle cx="54" cy="44" r="6" fill="#ff3366"/>
        <circle cx="35" cy="42" r="2" fill="#ff9999"/>
        <circle cx="55" cy="42" r="2" fill="#ff9999"/>
        <rect x="30" y="58" width="6" height="10" rx="3" fill="white"/>
        <rect x="46" y="58" width="6" height="10" rx="3" fill="white"/>
        <path d="M16,58 L28,46 L44,54 L60,46 L72,58" fill="none" stroke="#cc3366" strokeWidth="2"/>
      </svg>
    ),
    TG107: (
      <svg width="22" height="22" viewBox="0 0 88 100">
        <path d="M16,58 Q12,90 22,96 L44,80 L66,96 Q76,90 72,58 Z" fill="#4c1d95"/>
        <circle cx="44" cy="44" r="32" fill="#3730a3"/>
        <path d="M18,48 Q20,34 44,34 Q68,34 70,48 Q68,58 44,58 Q20,58 18,48Z" fill="#d4956a"/>
        <circle cx="32" cy="46" r="5" fill="#1a1a1a"/>
        <circle cx="56" cy="46" r="5" fill="#1a1a1a"/>
        <circle cx="33" cy="44" r="1.5" fill="white"/>
        <circle cx="57" cy="44" r="1.5" fill="white"/>
        <rect x="38" y="14" width="12" height="8" rx="3" fill="#a855f7"/>
        <path d="M38,22 L28,34 M50,22 L60,34" stroke="#a855f7" strokeWidth="3"/>
      </svg>
    ),
  };

  // ── 左側 Nav ──────────────────────────────────────────────────────────────
  const renderNav = () => {
    if (isToolbox) return (
      <div className="space-y-1">
        {/* 常用連結 */}
        <div className="px-3 pt-1 pb-1 flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">☆</span>
          <span className="text-xs font-extrabold text-slate-100 tracking-wide">常用連結</span>
        </div>
        <div className="space-y-0.5">
          {[
            { key: 'link',     label: '直連帳號連結', icon: <Link2 size={13} /> },
            { key: 'sandbox',  label: '沙盒帳號連結', icon: <Link2 size={13} /> },
            { key: 'backend',  label: '後台連結',     icon: <Link2 size={13} /> },
            { key: 'control',  label: '控版連結',     icon: <Link2 size={13} /> },
            { key: 'log',      label: 'Log 查詢連結', icon: <Link2 size={13} /> },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => { setToolPage(item.key as typeof toolPage); setCalcTool(''); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                toolPage === item.key ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              {item.icon}
              <span className="text-[0.85rem] font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 計算工具 */}
        <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">☆</span>
          <span className="text-xs font-extrabold text-slate-100 tracking-wide">計算工具</span>
        </div>
        <div className="space-y-0.5">
          {['賠付計算', 'RTP 轉換'].map(name => (
            <button
              key={name}
              onClick={() => { setToolPage('calc'); setCalcTool(name); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-[0.85rem] font-medium transition-all ${
                calcTool === name
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );

    // 知識庫模式：只顯示 Studio 列表
    return (
      <>
        {studioGroups.map(({ studio }) => (
          <button
            key={studio}
            onClick={() => handleStudioSelect(studio)}
            className={`w-full flex items-center px-3 py-2 rounded-xl transition-all ${
              selectedStudio === studio && !showHome && !isToolbox
                ? 'bg-blue-600/10 border border-blue-300 text-blue-300'
                : 'text-slate-100 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-yellow-400 mr-2 text-xs">☆</span>
            <span className="text-sm font-extrabold tracking-wide">{studio}</span>
          </button>
        ))}
      </>
    );
  };

  // ── 右側主內容 ────────────────────────────────────────────────────────────
  const renderContent = () => {
    if (showHome) return <HomeView />;

    if (isToolbox && toolPage === 'calc' && calcTool) return (
      <div className="space-y-6">
        {calcTool === '賠付計算' ? <PayoutCalc /> : calcTool === 'RTP 轉換' ? <RTPConverter /> : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">{calcTool}</h1>
            <p className="text-slate-600 text-xs">功能開發中，敬請期待</p>
          </div>
        )}
      </div>
    );
    if (isToolbox && toolPage === 'sandbox') return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <h1 className="text-xl font-extrabold text-white tracking-tight">沙盒帳號連結</h1>
        <p className="text-slate-600 text-xs">功能開發中，敬請期待</p>
      </div>
    );
    if (isToolbox && toolPage === 'backend') return <BackendLinks />;
    if (isToolbox && (toolPage === 'control' || toolPage === 'log')) return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          {toolPage === 'control' ? '控版連結' : 'Log 查詢連結'}
        </h1>
        <p className="text-slate-600 text-xs">功能開發中，敬請期待</p>
      </div>
    );
    if (isToolbox) return <LinkGenerator />;

    // 知識庫模式
    const modeTabs: { key: Mode; label: string }[] = [
      { key: 'project', label: '依專案' },
      { key: 'category', label: '依類別' },
    ];

    return (
      <div className="space-y-6">
        {/* 上方標題 */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-lg">★</span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedStudio}</h2>
        </div>

        {/* 頂部 tab + 卡片列 */}
        <div>
          {/* 依專案 / 依類別 tab */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex p-1 bg-slate-950/60 rounded-xl border border-slate-800/50 gap-0.5">
              {modeTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setMode(tab.key);
                    if (tab.key === 'category') {
                      const firstSection = categoryStructure[0]?.section ?? '';
                      const firstTitle = categoryStructure[0]?.titles[0] ?? '';
                      setSelectedGroup(firstSection);
                      setSelectedSubTitle(firstTitle);
                    }
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    mode === tab.key
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 依專案：固定顯示 Project 卡片 */}
          {mode === 'project' && (
            <div className="flex gap-2 flex-wrap mb-6">
              {currentStudioProjects.map(p => (
                <button
                  key={p}
                  onClick={() => handleProjectSelect(p)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                    selectedProject === p
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                      : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:bg-slate-800/60 hover:border-slate-600'
                  }`}
                >
                  {PROJECT_SVG_ICON[p] ? (
                    <span className="flex-shrink-0">{PROJECT_SVG_ICON[p]}</span>
                  ) : PROJECT_ICON[p] ? (
                    <span className="text-base leading-none">{PROJECT_ICON[p]}</span>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={selectedProject === p ? {color:'#fbbf24'} : {color:'#64748b'}}>
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                      <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
                    </svg>
                  )}
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* 依類別：固定顯示 Section → Title 卡片 */}
          {mode === 'category' && (
            <div className="flex gap-2 flex-wrap mb-6">
              {categoryStructure.map(({ section, titles }) => (
                <div key={section} className="flex gap-1.5 flex-wrap">
                  {titles.map(title => (
                    <button
                      key={title}
                      onClick={() => { setSelectedGroup(section); setSelectedSubTitle(title); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                        selectedSubTitle === title && selectedGroup === section
                          ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                          : 'bg-slate-900/60 border-slate-700/50 text-slate-300 hover:bg-slate-800/60 hover:border-slate-600'
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={selectedSubTitle === title && selectedGroup === section ? {color:'#60a5fa'} : {color:'#64748b'}}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
                      </svg>
                      {title}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 內容區 */}
        {mode === 'project' && (
          <WikiCardGrid mode="project" groupKey={selectedProject} docs={projectDocs} />
        )}
        {mode === 'category' && selectedSubTitle && (
          <CategoryCardGrid section={selectedGroup} subTitle={selectedSubTitle} />
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f1629] text-slate-200 overflow-hidden" style={FONT_STYLE}>

      <aside className="w-56 border-r border-slate-800/60 flex flex-col bg-[#131c30] flex-shrink-0">

        {/* Logo */}
        <div className="flex items-center justify-center pt-8 pb-4">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          <button onClick={goHome}>
            <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '0.02em', lineHeight: 1.2, textAlign: 'center' }}>
              The Bug Hunter's Diary
            </h1>
          </button>
        </div>

        {/* 首頁 */}
        <div className="px-3 pb-2">
          <button
            onClick={goHome}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
              showHome ? 'bg-slate-700/60 text-white' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <Home size={16} /> 首頁
          </button>
        </div>

        {/* 知識庫 / 快捷工具 tab */}
        <div className="px-3 pb-2">
          <div className="flex p-1 bg-slate-950/60 rounded-xl border border-slate-800/50 gap-0.5">
            <button
              onClick={() => { setIsToolbox(false); setShowHome(false); if (!selectedStudio) handleStudioSelect(studioGroups[0]?.studio ?? ''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold rounded-lg transition-all ${
                !isToolbox && !showHome ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen size={14} /> 知識庫
            </button>
            <button
              onClick={() => { setIsToolbox(true); setShowHome(false); setSelectedGroup(''); setSelectedSubTitle(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold rounded-lg transition-all ${
                isToolbox ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap size={14} /> 快捷工具
            </button>
          </div>
        </div>
        <div className="mx-3 mb-2 h-px bg-slate-800/60" />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 py-1">
          {renderNav()}
        </nav>
      </aside>

      {/* 內容區 */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0f1629]">
        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-10 py-8">
            {renderContent()}
          </div>
        </div>
      </main>

    </div>
  );
};

export default LLMWiki;
