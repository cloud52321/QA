"use client";

import React, { useState } from 'react';

// ─── 專案結構 ─────────────────────────────────────────────────────────────────

const studioProjects: Record<string, string[]> = {
  '穩贏 WinWin': ['TG001', 'TG002'],
  '王牌 Ace':    ['TG102', 'TG104', 'TG106', 'TG108', 'TG110', 'TG112', 'TG126'],
  '八方來財':    ['TG103', 'TG105', 'TG111', 'TG113', 'TG115', 'TG117', 'TG121', 'TG139'],
};

// ─── TG108 LOG 欄位說明（根據 RTP 保護與補分文件）─────────────────────────────

const FIELD_DEFS: Record<string, Record<string, { label: string; desc: string; format?: (v: unknown) => string }>> = {
  ShouldTriggerPreemptiveProtection: {
    triggered:                { label: '是否觸發保護',     desc: '本次是否觸發預防性保護', format: v => v === true || v === 'true' ? '✅ 觸發' : '❌ 未觸發' },
    reason:                   { label: '原因',              desc: '觸發/未觸發的原因', format: v => ({
      accumulated_loss_forced: '💥 強制觸發（虧損超限，不抽機率）',
      triggered:               '✅ 觸發（RTP超標且亂數命中）',
      probability_miss:        '❌ 未觸發（RTP超標但亂數未命中）',
      no_rule_matched:         '❌ 未觸發（RTP未達任何規則閾值）',
    }[v as string] ?? String(v)) },
    projectedRtp:             { label: '預估 RTP',          desc: 'totalWinAmount / totalBetAmount × 100（含本局模擬值）' },
    accumulatedLoss:          { label: '累積虧損',           desc: 'totalWinAmount − totalBetAmount（正值 = 莊家虧損）' },
    accumulatedLossThreshold: { label: '強制觸發虧損上限',   desc: '累積虧損超過此值強制觸發，不抽機率' },
    totalBetAmount:           { label: '期間總下注（含模擬）', desc: '含本局模擬值的期間總下注' },
    totalWinAmount:           { label: '期間總派彩（含模擬）', desc: '含本局模擬值的期間總派彩' },
    pastBetAmount:            { label: '本局前期間累積下注',  desc: '本局前的期間累積下注' },
    pastWinAmount:            { label: '本局前期間累積派彩',  desc: '本局前的期間累積派彩' },
    simBetAmount:             { label: '本局下注（模擬值）',  desc: '本局下注模擬值' },
    simWinAmount:             { label: '本局派彩（模擬值）',  desc: '本局派彩模擬值' },
    matchedThreshold:         { label: '命中閾值',            desc: '命中的 PreemptiveRtpThreshold' },
    triggerProbability:       { label: '觸發機率',            desc: 'PreemptiveActivationPercentage / 100' },
    randomValue:              { label: '實際亂數值',           desc: '0~1，精度 1/10000' },
    calculationPeriodHours:   { label: '計算期間（小時）',    desc: '回溯的小時數' },
  },
  ShouldTriggerProtection: {
    triggered:          { label: '是否觸發保護',     desc: '本次是否觸發全量累積保護', format: v => v === true || v === 'true' ? '✅ 觸發' : '❌ 未觸發' },
    reason:             { label: '原因',              desc: '觸發/未觸發的原因', format: v => ({
      below_baseline:   '❌ 未觸發（下注量未達 Baseline 門檻）',
      triggered:        '✅ 觸發（RTP超標且亂數命中）',
      probability_miss: '❌ 未觸發（RTP超標但亂數未命中）',
      no_rule_matched:  '❌ 未觸發（RTP未達任何規則閾值）',
    }[v as string] ?? String(v)) },
    currentRtp:         { label: '當前 RTP',          desc: 'totalWinAmount / totalBetAmount × 100' },
    baseline:           { label: 'Baseline 門檻',     desc: '最低下注門檻，未達此值不檢查 RTP' },
    totalBetAmount:     { label: '全量總下注（含模擬）', desc: '含本局模擬值的全量總下注' },
    totalWinAmount:     { label: '全量總派彩（含模擬）', desc: '含本局模擬值的全量總派彩' },
    pastBetAmount:      { label: '本局前全量累積下注',  desc: '本局前全量累積下注' },
    pastWinAmount:      { label: '本局前全量累積派彩',  desc: '本局前全量累積派彩' },
    simBetAmount:       { label: '本局下注（模擬值）',  desc: '本局下注模擬值' },
    simWinAmount:       { label: '本局派彩（模擬值）',  desc: '本局派彩模擬值' },
    matchedThreshold:   { label: '命中閾值',            desc: '命中的 RtpThreshold' },
    triggerProbability: { label: '觸發機率',            desc: 'ActivationPercentage / 100' },
    randomValue:        { label: '實際亂數值',           desc: '0~1' },
  },
  ShouldTriggerCompensation: {
    triggered:          { label: '是否觸發補分',      desc: '本次是否觸發補分機制', format: v => v === true || v === 'true' ? '✅ 觸發（強制不爆炸，進入下一關）' : '❌ 未觸發' },
    reason:             { label: '原因',              desc: '觸發/未觸發的原因', format: v => ({
      below_baseline:   '❌ 未觸發（下注量未達 Baseline 門檻）',
      triggered:        '✅ 觸發（RTP超標且亂數命中）',
      probability_miss: '❌ 未觸發（RTP超標但亂數未命中）',
      no_rule_matched:  '❌ 未觸發（RTP未達任何規則閾值）',
    }[v as string] ?? String(v)) },
    currentRtp:         { label: '當前 RTP',          desc: 'totalWinAmount / totalBetAmount × 100' },
    baseline:           { label: 'Baseline 門檻',     desc: '最低下注門檻，未達此值不檢查補分' },
    totalBetAmount:     { label: '全量總下注（含模擬）', desc: '含本局模擬值的全量總下注' },
    totalWinAmount:     { label: '全量總派彩（含模擬）', desc: '含本局模擬值的全量總派彩' },
    pastBetAmount:      { label: '本局前全量累積下注',  desc: '本局前全量累積下注' },
    pastWinAmount:      { label: '本局前全量累積派彩',  desc: '本局前全量累積派彩' },
    simBetAmount:       { label: '本局下注（模擬值）',  desc: '本局下注模擬值' },
    simWinAmount:       { label: '本局派彩（模擬值）',  desc: '本局派彩模擬值' },
    matchedThreshold:   { label: '命中閾值',            desc: '命中的 compensation_rules RtpThreshold' },
    triggerProbability: { label: '觸發機率',            desc: 'ActivationPercentage / 100' },
    randomValue:        { label: '實際亂數值',           desc: '0~1' },
  },
};

const MECHANISM_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  ShouldTriggerPreemptiveProtection: { label: '機制 A：預防性 RTP 保護（48 小時）', color: 'text-sky-300',    bg: 'bg-sky-500/10 border-sky-500/30' },
  ShouldTriggerProtection:           { label: '機制 B：全量累積 RTP 保護',           color: 'text-violet-300', bg: 'bg-violet-500/10 border-violet-500/30' },
  ShouldTriggerCompensation:         { label: '機制 C：補分機制',                    color: 'text-amber-300',  bg: 'bg-amber-500/10 border-amber-500/30' },
};

// ─── 解析 LOG ────────────────────────────────────────────────────────────────

interface ParsedLog {
  timestamp?: string;
  mechanism: string;
  roomID?: string;
  fields: Record<string, unknown>;
}

function parseLog(raw: string): ParsedLog | null {
  try {
    // 找 JSON 部分
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const fields = JSON.parse(jsonMatch[0]);

    // 找機制名稱
    let mechanism = '';
    for (const key of Object.keys(FIELD_DEFS)) {
      if (raw.includes(key)) { mechanism = key; break; }
    }
    if (!mechanism) return null;

    // 找時間戳
    const tsMatch = raw.match(/\d{4}-\d{2}-\d{2}T[\d:.Z]+/);
    const roomID = fields.roomID as string | undefined;

    return { timestamp: tsMatch?.[0], mechanism, roomID, fields };
  } catch {
    return null;
  }
}

// ─── TG108 Converter ─────────────────────────────────────────────────────────

const TG108Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ParsedLog | null>(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    if (!input.trim()) { setError('請貼入 LOG 內容'); return; }
    const parsed = parseLog(input);
    if (!parsed) {
      setError('無法解析，請確認 LOG 格式是否包含 [RTP_PROTECT] 前綴與 JSON 欄位');
      setResult(null);
      return;
    }
    setResult(parsed);
    setError('');
  };

  const mechInfo = result ? MECHANISM_LABELS[result.mechanism] : null;
  const fieldDefs = result ? FIELD_DEFS[result.mechanism] : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">TG108</span>
        <span className="text-sm font-bold text-slate-200">RTP 保護 LOG 轉換</span>
      </div>

      {/* 輸入區 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">貼入 LOG</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={'貼入完整 LOG 一行，例如：\n2026-05-13T11:25:04.021Z stdout F ... [RTP_PROTECT] ShouldTriggerCompensation {"roomID": "PC01", "triggered": true, ...}'}
          rows={5}
          className="w-full bg-slate-950/60 border border-slate-700 text-slate-300 text-xs font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600 resize-none"
        />
        {error && <p className="text-rose-400 text-xs">{error}</p>}
        <button
          onClick={handleConvert}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-900/30"
        >
          轉換
        </button>
      </div>

      {/* 結果區 */}
      {result && mechInfo && fieldDefs && (
        <div className="space-y-4">
          {/* 機制標題 */}
          <div className={`border rounded-xl px-4 py-3 flex items-center justify-between ${mechInfo.bg}`}>
            <span className={`text-sm font-extrabold ${mechInfo.color}`}>{mechInfo.label}</span>
            {result.roomID && (
              <span className="text-xs font-mono text-slate-400">Room: <span className="text-slate-200 font-bold">{result.roomID}</span></span>
            )}
          </div>

          {/* 欄位表格 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-400 w-40">欄位</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-400 w-48">中文說明</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-400">值</th>
                  <th className="px-4 py-2.5 text-left text-xs font-bold text-slate-400">說明</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.fields).filter(([k]) => k !== 'roomID').map(([key, val], i) => {
                  const def = fieldDefs[key];
                  const displayVal = def?.format ? def.format(val) : String(val);
                  const isTriggered = key === 'triggered';
                  return (
                    <tr key={key} className={`border-b border-slate-800/40 ${i % 2 === 0 ? '' : 'bg-slate-900/20'}`}>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{key}</td>
                      <td className="px-4 py-2.5 text-xs font-bold text-slate-300">{def?.label ?? '—'}</td>
                      <td className={`px-4 py-2.5 font-mono text-xs ${isTriggered ? (val === true || val === 'true' ? 'text-emerald-300' : 'text-rose-300') : 'text-cyan-300'}`}>
                        {displayVal}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">{def?.desc ?? ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 驗算區 */}
          {result.fields.pastBetAmount !== undefined && result.fields.simBetAmount !== undefined && (
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">QA 驗算</p>
              {(() => {
                const pastBet = Number(result.fields.pastBetAmount);
                const pastWin = Number(result.fields.pastWinAmount);
                const simBet  = Number(result.fields.simBetAmount);
                const simWin  = Number(result.fields.simWinAmount);
                const totalBet = pastBet + simBet;
                const totalWin = pastWin + simWin;
                const rtp = totalBet > 0 ? (totalWin / totalBet * 100).toFixed(4) : 'N/A';
                const logRtp = result.fields.currentRtp ?? result.fields.projectedRtp;
                const match = Math.abs(Number(rtp) - Number(logRtp)) < 0.01;
                return (
                  <div className="space-y-1 text-xs font-mono text-slate-400">
                    <p>totalBet = {pastBet} + {simBet} = <span className="text-slate-200">{totalBet}</span></p>
                    <p>totalWin = {pastWin} + {simWin} = <span className="text-slate-200">{totalWin}</span></p>
                    <p>RTP = {totalWin} / {totalBet} × 100 = <span className="text-cyan-300 font-bold">{rtp}</span></p>
                    <p className={match ? 'text-emerald-400' : 'text-rose-400'}>
                      {match ? '✅ 與 LOG 一致' : `⚠ LOG 記錄為 ${logRtp}，計算值為 ${rtp}`}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── PlaceholderConverter ────────────────────────────────────────────────────

const PlaceholderConverter: React.FC<{ project: string }> = ({ project }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">{project}</span>
    <p className="text-slate-500 text-sm">RTP 轉換功能開發中，敬請期待</p>
  </div>
);

// ─── RTPConverter ─────────────────────────────────────────────────────────────

export const RTPConverter: React.FC = () => {
  const studios = Object.keys(studioProjects);
  const [activeStudio, setActiveStudio] = useState('王牌 Ace');
  const [activeProject, setActiveProject] = useState('TG108');

  const handleStudio = (s: string) => {
    setActiveStudio(s);
    setActiveProject(studioProjects[s][0]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-white tracking-tight">RTP 轉換</h1>

      <div className="inline-flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800/50">
        {studios.map(s => (
          <button key={s} onClick={() => handleStudio(s)}
            className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeStudio === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {studioProjects[activeStudio].map(p => (
            <button key={p} onClick={() => setActiveProject(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeProject === p
                  ? 'bg-blue-500/20 text-blue-200 font-bold border border-blue-400/30'
                  : 'text-slate-500 bg-slate-900/40 hover:bg-slate-800/40 hover:text-slate-300 border border-slate-800'
              }`}>
              {p}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
          {activeProject === 'TG108' ? <TG108Converter /> : <PlaceholderConverter project={activeProject} />}
        </div>
      </div>
    </div>
  );
};
