"use client";

import React, { useState, useCallback } from 'react';
import { Search, Activity, FileText, Link2, ChevronDown } from 'lucide-react';

import {
  wikiDocs, studioGroups, WikiDoc, Mode,
} from './wikiData';
import { WikiCardGrid, CategoryCardGrid } from './WikiComponents';
import { HomeView } from './HomeView';
import { LinkGenerator } from './LinkGenerator';
import { PayoutCalc } from './PayoutCalc';
import { RTPConverter } from './RTPConverter';

// ─── Main App ─────────────────────────────────────────────────────────────────

const FONT_STYLE = {
  fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
  fontSize: '140%',
};

const LLMWiki: React.FC = () => {
  const [mode, setMode]                         = useState<Mode>('project');
  const [selectedGroup, setSelectedGroup]       = useState<string>('');
  const [selectedSubTitle, setSelectedSubTitle] = useState<string>('');
  const [selectedProject, setSelectedProject]   = useState<string>('PP01');
  const [searchQuery, setSearchQuery]           = useState('');
  const [showHome, setShowHome]                 = useState(true);
  const [isToolbox, setIsToolbox]               = useState(false);
  const [openSections, setOpenSections]         = useState<string[]>(['產品規格', '測試規範', '測試報告']);
  const [toolPage, setToolPage]                 = useState<'link' | 'calc'>('link');
  const [openCalc, setOpenCalc]                 = useState(false);
  const [calcTool, setCalcTool]                 = useState<string>('');

  const categoryStructure = [...new Set(wikiDocs.map(d => d.section))].map(section => ({
    section,
    titles: [...new Set(wikiDocs.filter(d => d.section === section).map(d => d.title))],
  }));

  const groupedDocs = useCallback(() => {
    const groups: Record<string, WikiDoc[]> = {};
    wikiDocs
      .filter(d => !searchQuery || d.title.includes(searchQuery))
      .forEach(doc => {
        const g = doc.studio;
        if (!groups[g]) groups[g] = [];
        groups[g].push(doc);
      });
    return groups;
  }, [searchQuery]);

  const goHome = () => {
    setShowHome(true); setIsToolbox(false);
    setSelectedGroup(''); setSelectedSubTitle('');
  };

  const handleProjectSelect = (p: string) => {
    setSelectedProject(p); setShowHome(false); setIsToolbox(false);
  };

  const handleGroupSelect = (g: string) => {
    setSelectedGroup(g); setShowHome(false); setIsToolbox(false);
  };

  const modeTabs: { key: Mode; label: string }[] = [
    { key: 'project',  label: '依專案' },
    { key: 'category', label: '依類別' },
  ];

  const projectDocs = wikiDocs.filter(d =>
    d.project === selectedProject || d.project.split('、').includes(selectedProject)
  );

  const renderNav = () => {
    if (isToolbox) return (
      <div className="space-y-1">
        {/* 前端 / 後台連結 */}
        <div className="px-3 pt-1 pb-1 flex items-center gap-1.5">
          <span className="text-yellow-400 text-xs">☆</span>
          <span className="text-xs font-extrabold text-slate-100 tracking-wide">前端 / 後台連結</span>
        </div>
        <button
          onClick={() => { setToolPage('link'); setCalcTool(''); }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${toolPage === 'link' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}`}
        >
          <Link2 size={15} className="flex-shrink-0" />
          <span className="text-[0.85rem] font-medium">客戶端連結</span>
        </button>

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

    if (mode === 'project') return (
      <>
        {studioGroups.map(({ studio, projects }) => {
          const isActive = projects.includes(selectedProject);
          return (
            <div key={studio}>
              <button
                onClick={() => handleProjectSelect(projects[0])}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-blue-600/10 border border-blue-300' : 'hover:bg-slate-800/40'}`}
              >
                <span className={`text-sm font-extrabold tracking-wide ${isActive ? 'text-blue-300' : 'text-slate-100'}`}>
                  <span className="text-yellow-400 mr-2">☆</span> {studio}
                </span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${isActive ? 'text-blue-400 rotate-180' : 'text-slate-500'}`} />
              </button>
              {isActive && (
                <div className="mb-1 space-y-0.5">
                  {projects.map(p => (
                    <button
                      key={p}
                      onClick={() => handleProjectSelect(p)}
                      className={`w-full text-left pl-8 pr-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedProject === p
                          ? 'bg-blue-500/20 text-blue-200 font-extrabold text-sm ring-1 ring-inset ring-blue-400/50'
                          : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </>
    );

    if (mode === 'category') return (
      <>
        {categoryStructure.map(({ section, titles }) => {
          const isOpen = openSections.includes(section);
          return (
            <div key={section}>
              <button
                onClick={() => setOpenSections(prev =>
                  prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
                )}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${selectedGroup === section ? 'bg-blue-600/10 border border-blue-300' : 'hover:bg-slate-800/40'}`}
              >
                <span className={`text-sm font-extrabold tracking-wide ${selectedGroup === section ? 'text-blue-300' : 'text-slate-100'}`}>
                  <span className="text-yellow-400 mr-2">☆</span> {section}
                </span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'text-blue-400 rotate-180' : 'text-slate-500'}`} />
              </button>
              {isOpen && (
                <div className="mb-1 space-y-0.5">
                  {titles.map(title => (
                    <button
                      key={title}
                      onClick={() => {
                        setSelectedGroup(section);
                        setSelectedSubTitle(title);
                        setShowHome(false);
                        setIsToolbox(false);
                      }}
                      className={`w-full text-left pl-8 pr-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSubTitle === title && selectedGroup === section
                          ? 'bg-blue-500/20 text-blue-200 font-extrabold text-sm ring-1 ring-inset ring-blue-400/50'
                          : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </>
    );

    return (
      <>
        {Object.entries(groupedDocs()).map(([group]) => (
          <button
            key={group}
            onClick={() => handleGroupSelect(group)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedGroup === group
                ? 'bg-blue-600/10 text-blue-400'
                : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
            }`}
          >
            {group}
          </button>
        ))}
      </>
    );
  };

  const renderContent = () => {
    if (showHome) return <HomeView />;
    if (isToolbox && toolPage === 'calc' && calcTool) return (
      <div className="space-y-6">
        {calcTool === '賠付計算' ? (
          <PayoutCalc />
        ) : calcTool === 'RTP 轉換' ? (
          <RTPConverter />
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">{calcTool}</h1>
            <p className="text-slate-600 text-xs">功能開發中，敬請期待</p>
          </div>
        )}
      </div>
    );
    if (isToolbox) return <LinkGenerator />;
    if (mode === 'project') return (
      <WikiCardGrid mode="project" groupKey={selectedProject} docs={projectDocs} />
    );
    if (mode === 'category' && selectedSubTitle) return (
      <CategoryCardGrid section={selectedGroup} subTitle={selectedSubTitle} />
    );
    if (mode === 'function' && selectedGroup) return (
      <WikiCardGrid mode={mode} groupKey={selectedGroup} docs={groupedDocs()[selectedGroup] ?? []} />
    );
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-4">
          <FileText size={22} className="text-slate-600" />
        </div>
        <p className="text-slate-400 font-bold text-sm mb-1">請從左側選擇分類</p>
        <p className="text-slate-600 text-xs">點擊標題顯示對應文件</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-[#0b0f1a] text-slate-200 overflow-hidden" style={FONT_STYLE}>

      <aside className="w-80 border-r border-slate-800/60 flex flex-col bg-[#0d121f] flex-shrink-0">
        <div className="p-6 border-b border-slate-800/40 flex items-center justify-center">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          <button onClick={goHome}>
            <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '1.3rem', fontWeight: 700, color: 'white', letterSpacing: '0.02em', lineHeight: 1.2 }}>
              The Bug Hunter's Diary
            </h1>
          </button>
        </div>

        <div className="px-4 pt-4 pb-3">
          <div className="flex p-1 bg-slate-950/60 rounded-xl border border-slate-800/50 gap-0.5">
            {modeTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setMode(tab.key); setShowHome(false); setIsToolbox(false);
                  if (tab.key === 'category') {
                    const firstSection = [...new Set(wikiDocs.map(d => d.section))][0] ?? '';
                    const firstTitle = [...new Set(wikiDocs.filter(d => d.section === firstSection).map(d => d.title))][0] ?? '';
                    setSelectedGroup(firstSection);
                    setSelectedSubTitle(firstTitle);
                  } else {
                    setSelectedGroup(''); setSelectedSubTitle('');
                  }
                  if (tab.key === 'project') setSelectedProject('PP01');
                }}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-bold rounded-lg transition-all ${
                  !isToolbox && mode === tab.key && !showHome
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pb-3">
          <button
            onClick={() => { setIsToolbox(true); setShowHome(false); setSelectedGroup(''); setSelectedSubTitle(''); }}
            className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-bold ${
              isToolbox
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/30'
                : 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/20'
            }`}
          >
            <Activity size={14} />
            快捷工具
          </button>
        </div>
        <div className="mx-4 mb-3 h-px bg-slate-800/60" />

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 py-1">
          {renderNav()}
        </nav>

        <div className="p-4 border-t border-slate-800/60 bg-[#0b0f1a] min-h-[56px]" />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#0b0f1a]">
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-8 bg-[#0b0f1a]/60 backdrop-blur-xl z-20 flex-shrink-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜尋文件..."
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/5 transition-all text-slate-200 placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-slate-950 hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all">
              建立文件
            </button>
          </div>
        </header>

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
