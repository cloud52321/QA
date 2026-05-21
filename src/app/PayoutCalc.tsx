"use client";

import React, { useState } from 'react';

const studioProjects: Record<string, string[]> = {
  '穩贏 WinWin': ['TG001', 'TG002'],
  '王牌 Ace':    ['TG102', 'TG104', 'TG106', 'TG108', 'TG110', 'TG112', 'TG126'],
  '八方來財':    ['TG103', 'TG105', 'TG111', 'TG113', 'TG115', 'TG117', 'TG121', 'TG139'],
};

const BET_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000];
const CARD_OPTIONS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const CARD_RANK: Record<string, number> = {
  'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,
  '8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,
};

// 第二張牌賠率表（首輪牌面）
const ODDS_R2: Record<string, { high: number; low: number }> = {
  'A':  { high:1.02,  low:12.35 }, '2': { high:1.02, low:6.17 },
  '3':  { high:1.12,  low:4.11  }, '4': { high:1.23, low:3.08 },
  '5':  { high:1.37,  low:2.47  }, '6': { high:1.54, low:2.05 },
  '7':  { high:1.76,  low:1.76  }, '8': { high:2.05, low:1.54 },
  '9':  { high:2.47,  low:1.37  }, '10':{ high:3.08, low:1.23 },
  'J':  { high:4.11,  low:1.12  }, 'Q': { high:6.17, low:1.02 },
  'K':  { high:12.35, low:1.02  },
};

// 首輪（第2張）賠率表，原始值（全精度）
const ODDS_R2_RAW: Record<string, { high: number; low: number }> = {
  'A':  { high:1.0292,  low:12.3500 }, '2': { high:1.0292, low:6.1750 },
  '3':  { high:1.1227,  low:4.1167  }, '4': { high:1.2350, low:3.0875 },
  '5':  { high:1.3722,  low:2.4700  }, '6': { high:1.5438, low:2.0583 },
  '7':  { high:1.7643,  low:1.7643  }, '8': { high:2.0583, low:1.5438 },
  '9':  { high:2.4700,  low:1.3722  }, '10':{ high:3.0875, low:1.2350 },
  'J':  { high:4.1167,  low:1.1227  }, 'Q': { high:6.1750, low:1.0292 },
  'K':  { high:12.3500, low:1.0292  },
};

// 後續（第3張起）賠率表，原始值（全精度）
const ODDS_R3_RAW: Record<number, { high: number; low: number }> = {
  1:  { high:1.056251, low:12.67501 }, 2:  { high:1.056251, low:6.337506 },
  3:  { high:1.152273, low:4.225004 }, 4:  { high:1.267501, low:3.168753 },
  5:  { high:1.408334, low:2.535002 }, 6:  { high:1.584376, low:2.112502 },
  7:  { high:1.810716, low:1.810716 }, 8:  { high:2.112502, low:1.584376 },
  9:  { high:2.535002, low:1.408334 }, 10: { high:3.168753, low:1.267501 },
  11: { high:4.225004, low:1.152273 }, 12: { high:6.337506, low:1.056251 },
  13: { high:12.67501, low:1.056251 },
};

// 顯示賠率：無條件捨去至小數第二位
const floor2 = (n: number) => Math.floor(Math.round(n * 10000) / 100) / 100;
const displayOdds = (raw: number) => floor2(raw);

interface HistoryEntry {
  id: number;
  card: string;
  choice: 'high' | 'low' | 'base' | null;
  oddsRaw: number | null;   // 原始全精度賠率（用於乘積）
  oddsDisplay: number | null; // 顯示賠率（捨去後）
  extraPay: boolean;
  skipped?: boolean;         // 是否為 Skip 替換的牌
  cumulativeRaw: number;    // 原始乘積（不含Extra，供紀錄）
  cumulativeChain: number;   // 原始連乘（含Extra，供下一行計算）
  cumulativeDisplay: number; // 顯示總賠率（捨去後）
}

// ─── TG112Calc ────────────────────────────────────────────────────────────────

const TG112Calc: React.FC = () => {
  const [bet, setBet] = useState(5);
  const [card, setCard] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [nextId, setNextId] = useState(1);
  const [tieChoice, setTieChoice] = useState<null | { pendingCard: string; prevCard: string }>(null);
  const [skipModal, setSkipModal] = useState(false);
  const [skipCount, setSkipCount] = useState(0);
  const SKIP_LIMIT = 30;
  const [cashOutToast, setCashOutToast] = useState(false);
  const [balance, setBalance] = useState<string>('');
  const [balanceDir, setBalanceDir] = useState<'up' | 'down' | null>(null);

  const floor2 = (n: number) => Math.floor(Math.round(n * 10000) / 100) / 100;

  const computeOdds = (
    prevCard: string, curCard: string, round: number, choice?: 'high' | 'low'
  ): { oddsRaw: number; choice: 'high' | 'low' } => {
    const prevRank = CARD_RANK[prevCard];
    const curRank  = CARD_RANK[curCard];
    const table = round >= 3 ? ODDS_R3_RAW[prevRank] : ODDS_R2_RAW[prevCard];
    if (choice) return { oddsRaw: choice === 'high' ? table.high : table.low, choice };
    if (curRank > prevRank) return { oddsRaw: table.high, choice: 'high' };
    return { oddsRaw: table.low, choice: 'low' };
  };

  const addEntry = (cardVal: string, choice?: 'high' | 'low') => {
    const round = history.filter(h => !h.skipped).length + 1;
    let entry: HistoryEntry;

    if (round === 1) {
      entry = { id: nextId, card: cardVal, choice: 'base', oddsRaw: null, oddsDisplay: null, extraPay: false, cumulativeRaw: 1, cumulativeChain: 1, cumulativeDisplay: 1 };
    } else {
      const prevEntry = history[history.length - 1];
      const prevRank = CARD_RANK[prevEntry.card];
      const curRank  = CARD_RANK[cardVal];
      const isTie = prevRank === curRank;

      if (isTie && !choice) {
        setTieChoice({ pendingCard: cardVal, prevCard: prevEntry.card });
        setCard('');
        return;
      }

      const { oddsRaw, choice: resolvedChoice } = computeOdds(prevEntry.card, cardVal, round, choice);
      const cumulativeRaw = prevEntry.cumulativeRaw * oddsRaw;
      const cumulativeChain = prevEntry.cumulativeChain * oddsRaw; // 用上一行含Extra的連乘
      const oddsDisplay = floor2(oddsRaw);
      const cumulativeDisplay = floor2(cumulativeChain);
      entry = {
        id: nextId, card: cardVal, choice: resolvedChoice,
        oddsRaw, oddsDisplay,
        extraPay: false,
        cumulativeRaw, cumulativeChain,
        cumulativeDisplay,
      };
    }

    setHistory(prev => [...prev, entry]);
    setNextId(n => n + 1);
    setCard('');
    setTieChoice(null);
  };

  const handleCardSelect = (val: string) => { if (!val) return; addEntry(val); };

  // Skip: 新增一行，牌面替換，賠率顯示—，總賠率繼承
  const addSkipEntry = (newCard: string) => {
    const lastEntry = history[history.length - 1];
    if (!lastEntry) return;
    const skippedEntry: HistoryEntry = {
      id: nextId,
      card: newCard,
      choice: null,
      oddsRaw: null,
      oddsDisplay: null,
      extraPay: false,
      skipped: true,
      cumulativeRaw: lastEntry.cumulativeRaw,
      cumulativeChain: lastEntry.cumulativeChain,
      cumulativeDisplay: lastEntry.cumulativeDisplay,
    };
    setHistory(prev => [...prev, skippedEntry]);
    setNextId(n => n + 1);
    setSkipCount(n => n + 1);
    setSkipModal(false);
  };
  const handleTieChoice = (choice: 'high' | 'low') => { if (!tieChoice) return; addEntry(tieChoice.pendingCard, choice); };

  const toggleExtraPay = (id: number) => {
    setHistory(prev => recalcCumulative(prev.map(h => h.id === id ? { ...h, extraPay: !h.extraPay } : h)));
  };

  const deleteEntry = (id: number) => {
    const newHistory = recalcCumulative(history.filter(h => h.id !== id));
    setHistory(newHistory);
    setTieChoice(null);
    if (newHistory.length === 0) setSkipCount(0);
  };

  const recalcCumulative = (entries: HistoryEntry[]): HistoryEntry[] => {
    let cumRaw = 1;
    let chain = 1; // 含Extra的原始連乘
    return entries.map((h, i) => {
      if (i === 0) return { ...h, oddsRaw: null, oddsDisplay: null, choice: 'base' as const, cumulativeRaw: 1, cumulativeChain: 1, cumulativeDisplay: 1 };
      // Skip 行：維持原本的 null 賠率，只繼承累積值
      if (h.skipped) return { ...h, oddsRaw: null, oddsDisplay: null, cumulativeRaw: cumRaw, cumulativeChain: chain, cumulativeDisplay: floor2(chain) };
      const base = h.oddsRaw ?? 1;
      cumRaw = cumRaw * base;
      const oddsDisp = floor2(base);
      const effectiveRaw = h.extraPay ? base * 1.5 : base;
      chain = effectiveRaw * chain;
      const cumulativeDisplay = floor2(chain);
      return { ...h, cumulativeRaw: cumRaw, cumulativeChain: chain, cumulativeDisplay, oddsDisplay: oddsDisp };
    });
  };

  const handleDeductBet = () => {
    const bal = parseFloat(balance);
    if (isNaN(bal)) return;
    setBalance((Math.round((bal - bet) * 100) / 100).toFixed(2));
    setBalanceDir('down');
  };

  const handleCashOut = () => {
    const bal = parseFloat(balance) || 0;
    const lastDisp = history.length > 0 ? history[history.length - 1].cumulativeDisplay : 1;
    const cashout = floor2(lastDisp * bet);
    setBalance(floor2(bal + cashout).toFixed(2));
    setBalanceDir('up');
    setCashOutToast(true);
    setTimeout(() => setCashOutToast(false), 2000);
  };

  const reset = () => { setBet(5); setCard(''); setHistory([]); setTieChoice(null); setBalance(''); setBalanceDir(null); setSkipCount(0); };

  const lastEntry = history[history.length - 1];
  const totalPayout = lastEntry ? Math.round(lastEntry.cumulativeDisplay * bet * 100) / 100 : 0;

  return (
    <div className="space-y-6">
      {/* 標題列 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">TG112</span>
          <span className="text-sm font-bold text-slate-200">Pinoy Hi-Lo 賠付計算</span>
        </div>
        <button onClick={reset} className="text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 px-3 py-1.5 rounded-lg transition-all">重置</button>
      </div>

      {/* 輸入區 */}
      <div className="space-y-4">
        {/* 第一排：Balance + Bet */}
        <div className="grid grid-cols-2 gap-4">
          {/* Balance */}
          <div
            className="rounded-xl p-4 space-y-2 transition-all"
            style={{
              background: 'rgba(15,23,42,0.5)',
              border: `1px solid ${balanceDir === 'up' ? 'rgba(52,211,153,0.5)' : balanceDir === 'down' ? 'rgba(251,113,133,0.5)' : 'rgba(51,65,85,0.8)'}`,
            }}
          >
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Balance</label>
            <input
              type="number"
              value={balance}
              onChange={e => { setBalance(e.target.value); setBalanceDir(null); }}
              placeholder="輸入餘額"
              style={{
                color: balanceDir === 'up' ? '#6ee7b7' : balanceDir === 'down' ? '#fda4af' : '#e2e8f0',
              }}
              className="w-full bg-slate-950/60 border border-slate-700 font-mono text-sm rounded-xl px-4 py-2.5 focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Bet */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bet</label>
            <div className="flex gap-2">
              <select value={bet} onChange={e => setBet(parseFloat(parseFloat(e.target.value).toFixed(2)))}
                className="flex-1 bg-slate-950/60 border border-slate-700 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500/50 transition-all">
                {BET_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <button
                onClick={handleDeductBet}
                disabled={history.length > 0}
                className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
              >
                扣除
              </button>
            </div>
          </div>
        </div>

        {/* 第二排：牌面按鈕 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {history.length === 0 ? '基準牌' : '下一張牌面'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['A','2','3','4','5','6','7','8','9','10','J','Q','K'].map(v => (
              <button
                key={v}
                onClick={() => { handleCardSelect(v); setBalanceDir(null); }}
                disabled={!!tieChoice}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all disabled:opacity-40 bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-300"
              >
                {v}
              </button>
            ))}
          </div>
          {history.length >= 1 && (
            <button
              onClick={() => setSkipModal(true)}
              disabled={!!tieChoice || skipCount >= SKIP_LIMIT}
              className="mt-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all disabled:opacity-40 bg-violet-500/10 border-violet-500/30 text-violet-300 hover:bg-violet-500/20"
            >
              ↺ Skip（替換牌面）{skipCount > 0 && <span className="ml-1 text-violet-500">{skipCount}/{SKIP_LIMIT}</span>}
            </button>
          )}
        </div>
      </div>

      {/* 同牌選擇 */}
      {tieChoice && (() => {
        const isAA = tieChoice.prevCard === 'A' && tieChoice.pendingCard === 'A';
        const isKK = tieChoice.prevCard === 'K' && tieChoice.pendingCard === 'K';
        return (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-bold text-amber-300">⚠ 同點數！請選擇方向</span>
            <div className="flex gap-2">
              {isAA && (
                <>
                  <button onClick={() => handleTieChoice('low')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white text-xs font-bold rounded-lg transition-all">Same (Low)</button>
                  <button onClick={() => handleTieChoice('high')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white text-xs font-bold rounded-lg transition-all">High ↑</button>
                </>
              )}
              {isKK && (
                <>
                  <button onClick={() => handleTieChoice('high')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white text-xs font-bold rounded-lg transition-all">Same (High)</button>
                  <button onClick={() => handleTieChoice('low')} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 border border-violet-400 text-white text-xs font-bold rounded-lg transition-all">Low ↓</button>
                </>
              )}
              {!isAA && !isKK && (
                <>
                  <button onClick={() => handleTieChoice('high')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 border border-blue-400 text-white text-xs font-bold rounded-lg transition-all">High ↑</button>
                  <button onClick={() => handleTieChoice('low')} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 border border-violet-400 text-white text-xs font-bold rounded-lg transition-all">Low ↓</button>
                </>
              )}
            </div>
          </div>
        );
      })()}

      {/* 歷史記錄 */}
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">歷史記錄</p>
            <button onClick={() => { setHistory([]); setTieChoice(null); }} className="text-xs text-slate-600 hover:text-rose-400 transition-colors">清除全部</button>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-400">#</th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-400">牌面</th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-400">賠率</th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-400">總賠率</th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-slate-400">總賠付</th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-slate-400">Extra</th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-slate-400">功能</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => {
                  const dispOdds = h.oddsDisplay;
                  const dispCumulative = h.cumulativeDisplay;
                  const payout = Math.floor(Math.round(dispCumulative * bet * 10000) / 100) / 100;
                  return (
                    <tr key={h.id} className={`border-b border-slate-800/40 ${i % 2 === 0 ? '' : 'bg-slate-900/20'}`}>
                      <td className="px-3 py-2.5 text-slate-500 text-xs">{i + 1}</td>
                      <td className="px-3 py-2.5 text-cyan-300 font-mono font-bold">
                        {h.card}
                        {h.skipped && <span className="ml-1 text-[9px] font-bold text-violet-400 border border-violet-500/30 rounded px-1">SKIP</span>}
                      </td>
                      <td className="px-3 py-2.5 text-slate-300 font-mono text-xs">
                        {dispOdds == null
                          ? <span className="text-slate-600">—</span>
                          : h.extraPay
                            ? <span className="text-amber-300">{floor2((h.oddsRaw ?? 1) * 1.5).toFixed(2)}x</span>
                            : <>{dispOdds.toFixed(2)}x</>}
                      </td>
                      <td className="px-3 py-2.5 text-amber-300 font-mono font-bold text-xs">
                        {h.extraPay
                          ? <>{dispCumulative.toFixed(2)}x</>
                          : <>{dispCumulative.toFixed(2)}x</>}
                      </td>
                      <td className="px-3 py-2.5 text-emerald-300 font-mono font-bold text-xs">
                        {floor2(dispCumulative * bet).toFixed(2)}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {h.oddsRaw !== null && (
                          <input type="checkbox" checked={h.extraPay} onChange={() => toggleExtraPay(h.id)}
                            className="w-4 h-4 accent-amber-400 cursor-pointer" />
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <button onClick={() => deleteEntry(h.id)}
                          className="text-[10px] font-bold px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all">
                          移除
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-700 bg-slate-800/40">
                  <td colSpan={4} className="px-3 py-2.5 text-xs font-bold text-slate-400 text-right">最終賠付</td>
                  <td className="px-3 py-2.5 text-emerald-300 font-mono font-extrabold">{totalPayout.toFixed(2)}</td>
                  <td></td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center gap-2">
                      <button onClick={handleCashOut}
                        className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all whitespace-nowrap">
                        Cash Out
                      </button>
                      {cashOutToast && (
                        <span className="text-[10px] font-bold text-emerald-400 animate-pulse whitespace-nowrap">✓ 已 Cash Out</span>
                      )}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Skip 彈窗 */}
      {skipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSkipModal(false)}>
          <div className="bg-[#0d121f] border border-slate-700 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-violet-400 text-base">↺</span>
              <h3 className="text-base font-extrabold text-white">Skip — 替換牌面</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">選擇新牌面，總賠率維持不變（剩餘 {SKIP_LIMIT - skipCount} 次）</p>
            <div className="flex flex-wrap gap-2">
              {["A","2","3","4","5","6","7","8","9","10","J","Q","K"].map(v => (
                <button
                  key={v}
                  onClick={() => addSkipEntry(v)}
                  className="px-3 py-2 rounded-xl text-sm font-bold border transition-all bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-violet-600/20 hover:border-violet-500/40 hover:text-violet-300"
                >
                  {v}
                </button>
              ))}
            </div>
            <button onClick={() => setSkipModal(false)} className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold rounded-xl transition-all">
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


// ─── 預設佔位 ─────────────────────────────────────────────────────────────────

const PlaceholderCalc: React.FC<{ project: string }> = ({ project }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">{project}</span>
    <p className="text-slate-500 text-sm">賠付計算功能開發中，敬請期待</p>
  </div>
);

// ─── PayoutCalc ───────────────────────────────────────────────────────────────

const PROJECT_ICON: Record<string, string> = {
  TG102: '🔴', TG104: '⚡', TG112: '🃏', TG114: '🛺',
  TG116: '🧙', TG118: '🪙', TG120: '🧙', TG122: '🪙', TG124: '🪙',
  TG126: '♠️', TG128: '🧙', TG130: '🪙',
  TG103: '🍒', TG105: '🍿', TG107: '🧙', TG109: '🎯',
  TG115: '🏀', TG117: '💥',
  TG139: '💯', TG119: '⚽', TG121: '🚀', TG123: '🎈',
};

const PROJECT_SVG_ICON: Record<string, React.ReactNode> = {
  TG001: (
    <svg width="16" height="16" viewBox="0 0 88 100">
      <path d="M8,20 C14,4 22,12 18,26" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="18" cy="26" r="5" fill="#fde047"/>
      <line x1="18" y1="26" x2="26" y2="18" stroke="#fde047" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="26" x2="28" y2="28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="44" cy="58" r="36" fill="#111827" stroke="#374151" strokeWidth="2"/>
      <circle cx="34" cy="46" r="8" fill="white" opacity="0.1"/>
      <rect x="38" y="20" width="12" height="8" rx="3" fill="#374151"/>
    </svg>
  ),
  TG002: (
    <svg width="16" height="16" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r="42" fill="#ea580c"/>
      <line x1="44" y1="2" x2="44" y2="86" stroke="#1c1917" strokeWidth="3"/>
      <line x1="2" y1="44" x2="86" y2="44" stroke="#1c1917" strokeWidth="3"/>
      <path d="M44,2 C20,16 20,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/>
      <path d="M44,2 C68,16 68,72 44,86" fill="none" stroke="#1c1917" strokeWidth="3"/>
      <circle cx="44" cy="44" r="42" fill="none" stroke="#c2410c" strokeWidth="2"/>
      <ellipse cx="32" cy="28" rx="10" ry="6" fill="white" opacity="0.18" transform="rotate(-25,32,28)"/>
    </svg>
  ),
  TG110: (
    <svg width="16" height="16" viewBox="0 0 88 88">
      <ellipse cx="48" cy="48" rx="38" ry="38" fill="#92400e" opacity="0.4"/>
      <circle cx="44" cy="44" r="38" fill="#f59e0b"/>
      <circle cx="44" cy="44" r="38" fill="none" stroke="#d97706" strokeWidth="4"/>
      <circle cx="44" cy="44" r="28" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
      <text x="45" y="56" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="140" fontWeight="900" fill="#78350f">₱</text>
      <ellipse cx="30" cy="28" rx="10" ry="6" fill="white" opacity="0.25" transform="rotate(-35,30,28)"/>
    </svg>
  ),
  TG106: (
    <svg width="16" height="16" viewBox="0 0 88 88">
      <defs><radialGradient id="bs2" cx="35%" cy="30%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.4"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs>
      <circle cx="44" cy="44" r="42" fill="#1a1a2e" stroke="#3b3b6e" strokeWidth="2"/>
      <circle cx="44" cy="44" r="42" fill="url(#bs2)"/>
      <circle cx="44" cy="44" r="18" fill="white"/>
      <text x="44" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#111">8</text>
    </svg>
  ),
  TG108: (
    <svg width="16" height="16" viewBox="0 0 88 76">
      <ellipse cx="44" cy="38" rx="42" ry="36" fill="#f9a8c9" stroke="#e879a0" strokeWidth="1"/>
      <ellipse cx="44" cy="46" rx="25" ry="19" fill="#f472b6" stroke="#db2777" strokeWidth="0.5"/>
      <ellipse cx="35" cy="48" rx="7" ry="8" fill="#c2185b"/>
      <ellipse cx="53" cy="48" rx="7" ry="8" fill="#c2185b"/>
      <circle cx="28" cy="24" r="5" fill="#1a1a1a"/>
      <circle cx="60" cy="24" r="5" fill="#1a1a1a"/>
    </svg>
  ),
  TG111: (
    <svg width="16" height="16" viewBox="0 0 88 96">
      <circle cx="30" cy="18" r="9" fill="#ef4444"/><circle cx="18" cy="12" r="10" fill="#ef4444"/><circle cx="6" cy="18" r="9" fill="#ef4444"/>
      <ellipse cx="30" cy="52" rx="30" ry="32" fill="white" stroke="#f3f4f6" strokeWidth="1.5"/>
      <path d="M4,44 L-16,48 L4,54 Z" fill="#f59e0b"/>
      <ellipse cx="2" cy="66" rx="8" ry="10" fill="#ef4444"/>
      <circle cx="42" cy="44" r="11" fill="#1a1a1a"/><circle cx="39" cy="41" r="4" fill="white"/>
    </svg>
  ),
  TG113: (
    <svg width="16" height="16" viewBox="0 0 88 96">
      <rect x="4" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="22" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
      <rect x="40" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/><rect x="58" y="14" width="12" height="16" rx="2" fill="#7c6fcd"/>
      <rect x="2" y="28" width="76" height="60" rx="4" fill="#9b8fe0"/>
      <path d="M30,88 L30,60 Q30,48 44,48 Q58,48 58,60 L58,88 Z" fill="#3730a3"/>
      <rect x="8" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/><rect x="54" y="38" width="18" height="18" rx="3" fill="#c4b5fd"/>
      <line x1="44" x2="44" y1="28" y2="6" stroke="#e11d48" strokeWidth="2"/>
      <path d="M44,6 L60,14 L44,22 Z" fill="#e11d48"/>
    </svg>
  ),
  TG125: (
    <svg width="16" height="16" viewBox="0 0 88 100">
      <path d="M16,58 Q10,88 20,96 L44,80 L68,96 Q78,88 72,58 Z" fill="#4a1d6e"/>
      <circle cx="44" cy="44" r="32" fill="#fde8d0"/>
      <path d="M16,52 Q24,16 44,14 Q64,16 72,52 Q64,40 44,38 Q24,40 16,52Z" fill="#3d2c6e"/>
      <circle cx="34" cy="44" r="6" fill="#ff3366"/><circle cx="54" cy="44" r="6" fill="#ff3366"/>
      <rect x="30" y="58" width="6" height="10" rx="3" fill="white"/><rect x="46" y="58" width="6" height="10" rx="3" fill="white"/>
    </svg>
  ),
  TG107: (
    <svg width="16" height="16" viewBox="0 0 88 100">
      <path d="M16,58 Q12,90 22,96 L44,80 L66,96 Q76,90 72,58 Z" fill="#4c1d95"/>
      <circle cx="44" cy="44" r="32" fill="#3730a3"/>
      <path d="M18,48 Q20,34 44,34 Q68,34 70,48 Q68,58 44,58 Q20,58 18,48Z" fill="#d4956a"/>
      <circle cx="32" cy="46" r="5" fill="#1a1a1a"/><circle cx="56" cy="46" r="5" fill="#1a1a1a"/>
      <rect x="38" y="14" width="12" height="8" rx="3" fill="#a855f7"/>
      <path d="M38,22 L28,34 M50,22 L60,34" stroke="#a855f7" strokeWidth="3"/>
    </svg>
  ),
};

const ProjectIcon: React.FC<{ id: string }> = ({ id }) => {
  if (PROJECT_SVG_ICON[id]) return <span className="flex-shrink-0 flex items-center">{PROJECT_SVG_ICON[id]}</span>;
  if (PROJECT_ICON[id]) return <span className="text-sm leading-none">{PROJECT_ICON[id]}</span>;
  return null;
};

export

export const PayoutCalc: React.FC = () => {
  const studios = Object.keys(studioProjects);
  const [activeStudio, setActiveStudio] = useState(studios[0]);
  const [activeProject, setActiveProject] = useState(studioProjects[studios[0]][0]);

  const handleStudio = (s: string) => {
    setActiveStudio(s);
    setActiveProject(studioProjects[s][0]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-white tracking-tight">賠付計算</h1>
      <div className="inline-flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50">
        {studios.map(s => (
          <button key={s} onClick={() => handleStudio(s)}
            className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeStudio === s ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'
            }`}>{s}</button>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {studioProjects[activeStudio].map(p => (
            <button key={p} onClick={() => setActiveProject(p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeProject === p
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40'
                  : 'text-slate-500 bg-slate-900/40 hover:bg-slate-800/40 hover:text-slate-300 border border-slate-800'
              }`}>
              <ProjectIcon id={p} />
              {p}
            </button>
          ))}
        </div>
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
          {activeProject === 'TG112' ? <TG112Calc /> : <PlaceholderCalc project={activeProject} />}
        </div>
      </div>
    </div>
  );
};
