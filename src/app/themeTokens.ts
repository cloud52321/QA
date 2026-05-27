// themeTokens.ts — 所有顏色、樣式設定集中在這裡，元件只 import 使用

import React from 'react';

export function getTheme(isDark: boolean) {
  return {
    // ── 文字 ──────────────────────────────────────────────────────────────────
    text:          isDark ? '#e2e8f0' : '#1e293b',
    textMuted:     isDark ? '#94a3b8' : '#64748b',
    textFaint:     isDark ? '#475569' : '#94a3b8',
    textAmber:     isDark ? '#fcd34d' : '#92400e',
    textLink:      '#3b82f6',

    // ── 背景 ──────────────────────────────────────────────────────────────────
    bg:            isDark ? '#0f1629'              : '#f1f5f9',
    bgSide:        isDark ? '#131c30'              : '#ffffff',
    bgCard:        isDark ? 'rgba(15,23,42,0.6)'   : '#ffffff',
    bgCardAlt:     isDark ? 'rgba(15,23,42,0.4)'   : '#ffffff',
    bgCardDark:    isDark ? '#0d121f'              : '#ffffff',
    bgHover:       isDark ? 'rgba(30,41,59,0.4)'   : '#f0f7ff',
    bgTabBar:      isDark ? 'rgba(2,6,23,0.6)'     : '#e2e8f0',
    bgInput:       isDark ? 'rgba(2,6,23,0.6)'     : '#f8fafc',
    bgInner:       isDark ? 'rgba(15,23,42,0.3)'   : '#f8fafc',
    bgSubtle:      isDark ? 'rgba(15,23,42,0.5)'   : '#f8fafc',
    bgDeep:        isDark ? 'rgba(2,6,23,0.4)'     : '#f8fafc',
    bgMuted:       isDark ? '#1e293b'              : '#f1f5f9',

    // ── 邊框 ──────────────────────────────────────────────────────────────────
    border:        isDark ? 'rgba(51,65,85,0.8)'   : '#94a3b8',
    borderMid:     isDark ? 'rgba(71,85,105,0.8)'  : '#64748b',
    borderStrong:  isDark ? '#475569'              : '#475569',
    borderLight:   isDark ? '#334155'              : '#cbd5e1',
    divider:       isDark ? 'rgba(51,65,85,0.8)'   : '#94a3b8',

    // ── Sidebar 首頁按鈕 active ───────────────────────────────────────────────
    homeActiveBg:  isDark ? 'rgba(100,116,139,0.35)' : '#dbeafe',
    homeActiveText:isDark ? 'white'                : '#1e40af',

    // ── Logo ──────────────────────────────────────────────────────────────────
    logoColor:     isDark ? 'white'                : '#1e293b',

    // ── 全局字體 ──────────────────────────────────────────────────────────────
    fontStyle: {
      fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
      fontSize: '210%',
    } as React.CSSProperties,

    // ── Active 狀態 ───────────────────────────────────────────────────────────
    activeNav: {
      background: isDark ? 'rgba(37,99,235,0.15)' : '#dbeafe',
      color:      isDark ? '#93c5fd'              : '#1d4ed8',
      border:     '1px solid #93c5fd',
    } as React.CSSProperties,

    activeBlue: {
      background: '#2563eb',
      color:      'white',
      boxShadow:  '0 4px 14px rgba(37,99,235,0.4)',
    } as React.CSSProperties,

    activeAmber: {
      background: isDark ? 'rgba(245,158,11,0.15)' : '#fef3c7',
      border:     isDark ? '1px solid rgba(251,191,36,0.5)' : '1px solid #fbbf24',
      color:      isDark ? '#fcd34d'              : '#92400e',
    } as React.CSSProperties,

    inactiveBtn: {
      background: isDark ? 'rgba(15,23,42,0.6)'  : '#ffffff',
      border:     isDark ? '1px solid rgba(51,65,85,0.5)' : '1px solid #94a3b8',
      color:      isDark ? '#cbd5e1'              : '#475569',
    } as React.CSSProperties,

    // ── Nav 按鈕（快捷工具列表）active/inactive ───────────────────────────────
    navActive: {
      background: isDark ? 'rgba(37,99,235,0.15)' : '#dbeafe',
      color:      isDark ? '#60a5fa'              : '#1d4ed8',
      border:     isDark ? '1px solid rgba(59,130,246,0.25)' : '1px solid #93c5fd',
    } as React.CSSProperties,

    navInactive: {
      background: 'transparent',
      color:      isDark ? '#94a3b8'              : '#64748b',
      border:     '1px solid transparent',
    } as React.CSSProperties,

    // ── Input ─────────────────────────────────────────────────────────────────
    inputAccent: {
      background:   isDark ? 'rgba(2,6,23,0.6)'  : '#f8fafc',
      border:       isDark ? '1px solid rgba(245,158,11,0.5)' : '1px solid #fbbf24',
      color:        isDark ? '#e2e8f0'            : '#1e293b',
      borderRadius: '0.75rem',
      padding:      '10px 16px',
      fontSize:     '0.875rem',
      width:        '100%',
      outline:      'none',
    } as React.CSSProperties,

    inputNormal: {
      background:   isDark ? 'rgba(2,6,23,0.6)'  : '#f8fafc',
      border:       isDark ? '1px solid #334155'  : '1px solid #94a3b8',
      color:        isDark ? '#e2e8f0'            : '#1e293b',
      borderRadius: '0.75rem',
      padding:      '10px 16px',
      fontSize:     '0.875rem',
      width:        '100%',
      outline:      'none',
    } as React.CSSProperties,

    // ── Accordion ─────────────────────────────────────────────────────────────
    accordBg:         isDark ? 'rgba(15,23,42,0.4)'  : '#ffffff',
    accordBorder:     isDark ? 'rgba(71,85,105,0.7)' : '#94a3b8',
    accordOpenBg:     isDark ? 'rgba(30,41,59,0.5)'  : '#f8fafc',
    accordOpenBorder: isDark ? '#60a5fa'             : '#2563eb',
    accordHover:      isDark ? 'rgba(30,41,59,0.3)'  : '#f1f5f9',

    // ── 表格 ──────────────────────────────────────────────────────────────────
    tableHeadBg:   isDark ? 'rgba(30,41,59,0.6)' : '#e2e8f0',
    tableHeadText: isDark ? '#cbd5e1'            : '#1e293b',
    tableBorder:   isDark ? '#475569'            : '#94a3b8',
    tableCellBg:   isDark ? 'transparent'        : '#ffffff',

    // ── Card header ───────────────────────────────────────────────────────────
    cardHeaderBg:  isDark ? 'rgba(30,41,59,0.3)' : '#f1f5f9',

    // ── 主題切換按鈕 ─────────────────────────────────────────────────────────
    toggleBtnBg:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
    copyCodeBg:    isDark ? 'rgba(99,102,241,0.35)' : '#e0e7ff',
    copyCodeColor: isDark ? '#c7d2fe'            : '#3730a3',
    copyCodeBorder:isDark ? 'none'               : '1px solid #a5b4fc',
    copyBtnColor:  isDark ? '#475569'            : '#6b7280',
    copySuccessBg: 'rgba(16,185,129,0.2)',
    copySuccessColor: '#059669',

    // ── WikiCard DocCard ──────────────────────────────────────────────────────
    docCardBg:     isDark ? 'rgba(15,23,42,0.4)' : '#ffffff',
    docCardBorder: isDark ? '#1e293b'            : '#94a3b8',
    docCardHoverBorder: isDark ? '#475569'       : '#93c5fd',
    docCardHoverBg:isDark ? 'rgba(30,41,59,0.4)' : '#f0f7ff',
    docCardText:   isDark ? '#cbd5e1'            : '#1e293b',
    docCardTextNA: isDark ? '#475569'            : '#94a3b8',
    docCardBadgeBorder: isDark ? '#334155'       : '#cbd5e1',

    // ── Modal ─────────────────────────────────────────────────────────────────
    modalBg:       isDark ? '#0d121f'            : '#ffffff',
    modalBorder:   isDark ? '#334155'            : '#94a3b8',
    modalBtnBg:    isDark ? '#1e293b'            : '#f1f5f9',
    modalBtnBorder:isDark ? '#334155'            : '#94a3b8',
    modalBtnText:  isDark ? '#cbd5e1'            : '#1e293b',

    // ── BackendLinks CopyCell ─────────────────────────────────────────────────
    backendCopyBg: isDark ? '#1e293b'            : '#f1f5f9',
    backendCopyBorder: isDark ? '#334155'        : '#94a3b8',

    // ── LinkGenerator ─────────────────────────────────────────────────────────
    linkResultBg:  isDark ? 'rgba(15,23,42,0.3)' : '#ffffff',
    linkUrlBg:     isDark ? 'rgba(2,6,23,0.4)'   : '#f8fafc',
    linkUrlText:   isDark ? '#cbd5e1'            : '#1e293b',
    linkBtnBg:     isDark ? 'rgba(30,41,59,0.6)' : '#f1f5f9',
    linkBtnBorder: isDark ? '#334155'            : '#cbd5e1',
    linkBtnText:   isDark ? '#94a3b8'            : '#475569',
    projectInactiveBg: isDark ? 'rgba(15,23,42,0.6)' : '#f1f5f9',
  };
}

export type Theme = ReturnType<typeof getTheme>;

// ─── 首頁例行公事卡片主題色 ───────────────────────────────────────────────────

type GroupThemeEntry = {
  bg:     { light: string; dark: string };
  border: { light: string; dark: string };
  title:  { light: string; dark: string };
  text:   { light: string; dark: string };
  bullet: { light: string; dark: string };
};

export const GROUP_THEME: GroupThemeEntry[] = [
  { // 每日 - 藍
    bg:     { light: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', dark: 'rgba(37,99,235,0.08)' },
    border: { light: '#bfdbfe', dark: 'rgba(59,130,246,0.2)' },
    title:  { light: '#1d4ed8', dark: '#93c5fd' },
    text:   { light: '#1e40af', dark: '#94a3b8' },
    bullet: { light: '#3b82f6', dark: '#3b82f6' },
  },
  { // 每週 - 綠
    bg:     { light: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', dark: 'rgba(16,185,129,0.08)' },
    border: { light: '#bbf7d0', dark: 'rgba(16,185,129,0.2)' },
    title:  { light: '#065f46', dark: '#6ee7b7' },
    text:   { light: '#064e3b', dark: '#94a3b8' },
    bullet: { light: '#10b981', dark: '#10b981' },
  },
  { // 隔週 - 橘
    bg:     { light: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', dark: 'rgba(245,158,11,0.08)' },
    border: { light: '#fed7aa', dark: 'rgba(245,158,11,0.2)' },
    title:  { light: '#92400e', dark: '#fcd34d' },
    text:   { light: '#78350f', dark: '#94a3b8' },
    bullet: { light: '#f59e0b', dark: '#f59e0b' },
  },
  { // 不定期 - 紫
    bg:     { light: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)', dark: 'rgba(139,92,246,0.08)' },
    border: { light: '#ddd6fe', dark: 'rgba(139,92,246,0.2)' },
    title:  { light: '#4c1d95', dark: '#c4b5fd' },
    text:   { light: '#3b0764', dark: '#94a3b8' },
    bullet: { light: '#8b5cf6', dark: '#8b5cf6' },
  },
];

// ─── 環境徽章色（後台/直連連結）─────────────────────────────────────────────

export const ENV_COLORS = {
  DEV:  { border: '#0ea5e9', badge: { background: 'rgba(14,165,233,0.1)',  color: '#38bdf8', border: '1px solid rgba(14,165,233,0.3)' } as React.CSSProperties },
  STG:  { border: '#8b5cf6', badge: { background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' } as React.CSSProperties },
  UAT:  { border: '#f59e0b', badge: { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } as React.CSSProperties },
  PROD: { border: '#f43f5e', badge: { background: 'rgba(244,63,94,0.1)',  color: '#fb7185', border: '1px solid rgba(244,63,94,0.3)'  } as React.CSSProperties },
};
