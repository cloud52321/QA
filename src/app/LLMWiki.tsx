"use client";

import React, { useState } from 'react';
import { BookOpen, Zap, Link2, Home } from 'lucide-react';
import { getTheme } from './themeTokens';

import { wikiDocs, studioGroups, Mode } from './wikiData';
import { WikiCardGrid, CategoryCardGrid } from './WikiComponents';
import { HomeView } from './HomeView';
import { LinkGenerator } from './LinkGenerator';
import { BackendLinks } from './BackendLinks';
import { ControlLinks } from './ControlLinks';
import { PayoutCalc } from './PayoutCalc';
import { RTPConverter } from './RTPConverter';

const LLMWiki: React.FC = () => {
  const [mode, setMode]                         = useState<Mode>('project');
  const [selectedGroup, setSelectedGroup]       = useState<string>('');
  const [selectedSubTitle, setSelectedSubTitle] = useState<string>('');
  const [selectedProject, setSelectedProject]   = useState<string>('PP01');
  const [showHome, setShowHome]                 = useState(true);
  const [isToolbox, setIsToolbox]               = useState(false);
  const [selectedStudio, setSelectedStudio]     = useState<string>(studioGroups[0]?.studio ?? '');
  const [isDark, setIsDark]                     = useState(true);
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

  const T = getTheme(isDark);

  const PROJECT_ICON: Record<string, string> = {
    TG102: '🔴', TG104: '⚡', TG112: '🃏', TG114: '🛺',
    TG116: '🧙', TG118: '🪙', TG120: '🧙', TG122: '🪙', TG124: '🪙',
    TG126: '♠️', TG128: '🧙', TG130: '🪙',
    TG103: '🍒', TG105: '🍿', TG107: '🧙', TG109: '🎯',
    TG111: '🐣', TG115: '🏀', TG117: '💥',
    TG139: '💯', TG119: '⚽', TG121: '🚀', TG123: '🎈', TG125: '🏎️',
  };

  const PROJECT_SVG_ICON: Record<string, React.ReactNode> = {
    TG001: (<svg width="22" height="22" viewBox="0 0 88 100"><path d="M8,20 C14,4 22,12 18,26" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round"/><circle cx="18" cy="26" r="5" fill="#fde047"/><line x1="18" y1="26" x2="26" y2="18" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="26" x2="28" y2="28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/><circle cx="44" cy="58" r="36" fill="#111827" stroke="#374151" strokeWidth="2"/><circle cx="34" cy="46" r="8" fill="white" opacity="0.1"/><rect x="38" y="20" width="12" height="8" rx="3" fill="#374151"/></svg>),
    TG002: (<svg width="22" height="22" viewBox="0 0 88 88"><circle cx="44" cy="44" r="42" fill="#ea580c"/><line x1="44" y1="2" x2="44" y2="86" stroke="#1c1917" strokeWidth="3"/><line x1="2" y1="44" x2="86" y2="44" stroke="#1c1917" strokeWidth="3"/><path d="M44,2 C20,16 20,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/><path d="M44,2 C68,16 68,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/><circle cx="44" cy="44" r="42" fill="none" stroke="#c2410c" strokeWidth="2"/><ellipse cx="32" cy="28" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-25,32,28)"/></svg>),
    TG110: (<svg width="22" height="22" viewBox="0 0 88 88"><ellipse cx="48" cy="48" rx="38" ry="38" fill="#92400e" opacity="0.4"/><circle cx="44" cy="44" r="38" fill="#f59e0b"/><circle cx="44" cy="44" r="38" fill="none" stroke="#d97706" strokeWidth="4"/><circle cx="44" cy="44" r="28" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/><text x="45" y="56" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="140" fontWeight="900" fill="#78350f">₱</text><ellipse cx="30" cy="28" rx="10" ry="6" fill="white" opacity="0.25" transform="rotate(-35,30,28)"/></svg>),
    TG106: (<svg width="22" height="22" viewBox="0 0 88 88"><defs><radialGradient id="ball-shine" cx="35%" cy="30%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.4"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs><circle cx="44" cy="44" r="42" fill="#1a1a2e" stroke="#3b3b6e" strokeWidth="2"/><circle cx="44" cy="44" r="42" fill="url(#ball-shine)"/><circle cx="44" cy="44" r="18" fill="white"/><text x="44" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#111">8</text></svg>),
    TG108: (<svg width="22" height="22" viewBox="0 0 88 76"><ellipse cx="44" cy="38" rx="42" ry="36" fill="#f9a8c9" stroke="#e879a0" strokeWidth="1"/><ellipse cx="44" cy="46" rx="25" ry="19" fill="#f472b6" stroke="#db2777" strokeWidth="0.5"/><ellipse cx="35" cy="48" rx="7" ry="8" fill="#c2185b"/><ellipse cx="53" cy="48" rx="7" ry="8" fill="#c2185b"/><circle cx="28" cy="24" r="5" fill="#1a1a1a"/><circle cx="60" cy="24" r="5" fill="#1a1a1a"/><circle cx="30" cy="22" r="1.5" fill="white"/><circle cx="62" cy="22" r="1.5" fill="white"/></svg>),
    TG111: (<svg width="22" height="22" viewBox="0 0 88 96"><circle cx="30" cy="18" r="9" fill="#ef4444"/><circle cx="18" cy="12" r="10" fill="#ef4444"/><circle cx="6" cy="18" r="9" fill="#ef4444"/><ellipse cx="30" cy="52" rx="30" ry="32" fill="white" stroke="#f3f4f6" strokeWidth="1.5"/><path d="M4,44 L-16,48 L4,54 Z" fill="#f59e0b"/><ellipse cx="2" cy="66" rx="8" ry="10" fill="#ef4444"/><circle cx="42" cy="44" r="11" fill="#1a1a1a"/><circle cx="39" cy="41" r="4" fill="white"/><circle cx="20" cy="58" r="10" fill="#fda4af" opacity="0.5"/></svg>),
    TG113: (<svg width="22" height="22" viewBox="0 0 88 96"><rect x="4" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="22" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="40" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="58" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="2" y="28" width="76" height="60" rx="4" fill="#9b8fe0"/><path d="M30,88 L30,60 Q30,48 44,48 Q58,48 58,60 L58,88 Z" fill="#3730a3"/><rect x="8" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/><rect x="54" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/><line x1="44" x2="44" y1="28" y2="6" stroke="#e11d48" strokeWidth="2"/><path d="M44,6 L60,14 L44,22 Z" fill="#e11d48"/></svg>),
    TG125: (<svg width="22" height="22" viewBox="0 0 88 100"><path d="M16,58 Q10,88 20,96 L44,80 L68,96 Q78,88 72,58 Z" fill="#4a1d6e"/><circle cx="44" cy="44" r="32" fill="#fde8d0"/><path d="M16,52 Q24,16 44,14 Q64,16 72,52 Q64,40 44,38 Q24,40 16,52Z" fill="#3d2c6e"/><path d="M36,38 L44,26 L52,38 Z" fill="#3d2c6e"/><circle cx="34" cy="44" r="6" fill="#ff3366"/><circle cx="54" cy="44" r="6" fill="#ff3366"/><circle cx="35" cy="42" r="2" fill="#ff9999"/><circle cx="55" cy="42" r="2" fill="#ff9999"/><rect x="30" y="58" width="6" height="10" rx="3" fill="white"/><rect x="46" y="58" width="6" height="10" rx="3" fill="white"/><path d="M16,58 L28,46 L44,54 L60,46 L72,58" fill="none" stroke="#cc3366" strokeWidth="2"/></svg>),
    TG107: (<svg width="22" height="22" viewBox="0 0 88 100"><path d="M16,58 Q12,90 22,96 L44,80 L66,96 Q76,90 72,58 Z" fill="#4c1d95"/><circle cx="44" cy="44" r="32" fill="#3730a3"/><path d="M18,48 Q20,34 44,34 Q68,34 70,48 Q68,58 44,58 Q20,58 18,48Z" fill="#d4956a"/><circle cx="32" cy="46" r="5" fill="#1a1a1a"/><circle cx="56" cy="46" r="5" fill="#1a1a1a"/><circle cx="33" cy="44" r="1.5" fill="white"/><circle cx="57" cy="44" r="1.5" fill="white"/><rect x="38" y="14" width="12" height="8" rx="3" fill="#a855f7"/><path d="M38,22 L28,34 M50,22 L60,34" stroke="#a855f7" strokeWidth="3"/></svg>),
  };

  // ── 左側 Nav ─────────────────────────────────────────────────────────────────
  const renderNav = () => {
    if (isToolbox) return (
      <div className="space-y-1">
        <div className="px-3 pt-1 pb-1 flex items-center gap-1.5">
          <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>☆</span>
          <span className="text-sm font-extrabold tracking-wide" style={{ color: T.text }}>常用連結</span>
        </div>
        <div className="space-y-0.5">
          {[
            { key: 'link',    label: '直連帳號連結', icon: <Link2 size={13} /> },
            { key: 'sandbox', label: '沙盒帳號連結', icon: <Link2 size={13} /> },
            { key: 'backend', label: '後台連結',     icon: <Link2 size={13} /> },
            { key: 'control', label: '控版連結',     icon: <Link2 size={13} /> },
            { key: 'log',     label: 'Log 查詢連結', icon: <Link2 size={13} /> },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => { setToolPage(item.key as typeof toolPage); setCalcTool(''); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all"
              style={toolPage === item.key
                ? T.navActive
                : { background: 'transparent', color: T.textMuted, border: '1px solid transparent' }
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
          <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>☆</span>
          <span className="text-sm font-extrabold tracking-wide" style={{ color: T.text }}>計算工具</span>
        </div>
        <div className="space-y-0.5">
          {['賠付計算', 'RTP 轉換'].map(name => (
            <button
              key={name}
              onClick={() => { setToolPage('calc'); setCalcTool(name); }}
              className="w-full text-left px-3 py-2 rounded-xl text-[0.85rem] font-medium transition-all"
              style={calcTool === name
                ? T.navActive
                : { background: 'transparent', color: T.textMuted, border: '1px solid transparent' }
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <>
        {studioGroups.map(({ studio }) => (
          <button
            key={studio}
            onClick={() => handleStudioSelect(studio)}
            className="w-full flex items-center px-3 py-2 rounded-xl transition-all"
            style={selectedStudio === studio && !showHome && !isToolbox
              ? T.activeNav
              : { background: 'transparent', color: T.text, border: '1px solid transparent' }
            }
          >
            <span style={{ color: '#f59e0b', marginRight: '0.5rem', fontSize: '0.75rem' }}>☆</span>
            <span className="text-sm font-extrabold tracking-wide">{studio}</span>
          </button>
        ))}
      </>
    );
  };

  // ── 右側主內容 ────────────────────────────────────────────────────────────────
  const placeholderBox = (title: string) => (
    <div className="rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]"
      style={{ background: T.bgCard, border: `1px solid ${T.border}` }}>
      <h1 className="text-xl font-extrabold tracking-tight" style={{ color: T.text }}>{title}</h1>
      <p className="text-xs" style={{ color: T.textFaint }}>功能開發中，敬請期待</p>
    </div>
  );

  const renderContent = () => {
    if (showHome) return <HomeView isDark={isDark} />;

    if (isToolbox && toolPage === 'calc' && calcTool) return (
      <div className="space-y-6">
        {calcTool === '賠付計算' ? <PayoutCalc isDark={isDark} /> : calcTool === 'RTP 轉換' ? <RTPConverter isDark={isDark} /> : placeholderBox(calcTool)}
      </div>
    );
    if (isToolbox && toolPage === 'sandbox') return placeholderBox('沙盒帳號連結');
    if (isToolbox && toolPage === 'backend') return <BackendLinks isDark={isDark} />;
    if (isToolbox && toolPage === 'control') return <ControlLinks isDark={isDark} />;
    if (isToolbox && toolPage === 'log') return placeholderBox('Log 查詢連結');
    if (isToolbox) return <LinkGenerator isDark={isDark} />;

    const modeTabs: { key: Mode; label: string }[] = [
      { key: 'project',  label: '依專案' },
      { key: 'category', label: '依類別' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span style={{ color: '#f59e0b', fontSize: '1.125rem' }}>★</span>
          <h2 className="text-xl font-extrabold tracking-tight" style={{ color: T.text }}>{selectedStudio}</h2>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex p-1 rounded-xl gap-0.5"
              style={{ background: T.bgTabBar, border: `1px solid ${T.borderMid}` }}>
              {modeTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setMode(tab.key);
                    if (tab.key === 'category') {
                      setSelectedGroup(categoryStructure[0]?.section ?? '');
                      setSelectedSubTitle(categoryStructure[0]?.titles[0] ?? '');
                    }
                  }}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg transition-all"
                  style={mode === tab.key ? T.activeBlue : { background: 'transparent', color: T.textMuted }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {mode === 'project' && (
            <div className="flex gap-2 flex-wrap mb-6">
              {currentStudioProjects.map(p => (
                <button
                  key={p}
                  onClick={() => handleProjectSelect(p)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  style={selectedProject === p ? T.activeAmber : T.inactiveBtn}
                >
                  {PROJECT_SVG_ICON[p]
                    ? <span className="flex-shrink-0">{PROJECT_SVG_ICON[p]}</span>
                    : PROJECT_ICON[p]
                      ? <span className="text-base leading-none">{PROJECT_ICON[p]}</span>
                      : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={selectedProject === p ? { color: '#fbbf24' } : { color: '#64748b' }}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
                  }
                  {p}
                </button>
              ))}
            </div>
          )}

          {mode === 'category' && (
            <div className="flex gap-2 flex-wrap mb-6">
              {categoryStructure.map(({ section, titles }) => (
                <div key={section} className="flex gap-1.5 flex-wrap">
                  {titles.map(title => {
                    const isActive = selectedSubTitle === title && selectedGroup === section;
                    return (
                      <button
                        key={title}
                        onClick={() => { setSelectedGroup(section); setSelectedSubTitle(title); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                        style={isActive ? T.activeAmber : T.inactiveBtn}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={isActive ? { color: '#60a5fa' } : { color: '#64748b' }}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
                        </svg>
                        {title}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {mode === 'project' && (
          <WikiCardGrid isDark={isDark} mode="project" groupKey={selectedProject} docs={projectDocs} />
        )}
        {mode === 'category' && selectedSubTitle && (
          <CategoryCardGrid isDark={isDark} section={selectedGroup} subTitle={selectedSubTitle} />
        )}
      </div>
    );
  };

  const wrapperStyle: React.CSSProperties = {
    ...T.fontStyle,
    color: T.text,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: isDark ? '#0a0d14' : '#f7fbff',
    background: isDark
      ? `
        radial-gradient(circle at 15% 8%, rgba(37,99,235,.22), transparent 30%),
        radial-gradient(circle at 86% 10%, rgba(147,51,234,.18), transparent 32%),
        radial-gradient(circle at 50% 105%, rgba(14,165,233,.10), transparent 42%),
        linear-gradient(rgba(148,163,184,.026) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,163,184,.026) 1px, transparent 1px),
        linear-gradient(180deg, #080c14 0%, #101827 100%)
      `
      : `
        radial-gradient(circle at 16% 9%, rgba(96,165,250,.20), transparent 31%),
        radial-gradient(circle at 84% 7%, rgba(196,181,253,.20), transparent 34%),
        radial-gradient(circle at 52% 105%, rgba(125,211,252,.16), transparent 45%),
        linear-gradient(rgba(37,99,235,.026) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37,99,235,.026) 1px, transparent 1px),
        linear-gradient(180deg, #fbfdff 0%, #f3f8ff 48%, #edf6ff 100%)
      `,
    backgroundSize: 'auto, auto, auto, 36px 36px, 36px 36px, auto',
  };

  const backgroundGlowStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: isDark ? 0.9 : 1,
    background: isDark
      ? `
        radial-gradient(ellipse at 22% 88%, rgba(14,165,233,.16), transparent 42%),
        radial-gradient(ellipse at 82% 78%, rgba(99,102,241,.12), transparent 44%)
      `
      : `
        radial-gradient(ellipse at 18% 90%, rgba(147,197,253,.24), transparent 42%),
        radial-gradient(ellipse at 76% 92%, rgba(186,230,253,.22), transparent 44%),
        radial-gradient(ellipse at 52% 100%, rgba(167,243,208,.14), transparent 48%)
      `,
    filter: 'blur(22px)',
  };

  const bottomWaveStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: '62%',
    pointerEvents: 'none',
    zIndex: 0,
    background: isDark
      ? `
        linear-gradient(180deg, transparent 0%, rgba(15,23,42,.18) 34%, rgba(30,64,175,.22) 100%)
      `
      : `
        linear-gradient(180deg, transparent 0%, rgba(219,234,254,.26) 45%, rgba(191,219,254,.40) 100%)
      `,
  };

  const cssPolish = `
    .llmwiki-shell.light main .rounded-2xl,
    .llmwiki-shell.light main .rounded-xl {
      box-shadow: 0 14px 34px rgba(30, 64, 175, .07), inset 0 1px 0 rgba(255,255,255,.85) !important;
      border-color: rgba(147, 197, 253, .42) !important;
    }

    .llmwiki-shell.light main button.rounded-xl,
    .llmwiki-shell.light main button.rounded-2xl,
    .llmwiki-shell.light main div.rounded-xl,
    .llmwiki-shell.light main div.rounded-2xl {
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    .llmwiki-shell.light main > div > div > div:first-child .rounded-2xl,
    .llmwiki-shell.light main > div > div > div:first-child .rounded-xl {
      background-image:
        radial-gradient(circle at 92% 92%, rgba(255,255,255,.55), transparent 30%),
        linear-gradient(135deg, rgba(255,255,255,.82), rgba(255,255,255,.54)) !important;
    }

    .llmwiki-shell.light aside button {
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
    }

    .llmwiki-shell.light main a {
      color: #2563eb !important;
      text-underline-offset: 3px;
    }

    .llmwiki-shell.light main .rounded-xl:hover,
    .llmwiki-shell.light main .rounded-2xl:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 42px rgba(30, 64, 175, .10), inset 0 1px 0 rgba(255,255,255,.9) !important;
    }


    /* 100% pure CSS: large integrated waves, no image, no SVG */
    .pure-css-waves {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 68vh;
      min-height: 560px;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
      isolation: isolate;
    }

    .pure-css-waves .wave {
      position: absolute;
      left: -10%;
      width: 125%;
      transform-origin: center bottom;
      border-top: 1px solid rgba(96, 165, 250, .26);
      box-shadow: 0 -24px 76px rgba(59, 130, 246, .11);
      will-change: transform;
    }

    /* 第一層：從側邊欄高起，往右慢慢降下 */
    .pure-css-waves .wave-1 {
      left: -24%;
      width: 150%;
      bottom: -290px;
      height: 620px;
      border-radius: 58% 42% 0 0 / 62% 30% 0 0;
      background:
        radial-gradient(ellipse at 12% 6%, rgba(255,255,255,.54), transparent 34%),
        linear-gradient(100deg, rgba(96,165,250,.46) 0%, rgba(147,197,253,.32) 42%, rgba(191,219,254,.16) 100%);
      transform: rotate(-9deg) scaleX(1.03);
      opacity: .92;
    }

    /* 第二層：中段大幅度波峰 */
    .pure-css-waves .wave-2 {
      left: -18%;
      width: 142%;
      bottom: -380px;
      height: 720px;
      border-radius: 38% 62% 0 0 / 36% 58% 0 0;
      background:
        radial-gradient(ellipse at 38% 8%, rgba(255,255,255,.42), transparent 38%),
        linear-gradient(108deg, rgba(59,130,246,.34), rgba(125,211,252,.28) 56%, rgba(34,211,238,.13));
      transform: rotate(-4.5deg) scaleX(1.06);
      opacity: .82;
    }

    /* 第三層：右側低波，讓畫面有延伸感 */
    .pure-css-waves .wave-3 {
      left: -4%;
      width: 132%;
      bottom: -470px;
      height: 820px;
      border-radius: 30% 70% 0 0 / 28% 60% 0 0;
      background:
        radial-gradient(ellipse at 82% 5%, rgba(255,255,255,.34), transparent 40%),
        linear-gradient(110deg, rgba(191,219,254,.26), rgba(125,211,252,.30) 52%, rgba(167,243,208,.18));
      transform: rotate(7deg) scaleX(1.08);
      opacity: .72;
    }

    .llmwiki-shell.dark .pure-css-waves .wave {
      border-top-color: rgba(96, 165, 250, .18);
      box-shadow: 0 -28px 84px rgba(2, 132, 199, .13);
    }

    .llmwiki-shell.dark .pure-css-waves .wave-1 {
      background:
        radial-gradient(ellipse at 12% 6%, rgba(37,99,235,.22), transparent 34%),
        linear-gradient(100deg, rgba(30,64,175,.62) 0%, rgba(79,70,229,.36) 44%, rgba(15,23,42,.10) 100%);
      opacity: .90;
    }

    .llmwiki-shell.dark .pure-css-waves .wave-2 {
      background:
        radial-gradient(ellipse at 38% 8%, rgba(168,85,247,.20), transparent 38%),
        linear-gradient(108deg, rgba(67,56,202,.48), rgba(14,165,233,.30) 56%, rgba(15,23,42,.08));
      opacity: .82;
    }

    .llmwiki-shell.dark .pure-css-waves .wave-3 {
      background:
        radial-gradient(ellipse at 82% 5%, rgba(45,212,191,.18), transparent 40%),
        linear-gradient(110deg, rgba(30,64,175,.30), rgba(14,165,233,.34) 52%, rgba(45,212,191,.20));
      opacity: .76;
    }

    .llmwiki-sidebar {
      overflow: hidden;
      isolation: isolate;
    }

    /* 側邊欄使用同一組色系與走向：左側高、右側低，和主畫面接起來 */
    .llmwiki-sidebar::before,
    .llmwiki-sidebar::after {
      content: "";
      position: absolute;
      pointer-events: none;
      z-index: -1;
      border-top: 1px solid rgba(96,165,250,.24);
      transform-origin: center bottom;
    }

    .llmwiki-sidebar::before {
      left: -95%;
      width: 235%;
      bottom: 20px;
      height: 360px;
      border-radius: 58% 42% 0 0 / 62% 30% 0 0;
      background:
        radial-gradient(ellipse at 14% 8%, rgba(255,255,255,.42), transparent 34%),
        linear-gradient(100deg, rgba(96,165,250,.40), rgba(147,197,253,.25) 55%, rgba(191,219,254,.10));
      transform: rotate(-16deg);
      opacity: .82;
    }

    .llmwiki-sidebar::after {
      left: -85%;
      width: 230%;
      bottom: -72px;
      height: 430px;
      border-radius: 38% 62% 0 0 / 36% 58% 0 0;
      background:
        radial-gradient(ellipse at 35% 8%, rgba(255,255,255,.30), transparent 38%),
        linear-gradient(105deg, rgba(59,130,246,.30), rgba(125,211,252,.23) 58%, rgba(167,243,208,.11));
      transform: rotate(-9deg);
      opacity: .74;
    }

    .llmwiki-shell.dark .llmwiki-sidebar::before {
      background:
        radial-gradient(ellipse at 14% 8%, rgba(96,165,250,.16), transparent 34%),
        linear-gradient(100deg, rgba(30,64,175,.58), rgba(79,70,229,.30) 56%, rgba(15,23,42,.06));
      border-top-color: rgba(96,165,250,.18);
      opacity: .88;
    }

    .llmwiki-shell.dark .llmwiki-sidebar::after {
      background:
        radial-gradient(ellipse at 35% 8%, rgba(168,85,247,.16), transparent 38%),
        linear-gradient(105deg, rgba(67,56,202,.40), rgba(14,165,233,.24) 58%, rgba(15,23,42,.06));
      border-top-color: rgba(45,212,191,.14);
      opacity: .80;
    }
  `;

  return (
    <div className={`llmwiki-shell ${isDark ? 'dark' : 'light'} flex h-screen w-screen overflow-hidden`} style={wrapperStyle}>
      <style>{cssPolish}</style>
      <div style={backgroundGlowStyle} />
      <div style={bottomWaveStyle} />
      <div className="pure-css-waves" aria-hidden="true">
        <div className="wave wave-3" />
        <div className="wave wave-2" />
        <div className="wave wave-1" />
      </div>
      <aside
        className="llmwiki-sidebar w-56 flex flex-col flex-shrink-0"
        style={{
          background: isDark ? 'linear-gradient(180deg, rgba(7,18,37,.98), rgba(8,22,45,.96))' : 'linear-gradient(180deg, rgba(248,251,255,.92), rgba(235,245,255,.82))',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderRight: `1px solid ${T.border}`,
          boxShadow: isDark
            ? '8px 0 30px rgba(0,0,0,.18)'
            : '10px 0 34px rgba(30,64,175,.08)',
          position: 'relative',
          zIndex: 2,
        }}
      >

        {/* Logo */}
        <div className="flex items-center justify-center pt-8 pb-4">
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
          <button onClick={goHome}>
            <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '1.1rem', fontWeight: 700, color: T.logoColor, letterSpacing: '0.02em', lineHeight: 1.2, textAlign: 'center' }}>
              The Bug Hunter's Diary
            </h1>
          </button>
        </div>

        {/* 首頁 */}
        <div className="px-3 pb-2">
          <button
            onClick={goHome}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={showHome
              ? { background: T.homeActiveBg, color: T.homeActiveText }
              : { background: 'transparent', color: T.textMuted }
            }
          >
            <Home size={16} /> 首頁
          </button>
        </div>

        {/* 知識庫 / 快捷工具 tab */}
        <div className="px-3 pb-2">
          <div className="flex p-1 rounded-xl gap-0.5" style={{ background: T.bgTabBar, border: `1px solid ${T.borderMid}` }}>
            <button
              onClick={() => { setIsToolbox(false); setShowHome(false); if (!selectedStudio) handleStudioSelect(studioGroups[0]?.studio ?? ''); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold rounded-lg transition-all"
              style={!isToolbox && !showHome ? T.activeBlue : { background: 'transparent', color: T.textMuted }}
            >
              <BookOpen size={14} /> 知識庫
            </button>
            <button
              onClick={() => { setIsToolbox(true); setShowHome(false); setSelectedGroup(''); setSelectedSubTitle(''); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-bold rounded-lg transition-all"
              style={isToolbox ? T.activeBlue : { background: 'transparent', color: T.textMuted }}
            >
              <Zap size={14} /> 快捷工具
            </button>
          </div>
        </div>
        <div className="mx-3 mb-2 h-px" style={{ background: T.border }} />

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 py-1">
          {renderNav()}
        </nav>

        {/* 主題切換 */}
        <div className="px-3 py-3" style={{ borderTop: `1px solid ${T.border}` }}>
          <button
            onClick={() => setIsDark(v => !v)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all"
            style={{ background: T.toggleBtnBg, color: T.textMuted, border: `1px solid ${T.borderMid}` }}
          >
            {isDark ? '☀ 切換亮色' : '☽ 切換暗色'}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0" style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
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
