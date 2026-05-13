"use client";

import React, { useState } from 'react';
import { apiExampleImg, harExampleImg, itExampleImg } from './imageAssets';

const routineAnnouncement = {
  title: '例行公事與會議',
  groups: [
    {
      freq: '每日', emoji: '📅',
      items: [
        { text: 'QA 日報 2026：當天早上填寫完「昨日工作記錄」與「今日預計進度」。', link: { label: 'QA日報 2026', url: 'https://trevi-technology.sg.larksuite.com/wiki/S5avw0mhLiVdp8k5SbWl7ahYgmf?from=from_copylink&sheet=MBGb6R' }, note: '💡 建議：當天提前更新明天的記錄，超前佈署' },
      ],
    },
    {
      freq: '每週', emoji: '🕐',
      items: [{ text: '週四：組內站立會議' }],
    },
    {
      freq: '隔週', emoji: '🔁',
      items: [
        { text: '週四：Demo Day 成果展示 / 審閱 / 討論會議', link: { label: 'Demo Day 會議記錄歸檔', url: 'https://trevi-technology.sg.larksuite.com/wiki/YHXHwhIYtiwj3Cky7q0lKn47gFd?from=from_copylink' } },
        { text: '炒蛋 1-on-1：每月 20 號往前推一週進行' },
        { text: '回顧感恩活動：炒蛋 1-on-1 後一週進行' },
        { text: 'QA 月報：組長向上呈報', link: { label: 'QA 月報', url: 'https://trevi-technology.sg.larksuite.com/wiki/M9bCwh4AsigtrhkaJrolVvExgCe?from=from_copylink&sheet=yl5ZGY' } },
      ],
    },
    {
      freq: '不定期', emoji: '🎉',
      items: [{ text: '團建聚餐' }],
    },
  ],
};

// ─── 公告資料 ─────────────────────────────────────────────────────────────────

type Row = { key: string; copyValue: string; note?: string };
type Card = { label: string; rows: Row[] };
type Section = {
  heading: string;
  items: { text: string; links?: { label: string; url: string }[]; note?: string }[];
};
type Announcement =
  | { id: number; title: string; type: 'account'; cards: Card[] }
  | { id: number; title: string; type: 'tools'; sections: Section[] }
  | { id: number; title: string; type: 'table'; columns: string[]; rows: ({ label: string; url: string } | null)[][] }
  | { id: number; title: string; type: 'list'; items: { heading: string; content: string; highlight?: string; links?: { label: string; url: string; prefix?: string }[]; nestedItems?: { title: string; children: string[] }[]; subSections?: SubSection[]; tools?: string[]; methods?: { label: string; note: string }[]; exampleImage?: string; harMethod?: string[]; harImage?: string; harSteps?: string[] }[] };

const announcements: Announcement[] = [
  {
    id: 1,
    title: '公用帳號資訊',
    type: 'account' as const,
    cards: [
      {
        label: 'QA 公用帳號',
        rows: [
          { key: '帳號', copyValue: 'qa@trevi.cc' },
          { key: '密碼', copyValue: 'Aa12345678' },
        ],
      },
      {
        label: 'Figma 帳號',
        rows: [
          { key: '帳號', copyValue: 'qa@trevi.cc' },
          { key: '密碼', copyValue: 'ji3g4wk4xo6jo6qa', note: '（我是特雷維qa）' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'QA 測試工具與輔助系統',
    type: 'tools' as const,
    sections: [
      {
        heading: '測試環境與捷徑',
        items: [
          { text: '專案直連：', links: [{ label: 'https://bifrost.joeyt.dpdns.org/', url: 'https://bifrost.joeyt.dpdns.org/' }] },
          { text: 'QA 工具箱 (版本速查)：', links: [{ label: 'http://10.141.28.101:8080/index_dev.html', url: 'http://10.141.28.101:8080/index_dev.html' }], note: '佈署於 Scott 桌機' },
        ],
      },
      {
        heading: '輔助工具清單',
        items: [
          { text: '各式工具輔助：', links: [{ label: 'QA 百寶袋', url: 'https://trevi-technology.sg.larksuite.com/wiki/YiNmwZekciVffykj8q1lOcFAg4G' }] },
        ],
      },
      {
        heading: '數值與機率計算機',
        items: [
          { text: 'JP 注資計算機：', links: [{ label: 'jackpot-calculator', url: 'https://jackpot-calculator.onrender.com/' }] },
          { text: '信賴區間計算機：', links: [{ label: 'Confidence Interval V2', url: 'https://pascalhuang0611.github.io/confidence-interval/Confidence_Interval_V2.html' }] },
        ],
      },
      {
        heading: '測試資源清單 (速查表)',
        items: [
          { text: '各專案測試帳號清單：', links: [{ label: '瀏覽器', url: 'https://trevi-technology.sg.larksuite.com/wiki/IUsKwmeZui5BaKkcifTlH4qZgjd?open_in_browser=true' }, { label: 'Lark', url: 'https://trevi-technology.sg.larksuite.com/wiki/IUsKwmeZui5BaKkcifTlH4qZgjd' }] },
          { text: 'DB 速查表：', links: [{ label: 'DB 資料對應表', url: 'https://trevi-technology.sg.larksuite.com/wiki/N7ygw5d3BiU1RWkXJU6lJudWgSc' }] },
          { text: '錯誤代碼表：', links: [{ label: '錯誤代碼列表 & 專案總覽', url: 'https://trevi-technology.sg.larksuite.com/wiki/Dgrqw3FR5ilrnwkEDDYlZapugUe?from=from_copylink' }] },
          { text: 'API 相關文字說明：', links: [{ label: 'API 總索引', url: 'https://trevi-technology.sg.larksuite.com/wiki/HMDQwbY8NiSjYUkZMWflaYvfg5b?from=from' }] },
        ],
      },
      {
        heading: '後端與佈署說明',
        items: [
          { text: '版本檢查 / 機率表更新 / n8n 工具雲佈署說明：', links: [{ label: '小工具統整至VM操作說明', url: 'https://trevi-technology.sg.larksuite.com/wiki/UIJWw460xiDTREk6ubhlB0N2glb?from=from_copylink' }] },
        ],
      },
      {
        heading: '權限解鎖求助窗口',
        items: [
          { text: 'UAT - 錢包解鎖：於「TW团队接入GV」群組找 邱冠輝' },
          { text: 'PROD - 錢包解鎖：找 RC' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '教學與說明文件',
    type: 'table' as const,
    columns: ['遊戲', '運維', '其他'],
    rows: [
      [
        { label: '手動修改觸發熔斷的方法', url: 'https://trevi-technology.sg.larksuite.com/wiki/MbLTwoJY9iTGUbkfmKrlrHoTgie' },
        { label: '遊戲不同房間的版號切齊', url: 'https://trevi-technology.sg.larksuite.com/wiki/PCDKwcDCdi8pw7kZPzGlp2IJgvg' },
        { label: 'Git 新手入門小攻略', url: 'https://trevi-technology.sg.larksuite.com/wiki/Hwbkw8QSKiPf8qkrvV9l7uYZgFe?from=from_parent_docx' },
      ],
      [
        { label: '觸發熔斷時如何開錢包', url: 'https://trevi-technology.sg.larksuite.com/wiki/KF4XwYqmOiEcvCkmJSflsDgVgKJ' },
        { label: 'STG 推版後，如何將遊戲殘留資料清除', url: 'https://trevi-technology.sg.larksuite.com/wiki/GrEdw3gzMiPJo1kQbyKl1bCYgKg' },
        null,
      ],
      [
        null,
        { label: 'STG 改/換 機率表後伺服器的更新', url: 'https://trevi-technology.sg.larksuite.com/wiki/IRoOwaqFviPAWAkdvkClMiXmg5c' },
        null,
      ],
      [
        null,
        { label: '共用組 PP 推版方式 (STG / UAT)', url: 'https://trevi-technology.sg.larksuite.com/wiki/QGauwqKzjizA2dkuhEglhDnXgvg' },
        null,
      ],
      [
        null,
        { label: 'Redis 操作 SOP', url: 'https://trevi-technology.sg.larksuite.com/wiki/SX4vwt7DfiU3tfkmSBxlNsVygNI?open_in_browser=true' },
        null,
      ],
    ],
  },
  {
    id: 4,
    title: '作業規範與注意事項',
    type: 'list' as const,
    items: [
      {
        heading: '開單規範',
        content: '問題：開前後端互動的 bug 單時，沒有 API 往返資料開發無從查錯，需要額外花時間試圖複製\n意見：開前後端互動的 bug 單時，附上 API 往返資料',
        tools: ['用瀏覽器開發者工具的網路工具', '把 API 的請求跟返回資料抓下來'],
        methods: [
          { label: '手動擷圖（如下範例）', note: '最不直覺，最難引用' },
          { label: '把請求跟返回的資料 JSON 貼在單上', note: '可引用，但不美觀' },
          { label: '把 API 的往返資料下載成 HAR 附在單上', note: '可完整追溯分析，需要一點前端專業知識' },
        ],
        highlight: '開單必須檢附 API 往返資料',
        exampleImage: apiExampleImg,
        harMethod: [
          '在瀏覽器開發者工具 → 網路頁籤，重現問題操作',
          '在網路頁籤空白處點右鍵 → 「儲存所有內容為 HAR 格式」',
          '將下載的 .har 檔案附加到 bug 單附件',
        ],
        harImage: harExampleImg,
        harSteps: [
          '左上清除按鈕清掉記錄',
          '左上錄製按鈕開始錄製',
          '（複製問題）',
          '左上錄製按鈕停止錄製',
          '右上角下載按鈕下載 HAR',
        ],
      },
      {
        heading: '提測與驗收標準',
        content: '',
        links: [
          { label: '通用驗收準則', url: 'https://trevi-technology.sg.larksuite.com/wiki/XH0ywXERDiqIcPkVANvlh2Wfgbh?from=from_copylink', prefix: '通用驗收準則：' },
          { label: 'QA 提測標準與退件流程優化', url: 'https://trevi-technology.sg.larksuite.com/wiki/OGWpwXeb3iOVCqkdGhElp96lgQc?from=from_copylink', prefix: 'QA 提測標準與退件流程優化 for TG001 (by Mita)：' },
        ],
      },
      {
        heading: '跨部門溝通原則',
        content: '',
        subSections: [
          {
            title: 'IT 申請先過內部討論',
            nestedItems: [
              {
                title: '1. 申請思路',
                children: [
                  '相關人員在內部：先溝通確認結果後再跑信件流程，信件只是「留紀錄以及確認大家都知道且同意要做這件事」',
                  '相關人員在外部：也同時都建議優先確認關係部門可行性，再去發信件',
                  '補充：假設沒有確認可行性，就容易產生信件審批不過、無效信件來回，好比在群組上花了20分鐘來回十五句，倒不如面對面溝通花3分鐘結束',
                ],
              },
              {
                title: '2. 申請需求的必要性',
                children: [
                  '工作室評估：是否有需要基於其他測試手機型號測試，可以先提個方案於每日會議中評估，同時可做為信件上下文。\n　→ 我會提出：目前手機回歸測試已完成，並且工作飽和度不高，期望驗證非市場主流手機需求（型號XXXX 系統XXX），強化QA這段的覆蓋率\n　→ 假設PO認為合理、項管也認為工作量不衝突，那就可以找 IT 確認一下是否有可行性\n　→ 目標仍為先把「主要」業務做完，再去提升業務的「覆蓋率」',
                  '發起人：誰發起無所謂，有剛性需求且各端都確認過就行 👍',
                  '信件內容：簡單而言就說清楚上下文、背景、需求，沒有模糊地帶最好，並且附加相關單位跟誰都已確認可行性。目前信件需要過審就能執行。目前的信件內容其中沒有工作室評估、窗口評估、不確定主要業務是否完成、相關系統也需補充，源於有些模糊 🙏',
                ],
              },
              {
                title: '3. IT 控管',
                children: ['由於設備對外 wifi 也有相關資安問題，因此 IT 管控會較為嚴格'],
              },
              {
                title: '4. 補充',
                children: [
                  '基於以上方式運作會相對高效，公司也就60人不到，先溝通確認再跑信件，避免無效來回，同時信件也有可能等待時間過長 🙏',
                  '我不會針對這去做明確的流程，因為我認為這就是內部溝通下留個紀錄的事，甚至不需要寄信',
                  '以上，相關管理層也在麻煩進行宣導感謝 🙏',
                ],
              },
            ],
            image: itExampleImg,
          },
          {
            title: '疑難問題處理原則',
            nestedItems: [
              {
                title: '1. 定義',
                children: ['QA 無法自行判斷歸屬的問題'],
              },
              {
                title: '2. 解題步驟（GTD）',
                children: [
                  'QA 自行簡單分析排除：依照前端、後端、服務器排查標準鏈路，如果可以簡單分析（不要花太多時間）並確認原因，就開單並指派給對應人員',
                  '請運維協助簡單分析排除：如果 QA 無法自行排除，就請運維人員協助簡單排除（不要花太多時間），如果可以分析並確認原因，就開單並指派給對應人員',
                  '問題分級：\n　→ 低優先問題：記錄開單後，再例會上或者例行報告上列舉，待後續 PJM / PDM 排程處理，流程到此結束\n　→ 高優先問題（當機、帳務等 P0）：記錄開單後，上升問題層級加速處理',
                  '上升問題：請 PJM / PDM 拉會議協調各方一起下來看，直到排除 P0 問題為止',
                ],
              },
              {
                title: '3. 已知挑戰與應對策略',
                children: [
                  '開發對於方法跟補充資料有疑慮不予處理：一樣先開單立案，後續再看問題緊急度跟任務時間狀態，配合補上',
                  '問題拖久了，要求重測：請 PJM 額外排工項跟時間重測久遠問題',
                  '要上線或者上版前，還有些障礙問題沒排除，可能造成風險：\n　→ 提出已知未解問題跟風險分析報告：在群組跟報告中，列出未解問題清單與其優先權可能影響，明示其他單位可能風險\n　→ 時間跟風險的權衡主責：如果 PO 產品負責人堅持要上，我們做到揭露風險的義務，決定上市時間跟風險的權衡決定仍是 PO 產品負責人的權責',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: '專案文件與測試報告',
    type: 'tools' as const,
    sections: [
      {
        heading: '',
        items: [
          { text: '各工作室專案整理：', links: [{ label: '專案文件速查', url: 'https://trevi-technology.sg.larksuite.com/wiki/TqtowaHawiqwLQkuncylmzIJgme?from=from_copylink&sheet=f20f67' }] },
          { text: '壓測 RTP 報告彙整：', links: [{ label: '壓測 RTP 測試報告一覽', url: 'https://trevi-technology.sg.larksuite.com/wiki/CV2Uwmos4iRn7rkUBoIlhrTRgjd?from=from_copylink' }] },
          { text: '提案與追蹤系統 QIP：', links: [{ label: 'QIP 測試改進提案', url: 'https://trevi-technology.sg.larksuite.com/wiki/GqmgwIxBNiFmESk9nh6lL4zJgwg' }] },
          { text: '舊專案記錄：', links: [{ label: '專案項目一覽', url: 'https://trevi-technology.sg.larksuite.com/wiki/JoCNwo4rSixgfJkFP2BlQMJEg3b' }] },
        ],
      },
    ],
  },
  {
    id: 6,
    title: '評核標準與目標 (OKR / KPI)',
    type: 'tools' as const,
    sections: [
      {
        heading: '',
        items: [
          { text: 'OKR：', links: [{ label: 'Google 文件連結', url: 'https://docs.google.com/spreadsheets/d/1KyeeAQtJYhhJWQXBrYzXBPChagPST9CspGOfOFli1Bg/edit?gid=599383632#gid=599383632' }] },
          { text: '核心系統/架構：', links: [{ label: 'Trevi QA OS 2025.01', url: 'https://confluence.trevi.cc/display/QATEAM/Trevi+QA+OS+2025.01' }] },
        ],
      },
      {
        heading: 'KPI 評價標準',
        items: [
          { text: '公司大方向：', links: [{ label: 'KPI 評估基礎規範', url: 'https://trevi-technology.sg.larksuite.com/wiki/VDRSw06fGiuSdlkV4ZMltwlZgud?from=from_copylink' }] },
          { text: 'QA：', links: [{ label: '一般準則與 KPI 評核標準', url: 'https://confluence.trevi.cc/pages/viewpage.action?pageId=54099056' }] },
          { text: '手動測試基準 (2025/10/16)：', links: [{ label: '手動測試基準', url: 'https://trevi-technology.sg.larksuite.com/wiki/JkN2w8kTCimcxZkKVdGlXCEBgcc?from=from_copylink' }] },
        ],
      },
    ],
  },
  {
    id: 7,
    title: '歷史歸檔',
    type: 'tools' as const,
    sections: [
      {
        heading: '',
        items: [
          { text: '舊專案記錄：', links: [{ label: '專案項目一覽', url: 'https://trevi-technology.sg.larksuite.com/wiki/JoCNwo4rSixgfJkFP2BlQMJEg3b' }] },
        ],
      },
    ],
  },
];

// ─── SubSectionBlock ──────────────────────────────────────────────────────────

const SubSectionBlock: React.FC<{ sec: SubSection; isOpen: boolean; onToggle: () => void }> = ({ sec, isOpen, onToggle }) => {
  const [lightbox, setLightbox] = useState(false);
  return (
    <div className="border border-slate-700/60 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? 'bg-slate-800/60' : 'hover:bg-slate-800/30'}`}
      >
        <span className="text-sm font-extrabold text-white">{sec.title}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-slate-700/40 space-y-3">
          {sec.nestedItems.map((group, gi) => (
            <div key={gi} className="space-y-1.5">
              <p className="text-sm font-bold text-slate-300">{group.title}</p>
              <ul className="space-y-1.5 pl-3">
                {group.children.map((child, ci) => (
                  <li key={ci} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                    <span className="whitespace-pre-line">{child}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {sec.image && (
            <div className="space-y-2 pt-2">
              <button onClick={() => setLightbox(true)} className="block group text-left">
                <img src={sec.image} alt="範例圖片" style={{ width: '128px', height: 'auto' }} className="rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all opacity-80 group-hover:opacity-100" />
                <p className="text-xs text-slate-600 mt-1 group-hover:text-slate-400 transition-colors">點擊放大</p>
              </button>
              {lightbox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setLightbox(false)}>
                  <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
                    <img src={sec.image} alt="範例圖片" className="w-full rounded-2xl shadow-2xl" />
                    <button onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white">✕</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── HarImageBlock ────────────────────────────────────────────────────────────

const HarImageBlock: React.FC<{ img: string; steps: string[] }> = ({ img, steps }) => {
  const [lightbox, setLightbox] = useState(false);
  return (
    <div className="space-y-2 pt-2">
      <button onClick={() => setLightbox(true)} className="block group text-left">
        <img src={img} alt="HAR 範例" style={{ width: '128px', height: 'auto' }} className="rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all opacity-80 group-hover:opacity-100" />
        <p className="text-xs text-slate-600 mt-1 group-hover:text-slate-400 transition-colors">點擊放大</p>
      </button>
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setLightbox(false)}>
          <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <img src={img} alt="HAR 範例" className="w-full rounded-2xl shadow-2xl" />
            <button onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">✕</button>
          </div>
        </div>
      )}
      {steps.length > 0 && (
        <ol className="space-y-1 pl-1 pt-1">
          {steps.map((step, si) => (
            <li key={si} className="flex gap-2 text-sm text-slate-400">
              <span className="text-blue-400 flex-shrink-0 font-bold">{si + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

// ─── ListItem ─────────────────────────────────────────────────────────────────

type SubSection = { title: string; nestedItems: { title: string; children: string[] }[]; image?: string };
type ListItemData = { heading: string; content: string; highlight?: string; links?: { label: string; url: string; prefix?: string }[]; nestedItems?: { title: string; children: string[] }[]; subSections?: SubSection[]; tools?: string[]; methods?: { label: string; note: string }[]; exampleImage?: string; harMethod?: string[]; harImage?: string; harSteps?: string[] };

const ListItem: React.FC<{ item: ListItemData; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => {
  const [lightbox, setLightbox] = useState(false);
  const [openSubIdx, setOpenSubIdx] = useState<number | null>(null);
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? 'bg-slate-800/50' : 'hover:bg-slate-800/20'}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex-shrink-0">{index + 1}</span>
          <span className="text-sm font-extrabold text-slate-100">{item.heading}</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 py-4 space-y-3 border-t border-slate-800">
          {item.highlight && (
            <p className="text-base font-extrabold text-white tracking-wide">{item.highlight}</p>
          )}
          {item.content && item.content.split('\n').map((line, li) => (
            <p key={li} className="text-sm text-slate-400 leading-relaxed">{line}</p>
          ))}
          {item.links && item.links.length > 0 && (
            <ul className="space-y-2 pl-1">
              {item.links.map((lk, li) => (
                <li key={li} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                  <span>
                    {lk.prefix}
                    <a href={lk.url} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 ml-1">
                      {lk.label}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {item.nestedItems && item.nestedItems.length > 0 && (
            <div className="space-y-3">
              {item.nestedItems.map((group, gi) => (
                <div key={gi} className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-300">{group.title}</p>
                  <ul className="space-y-1.5 pl-3">
                    {group.children.map((child, ci) => (
                      <li key={ci} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                        <span className="whitespace-pre-line">{child}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {item.subSections && item.subSections.length > 0 && (
            <div className="space-y-2">
              {item.subSections.map((sec, si) => (
                <SubSectionBlock
                  key={si}
                  sec={sec}
                  isOpen={openSubIdx === si}
                  onToggle={() => setOpenSubIdx(openSubIdx === si ? null : si)}
                />
              ))}
            </div>
          )}
          {item.tools && item.tools.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">工具</p>
              <ol className="space-y-1 pl-1">
                {item.tools.map((t, ti) => (
                  <li key={ti} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-blue-400 flex-shrink-0 font-bold">{ti + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {item.methods && item.methods.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">做法（三選一）</p>
              <ol className="space-y-1 pl-1">
                {item.methods.map((m, mi) => (
                  <li key={mi} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-blue-400 flex-shrink-0 font-bold">{mi + 1}.</span>
                    <span>{m.label}<span className="text-slate-600 ml-1">（{m.note}）</span></span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {item.exampleImage && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">手動截圖範例</p>
              <button onClick={() => setLightbox(true)} className="block group text-left">
                <img src={item.exampleImage} alt="截圖範例" style={{ width: '128px', height: 'auto' }} className="rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all opacity-80 group-hover:opacity-100" />
                <p className="text-xs text-slate-600 mt-1 group-hover:text-slate-400 transition-colors">點擊放大</p>
              </button>
              {lightbox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setLightbox(false)}>
                  <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
                    <img src={item.exampleImage} alt="截圖範例" className="w-full rounded-2xl shadow-2xl" />
                    <button onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">✕</button>
                  </div>
                </div>
              )}
            </div>
          )}
          {item.harMethod && item.harMethod.length > 0 && (
            <div className="space-y-1 pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">HAR 下載方法</p>
              <ol className="space-y-1 pl-1">
                {item.harMethod.map((step, si) => (
                  <li key={si} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-blue-400 flex-shrink-0 font-bold">{si + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {item.harImage && (
            <HarImageBlock img={item.harImage} steps={item.harSteps ?? []} />
          )}
        </div>
      )}
    </div>
  );
};

const ListItems: React.FC<{ items: ListItemData[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <>
      {items.map((item, ii) => (
        <ListItem
          key={ii}
          item={item}
          index={ii}
          isOpen={openIdx === ii}
          onToggle={() => setOpenIdx(openIdx === ii ? null : ii)}
        />
      ))}
    </>
  );
};

const CopyCell: React.FC<{ value: string; note?: string }> = ({ value, note }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={copy} className="flex items-center gap-2 group text-left" title="點擊複製">
      <code
        style={{ backgroundColor: copied ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.35)', color: copied ? '#6ee7b7' : '#c7d2fe' }}
        className="text-sm font-mono px-2.5 py-1 rounded-lg select-all transition-colors"
      >
        {value}
      </code>
      {note && <span className="text-xs text-slate-500">{note}</span>}
      <span className={`text-[10px] font-bold transition-colors flex-shrink-0 ${copied ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
        {copied ? '✓ 已複製' : '複製'}
      </span>
    </button>
  );
};

// ─── HomeView ─────────────────────────────────────────────────────────────────

export const HomeView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-8">

      {/* ── 例行公事與會議 ── */}
      <div className="rounded-2xl border border-amber-500/20 bg-[#0d121f] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-amber-500/15">
          <span className="text-base leading-none">📌</span>
          <h2 className="text-base font-extrabold text-amber-300 tracking-tight">{routineAnnouncement.title}</h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-800/60">
          {routineAnnouncement.groups.map(group => (
            <div key={group.freq} className="px-5 py-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-base leading-none">{group.emoji}</span>
                <span className="text-sm font-bold text-slate-200">{group.freq}</span>
              </div>
              <ul className="space-y-2 pl-1">
                {group.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                    <span>
                      {item.text}
                      {'link' in item && item.link && (
                        <a href={item.link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 ml-1 text-xs">{item.link.label}</a>
                      )}
                      {'note' in item && item.note && (
                        <><br /><span className="text-slate-600 text-xs mt-0.5 block">{item.note}</span></>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── 所有公告事項 ── */}
      <div className="space-y-3">
        <p className="text-base font-extrabold text-white tracking-wide px-1">所有公告事項</p>

        {announcements.map((ann, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`rounded-2xl border overflow-hidden transition-all ${isOpen ? 'border-slate-600' : 'border-slate-800/50'}`}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${isOpen ? 'bg-slate-800/50' : 'bg-slate-900/20 hover:bg-slate-800/20'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-base font-extrabold text-white">{ann.title}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && ann.type === 'account' && (
                <div className="p-5 bg-slate-900/10">
                  <div className="grid grid-cols-2 gap-4">
                    {ann.cards.map((card, ci) => (
                      <div key={ci} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-800 bg-slate-800/30">
                          <span className="text-sm font-extrabold text-slate-100 tracking-wide">{card.label}</span>
                        </div>
                        <div className="divide-y divide-slate-800/60">
                          {card.rows.map((row, ri) => (
                            <div key={ri} className="flex items-center gap-4 px-4 py-3">
                              <span className="text-xs font-bold text-slate-500 w-10 flex-shrink-0">{row.key}</span>
                              <CopyCell value={row.copyValue} note={row.note} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isOpen && ann.type === 'table' && (
                <div className="p-5 bg-slate-900/10 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        {ann.columns.map(col => (
                          <th key={col} className="px-4 py-2.5 text-center text-xs font-extrabold text-slate-300 bg-slate-800/60 border border-slate-700 first:rounded-tl-lg last:rounded-tr-lg">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ann.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-3 border border-slate-800/60 align-top text-center">
                              {cell ? (
                                <a href={cell.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs leading-relaxed">
                                  <span className="text-slate-500 flex-shrink-0">▣</span>
                                  {cell.label}
                                </a>
                              ) : null}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {isOpen && ann.type === 'list' && (
                <div className="p-5 bg-slate-900/10 space-y-3">
                  <ListItems items={ann.items} />
                </div>
              )}

              {isOpen && ann.type === 'tools' && (
                <div className="p-5 bg-slate-900/10 space-y-6">
                  {ann.sections.map((sec, si) => (
                    <div key={si} className="space-y-2">
                      {sec.heading && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest">{sec.heading}</span>
                          <div className="flex-1 h-px bg-slate-800" />
                        </div>
                      )}
                      <ul className="space-y-2 pl-1">
                        {sec.items.map((item, ii) => (
                          <li key={ii} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                            <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                            <span>
                              {item.text}
                              {item.links && item.links.map((lk, li) => (
                                <a key={li} href={lk.url} target="_blank" rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 ml-1 text-xs">
                                  {lk.label}
                                </a>
                              ))}
                              {'note' in item && item.note && (
                                <span className="text-slate-600 text-xs ml-1">（{item.note}）</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
