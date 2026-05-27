"use client";

import React, { useState } from 'react';
import { Link2, Zap, ExternalLink } from 'lucide-react';
import { studioData, studioList, ProjectInfo } from './wikiData';
import { getTheme, ENV_COLORS } from './themeTokens';

const ALL_STUDIO = '全部';
const allProjects: ProjectInfo[] = studioList.flatMap(s => studioData[s]);

interface GeneratedLink { title: string; icon: React.ReactNode; url: string; desc: string; }
interface EnvGroup {
  env: 'DEV' | 'STG' | 'UAT' | 'PROD';
  label: string; borderColor: string; badgeStyle: React.CSSProperties;
  links: GeneratedLink[];
}

const PROJECT_ICON: Record<string, string> = {
  TG102: '🔴', TG104: '⚡', TG112: '🃏', TG114: '🛺',
  TG116: '🧙', TG118: '🪙', TG120: '🧙', TG122: '🪙', TG124: '🪙',
  TG126: '♠️', TG128: '🧙', TG130: '🪙',
  TG103: '🍒', TG105: '🍿', TG107: '🧙', TG109: '🎯',
  TG115: '🏀', TG117: '💥',
  TG139: '💯', TG119: '⚽', TG121: '🚀', TG123: '🎈',
};

const PROJECT_SVG_ICON: Record<string, React.ReactNode> = {
  TG001: (<svg width="16" height="16" viewBox="0 0 88 100"><path d="M8,20 C14,4 22,12 18,26" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round"/><circle cx="18" cy="26" r="5" fill="#fde047"/><circle cx="44" cy="58" r="36" fill="#111827" stroke="#374151" strokeWidth="2"/></svg>),
  TG002: (<svg width="16" height="16" viewBox="0 0 88 88"><circle cx="44" cy="44" r="42" fill="#ea580c"/><line x1="44" y1="2" x2="44" y2="86" stroke="#1c1917" strokeWidth="3"/><line x1="2" y1="44" x2="86" y2="44" stroke="#1c1917" strokeWidth="3"/><path d="M44,2 C20,16 20,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/><path d="M44,2 C68,16 68,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/></svg>),
  TG110: (<svg width="16" height="16" viewBox="0 0 88 88"><circle cx="44" cy="44" r="38" fill="#f59e0b"/><circle cx="44" cy="44" r="28" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/><text x="45" y="56" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="140" fontWeight="900" fill="#78350f">₱</text></svg>),
  TG106: (<svg width="16" height="16" viewBox="0 0 88 88"><circle cx="44" cy="44" r="42" fill="#1a1a2e" stroke="#3b3b6e" strokeWidth="2"/><circle cx="44" cy="44" r="18" fill="white"/><text x="44" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#111">8</text></svg>),
  TG108: (<svg width="16" height="16" viewBox="0 0 88 76"><ellipse cx="44" cy="38" rx="42" ry="36" fill="#f9a8c9" stroke="#e879a0" strokeWidth="1"/><ellipse cx="44" cy="46" rx="25" ry="19" fill="#f472b6" stroke="#db2777" strokeWidth="0.5"/></svg>),
  TG111: (<svg width="16" height="16" viewBox="0 0 88 96"><circle cx="30" cy="18" r="9" fill="#ef4444"/><circle cx="18" cy="12" r="10" fill="#ef4444"/><ellipse cx="30" cy="52" rx="30" ry="32" fill="white" stroke="#f3f4f6" strokeWidth="1.5"/><circle cx="42" cy="44" r="11" fill="#1a1a1a"/><circle cx="39" cy="41" r="4" fill="white"/></svg>),
  TG113: (<svg width="16" height="16" viewBox="0 0 88 96"><rect x="4" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="22" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="2" y="28" width="76" height="60" rx="4" fill="#9b8fe0"/><path d="M30,88 L30,60 Q30,48 44,48 Q58,48 58,60 L58,88 Z" fill="#3730a3"/></svg>),
  TG125: (<svg width="16" height="16" viewBox="0 0 88 100"><path d="M16,58 Q10,88 20,96 L44,80 L68,96 Q78,88 72,58 Z" fill="#4a1d6e"/><circle cx="44" cy="44" r="32" fill="#fde8d0"/><circle cx="34" cy="44" r="6" fill="#ff3366"/><circle cx="54" cy="44" r="6" fill="#ff3366"/></svg>),
  TG107: (<svg width="16" height="16" viewBox="0 0 88 100"><path d="M16,58 Q12,90 22,96 L44,80 L66,96 Q76,90 72,58 Z" fill="#4c1d95"/><circle cx="44" cy="44" r="32" fill="#3730a3"/><path d="M18,48 Q20,34 44,34 Q68,34 70,48 Q68,58 44,58 Q20,58 18,48Z" fill="#d4956a"/></svg>),
};

const ProjectIcon: React.FC<{ id: string }> = ({ id }) => {
  if (PROJECT_SVG_ICON[id]) return <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{PROJECT_SVG_ICON[id]}</span>;
  if (PROJECT_ICON[id]) return <span style={{ fontSize: '0.875rem', lineHeight: 1 }}>{PROJECT_ICON[id]}</span>;
  return null;
};

// ENV color maps

// CopyGoButtons
const CopyGoButtons: React.FC<{ url: string; isDark: boolean }> = ({ url, isDark }) => {
  const T = getTheme(isDark);
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  const go = (e: React.MouseEvent) => { e.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer'); };
  const btnBase: React.CSSProperties = { flex: 1, padding: '6px 0', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, border: `1px solid ${T.linkBtnBorder}`, background: T.linkBtnBg, color: T.linkBtnText, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 };
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <button onClick={copy} style={copied ? { ...btnBase, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.4)', color: '#6ee7b7' } : btnBase}>
        {copied ? '✓ COPIED' : 'COPY'}
      </button>
      <button onClick={go} style={btnBase}>
        <ExternalLink size={11} /> GO TO
      </button>
    </div>
  );
};

export const LinkGenerator: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const [activeStudio, setActiveStudio] = useState(ALL_STUDIO);
  const projects = activeStudio === ALL_STUDIO ? allProjects : studioData[activeStudio];
  const firstProject = projects[0];

  const [project,   setProject]   = useState<ProjectInfo>(firstProject);
  const [account,   setAccount]   = useState(firstProject.account);
  const [token,     setToken]     = useState(firstProject.token);
  const [room,      setRoom]      = useState(firstProject.roomPrefix);
  const [serial,    setSerial]    = useState('01');
  const [platform,  setPlatform]  = useState<'h5' | 'pch5'>('h5');
  const [stgPort,   setStgPort]   = useState('30907');
  const [showAdv,   setShowAdv]   = useState(false);
  const [envGroups, setEnvGroups] = useState<EnvGroup[]>([]);
  const [generated, setGenerated] = useState(false);

  const T = getTheme(isDark);

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
      { env: 'DEV',  label: 'Development',    borderColor: ENV_COLORS.DEV.border,  badgeStyle: ENV_COLORS.DEV.badge,  links: makeLinks('DEV') },
      { env: 'STG',  label: 'Staging',         borderColor: ENV_COLORS.STG.border,  badgeStyle: ENV_COLORS.STG.badge,  links: makeLinks('STG') },
      { env: 'UAT',  label: 'User Acceptance', borderColor: ENV_COLORS.UAT.border,  badgeStyle: ENV_COLORS.UAT.badge,  links: makeLinks('UAT') },
      { env: 'PROD', label: 'Production',      borderColor: ENV_COLORS.PROD.border, badgeStyle: ENV_COLORS.PROD.badge, links: makeLinks('PROD') },
    ]);
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link2 size={15} style={{ color: '#60a5fa' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: T.text, letterSpacing: '-0.01em' }}>直連帳號連結</h1>
      </div>

      {/* Studio tabs */}
      <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: T.bgTabBar, borderRadius: '0.75rem', border: `1px solid ${T.borderMid}` }}>
        {[ALL_STUDIO, ...studioList].map(s => (
          <button key={s} onClick={() => handleStudioChange(s)} style={activeStudio === s
            ? { padding: '6px 16px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: 'rgba(245,158,11,0.2)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.4)', cursor: 'pointer', whiteSpace: 'nowrap' as const }
            : { padding: '6px 16px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: 'transparent', color: T.textMuted, border: '1px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' as const }
          }>{s}</button>
        ))}
      </div>

      {/* Form */}
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '1rem', padding: '1.5rem' }} className="space-y-5">
        {/* 對應專案 + H5/PCH5 + 進階設定 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.textMuted, whiteSpace: 'nowrap', paddingTop: 6 }}>對應專案</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
            {projects.map(p => (
              <button key={p.id} onClick={() => handleProjectChange(p.id)}
                style={project.id === p.id
                  ? { display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: 'rgba(245,158,11,0.2)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.4)', cursor: 'pointer' }
                  : { display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: T.projectInactiveBg, color: T.textMuted, border: `1px solid ${T.borderMid}`, cursor: 'pointer' }
                }
              >
                <ProjectIcon id={p.id} />{p.id}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* 進階設定 */}
            <div onClick={() => setShowAdv(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, border: showAdv ? '2px solid #f59e0b' : '2px solid #475569', background: showAdv ? '#f59e0b' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {showAdv && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.textMuted }}>進階設定</span>
            </div>
            {/* H5/PCH5 */}
            <div style={{ display: 'flex', gap: 4, padding: 4, background: T.bgTabBar, borderRadius: '0.75rem', border: `1px solid ${T.borderMid}` }}>
              {(['h5', 'pch5'] as const).map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  style={platform === p
                    ? { padding: '6px 16px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }
                    : { padding: '6px 16px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.5rem', background: 'transparent', color: T.textMuted, border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const }
                  }>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div className="space-y-1.5">
            <label style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#f59e0b', display: 'block' }}>Account</label>
            <input type="text" value={account} onChange={e => handleAccountChange(e.target.value)} placeholder="帳號" style={T.inputAccent} />
          </div>
          <div className="space-y-1.5">
            <label style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#f59e0b', display: 'block' }}>Token</label>
            <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Token" style={T.inputAccent} />
          </div>
          <div className="space-y-1.5">
            <label style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: T.textMuted, display: 'block' }}>房間流水號</label>
            <input type="text" value={serial} onChange={e => setSerial(e.target.value)} placeholder="例如：01" style={T.inputNormal} />
          </div>
          {showAdv && (<>
            <div className="space-y-1.5">
              <label style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: T.textMuted, display: 'block' }}>STG Port</label>
              <input type="text" value={stgPort} onChange={e => setStgPort(e.target.value)} placeholder="30907" style={{ ...T.inputNormal, fontFamily: 'monospace' }} />
            </div>
            <div className="space-y-1.5">
              <label style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: T.textMuted, display: 'block' }}>房間前綴</label>
              <input type="text" value={room} onChange={e => setRoom(e.target.value)} placeholder="例如：PP" style={T.inputNormal} />
            </div>
          </>)}
        </div>
      </div>

      <button onClick={generate}
        style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: 'white', fontWeight: 700, borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}>
        <Zap size={15} /> 立即生成連結
      </button>

      {generated && (
        <div>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: T.textFaint, marginBottom: 16 }}>生成結果</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {envGroups.map(g => (
              <div key={g.env} style={{ background: T.linkResultBg, border: `2px solid ${g.borderColor}`, borderRadius: '1rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ ...g.badgeStyle, fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '0.375rem' }}>{g.env}</span>
                  <span style={{ fontSize: '0.75rem', color: T.textFaint }}>{g.label}</span>
                </div>
                <div className="space-y-3">
                  {g.links.map((l, i) => (
                    <div key={i} style={{ background: T.linkUrlBg, borderRadius: '0.75rem', padding: '0.75rem' }}>
                      <p style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: T.linkUrlText, wordBreak: 'break-all', marginBottom: 4 }}>{l.url}</p>
                      <CopyGoButtons url={l.url} isDark={isDark} />
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
