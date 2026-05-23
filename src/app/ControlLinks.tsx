"use client";

import React from 'react';
import { Layout } from 'lucide-react';

const STUDIOS = [
  {
    name: '穩贏 WinWin',
    bgStyle: { background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '1rem', padding: '1.25rem' },
    badgeStyle: { background: 'rgba(14,165,233,0.1)', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '0.5rem', padding: '2px 12px', fontSize: '16px', fontWeight: 800 },
    cardStyle: { background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: '0.75rem', padding: '12px', width: '128px', display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    projects: ['TG001','TG002'],
  },
  {
    name: '王牌 Ace',
    bgStyle: { background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '1rem', padding: '1.25rem' },
    badgeStyle: { background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '0.5rem', padding: '2px 12px', fontSize: '16px', fontWeight: 800 },
    cardStyle: { background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '0.75rem', padding: '12px', width: '128px', display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    projects: ['TG102','TG104','TG106','TG108','TG110','TG112','TG126'],
  },
  {
    name: '八方來財',
    bgStyle: { background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '1rem', padding: '1.25rem' },
    badgeStyle: { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.5rem', padding: '2px 12px', fontSize: '16px', fontWeight: 800 },
    cardStyle: { background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '0.75rem', padding: '12px', width: '128px', display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    projects: ['TG103','TG105','TG107','TG109','TG111','TG113','TG115','TG117','TG119','TG121','TG123','TG125','TG139'],
  },
];

const PROJECT_LINKS: Record<string, { rn: string; module: string }> = {
  TG001: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/CzUVwHj0OiJai9kHO7clOtiJg8d',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/BZW5wdUixiCdOTkqGRDlSMSjgRf?sheet=878381&open_in_browser=true',
  },
  TG102: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/D64fwI6wgisINOkOUPNlf5F7gps',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/N1H2wXWQti4bc0kiqI0lRiZmgSe?table=tblPO4bJKUg4Npwk&view=vew9gGopfl',
  },
  TG104: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/RtGqwqLsEi0pDlkbBRflasg1g6f',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/W6Y9wzEvqis1vzkzULvl1G1Vgvf?table=tbl6Tyv9nAlLNOq7&view=vew9gGopfl',
  },
  TG106: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/R42rwOO9Ni7jnlkGNNolzzsCgOd',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/CYLfwn17uifvCAkGNg2leONXgPb?table=tblhU0qizhjj6Kmd&view=vew9gGopfl',
  },
  TG108: {
    rn: 'https://trevi-technology.sg.larksuite.com/wiki/YsUfwI0Q6iXIbgkXf8ol4rg1gcb',
    module: 'https://trevi-technology.sg.larksuite.com/wiki/OrWAwpNrliuOCvkMJb9lZ6oRg2V?table=tblGrUIMqTh2gfQW&view=vew9gGopfl',
  },
};

const btnBase: React.CSSProperties = { color: '#ffffff', fontSize: '14px', padding: '8px 0', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, border: '1px solid #475569', background: '#334155', cursor: 'pointer', textDecoration: 'none' };
const btnDisabled: React.CSSProperties = { ...btnBase, color: '#475569', background: 'transparent', border: '1px solid rgba(51,65,85,0.3)', cursor: 'not-allowed' };

const LinkBtn: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  if (!url) return <div style={btnDisabled}>{label}</div>;
  return <a href={url} target="_blank" rel="noopener noreferrer" style={btnBase}>{label}</a>;
};

const otherSectionStyle: React.CSSProperties = { background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '1rem', padding: '1.25rem 1.5rem' };
const otherCardStyle: React.CSSProperties = { background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(51,65,85,0.5)', borderRadius: '0.75rem', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', width: '176px' };
const otherBtnStyle: React.CSSProperties = { ...btnBase, flex: 'none', width: '100%' };
const otherBtnFlexStyle: React.CSSProperties = { ...btnBase };

export const ControlLinks: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div style={{ width: 32, height: 32, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Layout size={15} color="#60a5fa" />
      </div>
      <h1 className="text-2xl font-extrabold text-white tracking-tight">控版連結</h1>
    </div>

    {STUDIOS.map(studio => (
      <div key={studio.name} style={studio.bgStyle}>
        <div style={{ marginBottom: '12px' }}>
          <span style={studio.badgeStyle}>{studio.name}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {studio.projects.map(id => {
            const links = PROJECT_LINKS[id] ?? { rn: '', module: '' };
            return (
              <div key={id} style={studio.cardStyle}>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', textAlign: 'center' }}>{id}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <LinkBtn label="RN" url={links.rn} />
                  <LinkBtn label="模塊" url={links.module} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}

    {/* 其他相關連結 */}
    <div style={otherSectionStyle}>
      <div style={{ marginBottom: '12px' }}>
        <span style={{ background: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.3)', borderRadius: '0.5rem', padding: '4px 16px', fontSize: '16px', fontWeight: 800 }}>其他相關連結</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <div style={otherCardStyle}>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', textAlign: 'center' }}>Pipeline</p>
          <a href="https://pipeline-tool.trevi-stage.cc/" target="_blank" rel="noopener noreferrer" style={otherBtnStyle}>ALL</a>
        </div>
        <div style={otherCardStyle}>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', textAlign: 'center' }}>Jenkins</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a href="http://10.1.7.132:8080/login?from=%2F" target="_blank" rel="noopener noreferrer" style={otherBtnFlexStyle}>DEV/STG</a>
            <a href="http://10.1.7.132:8080/login?from=%2F" target="_blank" rel="noopener noreferrer" style={otherBtnFlexStyle}>UAT</a>
          </div>
        </div>
        <div style={otherCardStyle}>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', textAlign: 'center' }}>Kuboard</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a href="https://kuboard.trevi-stage.cc/login?to=/login" target="_blank" rel="noopener noreferrer" style={otherBtnFlexStyle}>STG</a>
            <a href="https://dev-to-kuboard.reelx.fun/kubernetes/uat/namespace/pp-stage" target="_blank" rel="noopener noreferrer" style={otherBtnFlexStyle}>UAT</a>
          </div>
        </div>
        <div style={otherCardStyle}>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', textAlign: 'center' }}>版號查詢</p>
          <a href="http://10.1.7.55:8003/" target="_blank" rel="noopener noreferrer" style={otherBtnStyle}>ALL</a>
        </div>
      </div>
    </div>
  </div>
);
