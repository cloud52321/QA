"use client";

import React, { useState } from 'react';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import { getTheme, ENV_COLORS } from './themeTokens';

const BACKENDS = [
  { id: 'PP01', label: 'PP01', sub: '遊戲後台', slug: 'pp-game-backstage' },
  { id: 'PP02', label: 'PP02', sub: '數據中台', slug: 'pp-operations-center' },
  { id: 'PP03', label: 'PP03', sub: '風控後台', slug: 'pp-risk-control' },
];

const ENVS = [
  { key: 'DEV' as const,  label: 'DEV',  ...ENV_COLORS.DEV,  buildUrl: (slug: string) => `https://${slug}-frontend.trevi-dev.cc/#/` },
  { key: 'STG' as const,  label: 'STG',  ...ENV_COLORS.STG,  buildUrl: (slug: string) => `https://${slug}-frontend.trevi-stage.cc:30904/${slug.includes('backstage') || slug.includes('risk') ? 'login' : '#/'}` },
  { key: 'UAT' as const,  label: 'UAT',  ...ENV_COLORS.UAT,  buildUrl: (slug: string) => `https://${slug}.reelx.fun/${slug.includes('operations') ? '#/dashboard' : '#/'}` },
  { key: 'PROD' as const, label: 'PROD', ...ENV_COLORS.PROD, buildUrl: (slug: string) => `https://prod-${slug}.reelx.fun/#/` },
];

const SHARED_PASSWORD = 'a1234567';
const ACCOUNTS = [
  { name: 'root1', isRoot: true }, { name: 'admin1', isRoot: false },
  { name: 'custom1', isRoot: false }, { name: 'ops1', isRoot: false },
  { name: 'Opsbygame123', isRoot: false }, { name: 'qa12', isRoot: false },
  { name: 'PM12', isRoot: false }, { name: 'math1', isRoot: false }, { name: 'server1', isRoot: false },
];

const CopyCell: React.FC<{ value: string; isDark: boolean }> = ({ value, isDark }) => {
  const T = getTheme(isDark);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', textAlign: 'left', padding: '4px 8px', borderRadius: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', flex: 1, color: T.text }}>{value}</span>
      <span style={{ fontSize: '0.5625rem', fontWeight: 700, padding: '2px 4px', borderRadius: '0.25rem', border: copied ? '1px solid rgba(16,185,129,0.3)' : `1px solid ${T.backendCopyBorder}`, background: copied ? 'rgba(16,185,129,0.1)' : T.backendCopyBg, color: copied ? '#6ee7b7' : T.textFaint, flexShrink: 0 }}>
        {copied ? '✓' : '複製'}
      </span>
    </button>
  );
};

export const BackendLinks: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const [showPw, setShowPw] = useState(false);
  const [copiedPw, setCopiedPw] = useState(false);
  const copyPw = () => { navigator.clipboard.writeText(SHARED_PASSWORD).then(() => { setCopiedPw(true); setTimeout(() => setCopiedPw(false), 1500); }); };

  const T = getTheme(isDark);

  return (
    <div className="space-y-6">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ExternalLink size={15} style={{ color: '#60a5fa' }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: T.text, letterSpacing: '-0.01em' }}>後台連結</h1>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        {/* 左側：環境卡片 */}
        <div style={{ flex: 1 }} className="space-y-5">
          {ENVS.map(env => (
            <div key={env.key}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ ...env.badge, fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '0.375rem' }}>{env.label}</span>
                <div style={{ flex: 1, height: 1, background: T.divider }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {BACKENDS.map(b => (
                  <a key={b.id} href={env.buildUrl(b.slug)} target="_blank" rel="noopener noreferrer"
                    style={{ background: T.bgCardAlt, border: `1px solid ${env.color}30`, borderRadius: '0.75rem', padding: 12, display: 'flex', flexDirection: 'column', gap: 6, textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.bgHover; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.bgCardAlt; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ ...env.badge, fontSize: '0.625rem', fontWeight: 800, padding: '2px 6px', borderRadius: '0.25rem' }}>{b.label}</span>
                      <ExternalLink size={11} style={{ color: T.textFaint }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: T.text }}>{b.sub}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 右側：帳號資訊 */}
        <div style={{ width: 256, flexShrink: 0, background: T.bgSubtle, border: `1px solid ${T.border}`, borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid rgba(59,130,246,0.2)`, background: 'rgba(59,130,246,0.05)', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: T.text, letterSpacing: '0.02em' }}>帳號資訊</span>
          </div>
          {/* 共用密碼 */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid rgba(59,130,246,0.15)`, background: T.bgInner }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: T.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>共用密碼</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: T.text, flex: 1 }}>{showPw ? SHARED_PASSWORD : '••••••••'}</span>
              <button onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textFaint }}>
                {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
              <button onClick={copyPw} style={{ fontSize: '0.5625rem', fontWeight: 700, padding: '2px 6px', borderRadius: '0.25rem', border: copiedPw ? '1px solid rgba(16,185,129,0.3)' : `1px solid ${T.border}`, background: copiedPw ? 'rgba(16,185,129,0.1)' : T.backendCopyBg, color: copiedPw ? '#6ee7b7' : T.textFaint, cursor: 'pointer' }}>
                {copiedPw ? '✓' : '複製'}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: T.textFaint, marginTop: 4 }}>所有帳號皆共用此密碼</p>
          </div>
          {/* 帳號表頭 */}
          <div style={{ padding: '6px 16px', borderBottom: `1px solid rgba(59,130,246,0.15)` }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Account</span>
          </div>
          {/* 帳號列表 */}
          <div>
            {ACCOUNTS.map((acc, i) => (
              <div key={acc.name} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: acc.isRoot ? 'rgba(245,158,11,0.05)' : 'transparent', borderBottom: i < ACCOUNTS.length - 1 ? `1px solid ${T.divider}` : 'none' }}>
                {acc.isRoot && <span style={{ color: '#f59e0b', fontSize: '0.875rem', flexShrink: 0 }}>★</span>}
                <CopyCell value={acc.name} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
