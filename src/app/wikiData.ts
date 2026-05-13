// ─── wikiData.ts ─────────────────────────────────────────────────────────────
// 所有靜態資料：工作室/專案資訊、文件列表、活動日誌、導覽結構

export interface ProjectInfo {
  id: string;
  name: string;
  group: string;
  roomPrefix: string;
  account: string;
  token: string;
}

export const studioData: Record<string, ProjectInfo[]> = {
  '穩贏 WinWin': [
    { id: 'TG001', name: 'Live Mines',       group: '穩贏 WinWin', roomPrefix: 'LM', account: 'C88test2022', token: '2022' },
    { id: 'TG002', name: 'Basket Plinko',    group: '穩贏 WinWin', roomPrefix: 'BK', account: 'C88test2022', token: '2022' },
  ],
  '王牌 Ace': [
    { id: 'TG102', name: 'Pula Puti Flash',  group: '王牌 Ace', roomPrefix: 'PP', account: 'C88test2022', token: '2022' },
    { id: 'TG104', name: 'Lucky Drop',        group: '王牌 Ace', roomPrefix: 'LD', account: 'C88test2025', token: '2025' },
    { id: 'TG106', name: 'Cash Bingo',        group: '王牌 Ace', roomPrefix: 'CB', account: 'C88test2022', token: '2022' },
    { id: 'TG108', name: 'Piggy Crash',       group: '王牌 Ace', roomPrefix: 'PC', account: 'C88test2023', token: '2023' },
    { id: 'TG110', name: 'Lucky Coins',       group: '王牌 Ace', roomPrefix: 'LC', account: 'C88test2027', token: '2027' },
    { id: 'TG112', name: 'Pinoy Hi-Lo',       group: '王牌 Ace', roomPrefix: 'PH', account: 'C88test2022', token: '2022' },
    { id: 'TG126', name: 'Drop Ball Flash',   group: '王牌 Ace', roomPrefix: 'DF', account: 'C88test2023', token: '2023' },
  ],
  '八方來財': [
    { id: 'TG103', name: 'Color Roll',        group: '八方來財', roomPrefix: 'CR', account: 'C88test2022', token: '2022' },
    { id: 'TG105', name: 'BingBing Run',       group: '八方來財', roomPrefix: 'BR', account: 'C88test2022', token: '2022' },
    { id: 'TG111', name: 'Chicky Run',         group: '八方來財', roomPrefix: 'CN', account: 'C88test2022', token: '2022' },
    { id: 'TG113', name: 'Chicky Tower',       group: '八方來財', roomPrefix: 'CT', account: 'C88test2022', token: '2022' },
    { id: 'TG115', name: 'Basketball Goal',    group: '八方來財', roomPrefix: 'BG', account: 'C88test2022', token: '2022' },
    { id: 'TG117', name: 'Chicky Mines',       group: '八方來財', roomPrefix: 'CM', account: 'C88test2022', token: '2022' },
    { id: 'TG139', name: 'BingBing Run Mega',  group: '八方來財', roomPrefix: 'BM', account: 'C88test2022', token: '2022' },
  ],
};

export const studioList = Object.keys(studioData);

// ─── Wiki Docs ────────────────────────────────────────────────────────────────
// 整合說明：
// - 共用組（PP01/PP02/PP03）知識庫首頁共享同一連結，合併為 project='共用組' 一張卡片
// - 穩贏 WinWin（TG001/TG002）知識庫首頁共享同一連結，合併為 project='穩贏 WinWin' 一張卡片
// - 王牌 Ace / 八方來財各專案各自獨立

export const wikiDocs = [
  // ── 共用組 — 知識庫首頁整合為一張（PP01、PP02、PP03 共用）
  { id:  1, title: '知識庫首頁',    project: 'PP01、PP02、PP03', studio: '共用組',      section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/KnZewhB3Qiu3JdktCb4l7Ox8gnJ' },
  { id:  2, title: 'PRD 規格需求書', project: 'PP01',             studio: '共用組',      section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/NwxawGDnviZqDKky9eLlzGjRgfd' },
  { id:  3, title: 'PRD 規格需求書', project: 'PP02',             studio: '共用組',      section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/NwxawGDnviZqDKky9eLlzGjRgfd' },
  { id:  4, title: 'PRD 規格需求書', project: 'PP03',             studio: '共用組',      section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/NwxawGDnviZqDKky9eLlzGjRgfd' },
  // ── 穩贏 WinWin — 知識庫首頁整合為一張（TG001、TG002 共用）
  { id: 10, title: '知識庫首頁',    project: 'TG001、TG002',     studio: '穩贏 WinWin', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/GPTSwPRnmiPexxkVht6lXOmUgrh' },
  { id: 11, title: 'PRD 規格需求書', project: 'TG001',            studio: '穩贏 WinWin', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Hpc4wfp91itcjDkTF8FlIoHTgjc' },
  { id: 12, title: 'PRD 規格需求書', project: 'TG002',            studio: '穩贏 WinWin', section: '產品規格', docType: 'doc', larkUrl: '' },
  // ── 王牌 Ace
  { id: 20, title: '知識庫首頁',     project: 'TG102', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/ZH0LwwioiiKlwQk2oXRl7l1Ggxb' },
  { id: 21, title: 'PRD 規格需求書', project: 'TG102', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/RtgUw7HLfi2Q2ck0o4dlCPOggVb' },
  { id: 22, title: '知識庫首頁',     project: 'TG104', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/HR9KwKjwDiS92ukEODSlRUV6gXb' },
  { id: 23, title: 'PRD 規格需求書', project: 'TG104', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/YH60wmTtniugIrkrEvjlJXTCgkg' },
  { id: 24, title: '知識庫首頁',     project: 'TG106', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/ZCduwrxvai26rskQLiXlXSragTg' },
  { id: 25, title: 'PRD 規格需求書', project: 'TG106', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/M1pawWWRmiHHacke8pTlrcrOgXb' },
  { id: 26, title: '知識庫首頁',     project: 'TG108', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/OlgOwAsEUiAQPWkxJtOlF3HOgjh' },
  { id: 27, title: 'PRD 規格需求書', project: 'TG108', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/DnCcwabjNiwGSFk5QUelD6A8gag' },
  { id: 28, title: '知識庫首頁',     project: 'TG110', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/FyFewxdZci0lA3kTyJslmw2OgUd' },
  { id: 29, title: 'PRD 規格需求書', project: 'TG110', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/PTuVwNJcCiZwkFkHq43l61Kggud' },
  { id: 30, title: '知識庫首頁',     project: 'TG112', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Et68w2VubiG5eFk9rlsl6CHYgme' },
  { id: 31, title: 'PRD 規格需求書', project: 'TG112', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/CoOywZ4sQinJlOk4yjzlUrvnguy' },
  { id: 32, title: '知識庫首頁',     project: 'TG126', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/NjRZwL1Pdi7xgVkPf7Ql90cPgyc' },
  { id: 33, title: 'PRD 規格需求書', project: 'TG126', studio: '王牌 Ace', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/IiGTwRCGAipl57kWYCzlr6yQgcc' },
  // ── 八方來財
  { id: 40, title: '知識庫首頁',     project: 'TG103', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/IZUBw4QZVidg1hktk6klDJAzg3f' },
  { id: 41, title: 'PRD 規格需求書', project: 'TG103', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Jdhmw6eSlir3eRkhMCYluIe9g6e' },
  { id: 42, title: '知識庫首頁',     project: 'TG105', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/M0mXwxUsdihI2HkNoGAleiG4gzb' },
  { id: 43, title: 'PRD 規格需求書', project: 'TG105', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/QDtbwwXwOiqW8ek8lsAlQZGlgse' },
  { id: 44, title: '知識庫首頁',     project: 'TG111', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/UPf8wzsxYiMc8hkIubzlq81rgGa' },
  { id: 45, title: 'PRD 規格需求書', project: 'TG111', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/REeEwfDSIiI1GYkGN8NlCpAXg7b' },
  { id: 46, title: '知識庫首頁',     project: 'TG113', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/VnQ3wivUtiLOAzkmaftlD1UngTe' },
  { id: 47, title: 'PRD 規格需求書', project: 'TG113', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/VnQ3wivUtiLOAzkmaftlD1UngTe' },
  { id: 48, title: '知識庫首頁',     project: 'TG115', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/X116w2T2eixzoMkeVaslcdTrgzh' },
  { id: 49, title: 'PRD 規格需求書', project: 'TG115', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/X116w2T2eixzoMkeVaslcdTrgzh' },
  { id: 50, title: '知識庫首頁',     project: 'TG117', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/SkUMwFJKeiQNcCkJ7Zwl9JL9g0d' },
  { id: 51, title: 'PRD 規格需求書', project: 'TG117', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/RhTBwrWhMitbQpkyv4klQO5egdf' },
  { id: 52, title: '知識庫首頁',     project: 'TG121', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Ko1Ywv6aSiV9LDkxZigl0MoMgvc' },
  { id: 53, title: 'PRD 規格需求書', project: 'TG121', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Um8gwjdDUijgwWkcm1mlt4rfg4b' },
  { id: 54, title: '知識庫首頁',     project: 'TG139', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Xg0kwmYasikOSHklvAulsItugfc' },
  { id: 55, title: 'PRD 規格需求書', project: 'TG139', studio: '八方來財', section: '產品規格', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/XFolw5ZrlimHK3kGf7vlyr7Wgmf' },
  // ── 共用組 — 測試規範（PP01、PP02、PP03 共用同一份）
  { id: 201, title: '測試計畫', project: 'PP01、PP02、PP03', studio: '共用組', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/WkZBwCLTLiamyZkkfr5lIcFGgMg' },
  // ── 穩贏 WinWin — 測試規範
  { id: 211, title: '測試計畫', project: 'TG001', studio: '穩贏 WinWin', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/DosbwtwI5ixXGQkPxAxlNi5ggJd' },
  { id: 212, title: '測試計畫', project: 'TG002', studio: '穩贏 WinWin', section: '測試規範', docType: 'doc', larkUrl: '' },
  // ── 王牌 Ace — 測試規範
  { id: 221, title: '測試計畫', project: 'TG102', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/XGBwwCjrnig2tTktZZ0l4U0jgLh' },
  { id: 222, title: '測試計畫', project: 'TG104', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/ZuEiwJf9piucChkQxKHlbA5lgUc' },
  { id: 223, title: '測試計畫', project: 'TG106', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/BfoIw89zJiqN2KkqmyAlSTfLgw6' },
  { id: 224, title: '測試計畫', project: 'TG108', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/ZOU6wx9BOiwNefkNx3jllxylgOb' },
  { id: 225, title: '測試計畫', project: 'TG110', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/BfoIw89zJiqN2KkqmyAlSTfLgw6' },
  { id: 226, title: '測試計畫', project: 'TG112', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: '' },
  { id: 227, title: '測試計畫', project: 'TG126', studio: '王牌 Ace', section: '測試規範', docType: 'doc', larkUrl: '' },
  // ── 八方來財 — 測試規範
  { id: 231, title: '測試計畫', project: 'TG103', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/YFLJwq8jfiG0gjk2wIilCs0tgjb' },
  { id: 232, title: '測試計畫', project: 'TG105', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/Ztl6wBLBkiZKBrkOd5AluozDgP0' },
  { id: 233, title: '測試計畫', project: 'TG111', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/QrwNwY9uxiq1XNkxprulCdQpgZw' },
  { id: 234, title: '測試計畫', project: 'TG113', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/NiGqwiPs2iE9EVkBq7PlMVBOgLc' },
  { id: 235, title: '測試計畫', project: 'TG115', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/HKiewPtKqiVHGLkDFjSl9FljgFc' },
  { id: 236, title: '測試計畫', project: 'TG117', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/VYXPwzmQgiGsTIkKvFElTQiDg7e' },
  { id: 237, title: '測試計畫', project: 'TG121', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: '' },
  { id: 238, title: '測試計畫', project: 'TG139', studio: '八方來財', section: '測試規範', docType: 'doc', larkUrl: 'https://trevi-technology.sg.larksuite.com/wiki/D2Nywuc7pi4sB6ktaGNlTe9vgNd' },
];

export type WikiDoc = typeof wikiDocs[0];
export type Mode = 'project' | 'category' | 'function' | 'toolbox';

// ─── Nav / Studio Groups ──────────────────────────────────────────────────────

export const navGroups: Record<string, string[]> = {
  '共用組':       ['PP01', 'PP02', 'PP03'],
  '穩贏 WinWin':  ['TG001', 'TG002'],
  '王牌 Ace':     ['TG102', 'TG104', 'TG106', 'TG108', 'TG110', 'TG112', 'TG126'],
  '八方來財':     ['TG103', 'TG105', 'TG111', 'TG113', 'TG115', 'TG117', 'TG121', 'TG139'],
};

export const studioGroups: { studio: string; projects: string[] }[] = [
  { studio: '共用組',       projects: ['PP01', 'PP02', 'PP03'] },
  { studio: '穩贏 WinWin',  projects: ['TG001', 'TG002'] },
  { studio: '王牌 Ace',     projects: ['TG102', 'TG104', 'TG106', 'TG108', 'TG110', 'TG112', 'TG126'] },
  { studio: '八方來財',     projects: ['TG103', 'TG105', 'TG111', 'TG113', 'TG115', 'TG117', 'TG121', 'TG139'] },
];

// 依類別模式側欄結構：section → 子標題清單（從 wikiDocs 自動推導）
export const categoryStructure = [
  {
    section: '產品規格',
    titles: [...new Set(wikiDocs.filter(d => d.section === '產品規格').map(d => d.title))],
  },
  {
    section: '測試報告',
    titles: [...new Set(wikiDocs.filter(d => d.section === '測試報告').map(d => d.title))],
  },
] as { section: string; titles: string[] }[];

// ─── Activity ─────────────────────────────────────────────────────────────────

export const recentActivity = [
  { date: '2024-04-08', title: 'TG102 RTP 報告審核完成',       category: 'Audit',       color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { date: '2024-04-05', title: '伺服器維護通知 - 測試環境 B',   category: 'Maintenance', color: 'text-amber-400',   dot: 'bg-amber-400'   },
  { date: '2024-04-02', title: '新成員 Ivory 加入測試組',       category: 'Team',        color: 'text-blue-400',    dot: 'bg-blue-400'    },
  { date: '2024-03-28', title: 'TG120 上線前最終驗收',          category: 'Release',     color: 'text-violet-400',  dot: 'bg-violet-400'  },
];

export const allActivity = [
  ...recentActivity,
  { date: '2024-03-22', title: 'TG108 壓力測試報告送審',        category: 'Audit',       color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { date: '2024-03-18', title: 'Q1 測試總結會議紀錄上傳',       category: 'Team',        color: 'text-blue-400',    dot: 'bg-blue-400'    },
  { date: '2024-03-10', title: '風控規則版本 v2.3 更新',        category: 'Release',     color: 'text-violet-400',  dot: 'bg-violet-400'  },
  { date: '2024-03-05', title: '測試環境 A 例行維護完成',       category: 'Maintenance', color: 'text-amber-400',   dot: 'bg-amber-400'   },
];

export const announcementFull = `我們將討論本季度的測試自動化目標、RTP 驗證流程優化以及新項目的資源分配。請所有 QA 成員準時參加。

本次會議議程如下：
一、Q2 測試自動化目標回顧與調整
二、RTP 驗證流程現況分析與優化方案
三、TG120 / TG122 新項目資源分配說明
四、人員異動與任務交接確認
五、Q&A 開放提問

會議時間：2024 年 4 月 15 日（一）14:00–16:00
會議地點：B3 會議室 / 線上同步（Teams 連結另行通知）

請各組組長提前準備本月測試進度摘要，並於會議前一日上傳至 Wiki。`;
