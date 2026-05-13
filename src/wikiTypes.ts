// ─── wikiTypes.ts ─────────────────────────────────────────────────────────────
// 所有共用型別定義，集中在這裡方便各元件 import

// ─── 導覽模式 ────────────────────────────────────────────────────────────────

export type Mode = 'project' | 'category' | 'function' | 'toolbox';

// ─── 工作室 / 專案 ────────────────────────────────────────────────────────────

export interface ProjectInfo {
  id: string;
  name: string;
  group: string;
  roomPrefix: string;
  account: string;
  token: string;
}

export interface StudioGroup {
  studio: string;
  projects: string[];
}

// ─── 文件 ─────────────────────────────────────────────────────────────────────

export type DocType = 'doc' | 'flowchart' | 'figma';
export type SectionType = '產品規格' | '測試報告';

export interface WikiDoc {
  id: number;
  title: string;
  project: string;
  studio: string;
  section: SectionType;
  docType: DocType;
  larkUrl: string;
}

// ─── 客戶端連結生成器 ─────────────────────────────────────────────────────────

export type EnvName = 'DEV' | 'STG' | 'UAT' | 'PROD';
export type Platform = 'h5' | 'pch5';

export interface GeneratedLink {
  title: string;
  icon: React.ReactNode;
  url: string;
  desc: string;
}

export interface EnvGroup {
  env: EnvName;
  label: string;
  borderClass: string;
  badgeClass: string;
  links: GeneratedLink[];
}

// ─── 活動日誌 ─────────────────────────────────────────────────────────────────

export interface ActivityItem {
  date: string;
  title: string;
  category: string;
  color: string;
  dot: string;
}
