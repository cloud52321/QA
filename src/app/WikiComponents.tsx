"use client";

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { WikiDoc, Mode, studioGroups, wikiDocs } from './wikiData';
import { getTheme } from './themeTokens';

export const DocTypeIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 16 }) => {
  if (type === 'flowchart') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="1" width="8" height="5" rx="1.5"/><line x1="12" y1="6" x2="12" y2="10"/>
      <line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="10" x2="4" y2="14"/>
      <rect x="1" y="14" width="6" height="5" rx="1.5"/><line x1="12" y1="10" x2="12" y2="14"/>
      <rect x="9" y="14" width="6" height="5" rx="1.5"/><line x1="20" y1="10" x2="20" y2="14"/>
      <rect x="17" y="14" width="6" height="5" rx="1.5"/>
    </svg>
  );
  if (type === 'figma') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.53 3.58 1.44 5.04C4.58 18.91 6.17 20 8 20c1.1 0 2-.9 2-2v-.5c0-.83.67-1.5 1.5-1.5H13c2.76 0 5-2.24 5-5 0-5-4.03-9-6-9z"/>
      <circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15.5" cy="9" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
  return <FileText size={size} />;
};

// ─── DocCard ──────────────────────────────────────────────────────────────────

export const DocCard: React.FC<{ doc: WikiDoc; displayTitle?: string; isDark?: boolean }> = ({ doc, displayTitle, isDark = true }) => {
  const [showModal, setShowModal] = useState(false);
  const T = getTheme(isDark);

  const iconStyle: React.CSSProperties = doc.larkUrl
    ? doc.docType === 'flowchart'
      ? { background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }
      : doc.docType === 'figma'
        ? { background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#f472b6' }
        : { background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }
    : { background: T.bgMuted, border: `1px solid ${T.borderLight}`, color: T.textFaint };

  const cardStyle: React.CSSProperties = {
    background: T.docCardBg,
    border: `1px solid ${T.docCardBorder}`,
    borderRadius: '1rem',
    padding: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.15s',
    textDecoration: 'none',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!doc.larkUrl) { e.preventDefault(); setShowModal(true); }
  };

  return (
    <>
      <a href={doc.larkUrl || '#'} target={doc.larkUrl ? '_blank' : '_self'} rel="noopener noreferrer"
        onClick={handleClick} style={cardStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${T.docCardHoverBorder}`; (e.currentTarget as HTMLElement).style.background = T.docCardHoverBg; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${T.docCardBorder}`; (e.currentTarget as HTMLElement).style.background = T.docCardBg; }}
      >
        <div style={{ width: 40, height: 40, borderRadius: '0.75rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...iconStyle }}>
          <DocTypeIcon type={doc.docType} size={18} />
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: doc.larkUrl ? T.docCardText : T.docCardTextNA, lineHeight: 1.4 }}>
          {displayTitle ?? doc.title}
        </span>
        {!doc.larkUrl && (
          <span style={{ marginLeft: 'auto', fontSize: '0.625rem', fontWeight: 700, color: T.docCardTextNA, border: `1px solid ${T.docCardBadgeBorder}`, borderRadius: '0.375rem', padding: '2px 6px', flexShrink: 0 }}>未建立</span>
        )}
      </a>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div style={{ background: T.modalBg, border: `1px solid ${T.modalBorder}`, borderRadius: '1rem', padding: '2rem', maxWidth: 384, width: '100%', margin: '0 1rem', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 48, height: 48, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FileText size={20} style={{ color: '#f59e0b' }} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: T.text, marginBottom: '0.5rem' }}>尚未建立</h3>
            <p style={{ fontSize: '0.875rem', color: T.textMuted, marginBottom: '1.5rem' }}>此文件連結尚未建立，請聯繫相關負責人新增。</p>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '0.625rem', background: T.modalBtnBg, color: T.modalBtnText, border: `1px solid ${T.modalBtnBorder}`, borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ─── WikiCardGrid ─────────────────────────────────────────────────────────────

export const WikiCardGrid: React.FC<{ groupKey: string; docs: WikiDoc[]; mode: Mode; isDark?: boolean }> = ({ groupKey, docs, mode, isDark = true }) => {
  const T = getTheme(isDark);
  if (mode === 'project') {
    const sectionOrder = ['產品規格', '測試規範', '測試報告'] as const;
    return (
      <div className="space-y-8">
        {sectionOrder.map(sec => {
          const filtered = docs.filter(d => d.section === sec);
          if (filtered.length === 0) return null;
          return (
            <div key={sec} className="space-y-3">
              <div className="flex items-center gap-3">
                <span style={{ color: '#FFC107', background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '0.5rem', padding: '4px 12px', fontSize: '1rem', fontWeight: 800 }}>{sec}</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,193,7,0.2)' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filtered.map(doc => <DocCard key={doc.id} doc={doc} isDark={isDark} />)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: T.text }}>{groupKey}</h1>
      <div className="grid grid-cols-2 gap-4">
        {docs.map(doc => <DocCard key={doc.id} doc={doc} isDark={isDark} />)}
      </div>
    </div>
  );
};

// ─── CategoryCardGrid ─────────────────────────────────────────────────────────

const STUDIO_ORDER = ['共用組', '穩贏 WinWin', '王牌 Ace', '八方來財'] as const;

export const CategoryCardGrid: React.FC<{ section: string; subTitle: string; isDark?: boolean }> = ({ section, subTitle, isDark = true }) => {
  const T = getTheme(isDark);
  const allDocs = wikiDocs.filter(d => d.section === section && d.title === subTitle);
  const grouped = STUDIO_ORDER.map(studio => ({ studio, docs: allDocs.filter(d => d.studio === studio) })).filter(g => g.docs.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: T.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{section}</p>
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: T.text }}>{subTitle}</h1>
      </div>
      {grouped.map(({ studio, docs }) => (
        <div key={studio} className="space-y-3">
          <div className="flex items-center gap-3">
            <span style={{ color: '#FFC107', background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '0.5rem', padding: '4px 12px', fontSize: '1rem', fontWeight: 800 }}>{studio}</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,193,7,0.2)' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {docs.map(doc => <DocCard key={doc.id} doc={doc} displayTitle={doc.project} isDark={isDark} />)}
          </div>
        </div>
      ))}
    </div>
  );
};
