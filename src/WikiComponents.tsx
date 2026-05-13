"use client";

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { WikiDoc, Mode, studioGroups, wikiDocs } from './wikiData';

// ─── Doc Type Icon ────────────────────────────────────────────────────────────

export const DocTypeIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 16 }) => {
  if (type === 'flowchart') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="1" width="8" height="5" rx="1.5"/>
      <line x1="12" y1="6" x2="12" y2="10"/>
      <line x1="4" y1="10" x2="20" y2="10"/>
      <line x1="4" y1="10" x2="4" y2="14"/>
      <rect x="1" y="14" width="6" height="5" rx="1.5"/>
      <line x1="12" y1="10" x2="12" y2="14"/>
      <rect x="9" y="14" width="6" height="5" rx="1.5"/>
      <line x1="20" y1="10" x2="20" y2="14"/>
      <rect x="17" y="14" width="6" height="5" rx="1.5"/>
    </svg>
  );
  if (type === 'figma') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.53 3.58 1.44 5.04C4.58 18.91 6.17 20 8 20c1.1 0 2-.9 2-2v-.5c0-.83.67-1.5 1.5-1.5H13c2.76 0 5-2.24 5-5 0-5-4.03-9-6-9z"/>
      <circle cx="8.5"  cy="9"  r="1" fill="currentColor" stroke="none"/>
      <circle cx="12"   cy="7"  r="1" fill="currentColor" stroke="none"/>
      <circle cx="15.5" cy="9"  r="1" fill="currentColor" stroke="none"/>
      <circle cx="15"   cy="13" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
  return <FileText size={size} />;
};

export const docTypeColor: Record<string, string> = {
  doc:       'bg-blue-500/10 border-blue-500/20 text-blue-400',
  flowchart: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  figma:     'bg-pink-500/10 border-pink-500/20 text-pink-400',
};

// ─── Doc Card ─────────────────────────────────────────────────────────────────
// displayTitle 讓呼叫端可以覆蓋卡片顯示的文字（例如顯示 project ID 而非文件名稱）

export const DocCard: React.FC<{ doc: WikiDoc; displayTitle?: string }> = ({ doc, displayTitle }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!doc.larkUrl) { e.preventDefault(); setShowModal(true); }
  };

  return (
    <>
      <a
        href={doc.larkUrl || '#'}
        target={doc.larkUrl ? '_blank' : '_self'}
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group bg-slate-900/40 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/40 rounded-2xl p-5 transition-all flex items-center gap-4"
      >
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${doc.larkUrl ? docTypeColor[doc.docType] ?? docTypeColor.doc : 'bg-slate-800 border-slate-700 text-slate-600'}`}>
          <DocTypeIcon type={doc.docType} size={18} />
        </div>
        <span className={`text-sm font-bold transition-colors leading-snug ${doc.larkUrl ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}`}>
          {displayTitle ?? doc.title}
        </span>
        {!doc.larkUrl && (
          <span className="ml-auto text-[10px] font-bold text-slate-600 border border-slate-700 rounded-md px-1.5 py-0.5 flex-shrink-0">未建立</span>
        )}
      </a>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-[#0d121f] border border-slate-700 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText size={20} className="text-amber-400" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-2">尚未建立</h3>
            <p className="text-sm text-slate-400 mb-6">此文件連結尚未建立，請聯繫相關負責人新增。</p>
            <button onClick={() => setShowModal(false)} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl transition-all">
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Wiki Card Grid（依專案 / 依功能）────────────────────────────────────────

export const WikiCardGrid: React.FC<{ groupKey: string; docs: WikiDoc[]; mode: Mode }> = ({ groupKey, docs, mode }) => {
  if (mode === 'project') {
    const studioName = studioGroups.find(g => g.projects.includes(groupKey))?.studio ?? '';
    const sectionOrder = ['產品規格', '測試規範', '測試報告'] as const;
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span className="text-slate-400">{studioName}</span>
          <span className="text-slate-600">—</span>
          <span>{groupKey}</span>
        </h1>
        {sectionOrder.map(sec => {
          const filtered = docs.filter(d => d.section === sec);
          if (filtered.length === 0) return null;
          return (
            <div key={sec} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-base font-extrabold px-3 py-1 rounded-lg tracking-wide border" style={{ color: '#FFC107', backgroundColor: 'rgba(255,193,7,0.08)', borderColor: 'rgba(255,193,7,0.25)' }}>{sec}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,193,7,0.2)' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filtered.map(doc => <DocCard key={doc.id} doc={doc} />)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-white tracking-tight">{groupKey}</h1>
      <div className="grid grid-cols-2 gap-4">
        {docs.map(doc => <DocCard key={doc.id} doc={doc} />)}
      </div>
    </div>
  );
};

// ─── Category Card Grid（依類別）──────────────────────────────────────────────

const STUDIO_ORDER = ['共用組', '穩贏 WinWin', '王牌 Ace', '八方來財'] as const;

export const CategoryCardGrid: React.FC<{ section: string; subTitle: string }> = ({ section, subTitle }) => {
  const allDocs = wikiDocs.filter(d => d.section === section && d.title === subTitle);

  const grouped = STUDIO_ORDER.map(studio => ({
    studio,
    docs: allDocs.filter(d => d.studio === studio),
  })).filter(g => g.docs.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{section}</p>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">{subTitle}</h1>
      </div>
      {grouped.map(({ studio, docs }) => (
        <div key={studio} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-base font-extrabold px-3 py-1 rounded-lg tracking-wide border" style={{ color: '#FFC107', backgroundColor: 'rgba(255,193,7,0.08)', borderColor: 'rgba(255,193,7,0.25)' }}>{studio}</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,193,7,0.2)' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {docs.map(doc => (
              <DocCard key={doc.id} doc={doc} displayTitle={doc.project} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
