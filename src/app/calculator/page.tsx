'use client';

import { useState } from 'react';
import { calculateAllCosts, formatPrice, formatTokens, PRESETS, AFFILIATE_LINKS, type CostResult } from '@/lib/pricing';

export default function CalculatorPage() {
  const [inputTokens, setInputTokens] = useState(10_000_000);
  const [outputTokens, setOutputTokens] = useState(5_000_000);

  const results = calculateAllCosts(inputTokens, outputTokens);
  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = mostExpensive ? mostExpensive.totalCost - cheapest.totalCost : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">LLM Cost Calculator</h1>
      <p className="text-zinc-400 mb-8">Enter your monthly token usage to see costs across all providers.</p>

      {/* Presets */}
      <div className="flex flex-wrap gap-3 mb-6">
        {PRESETS.map(p => (
          <button key={p.name}
            onClick={() => { setInputTokens(p.input); setOutputTokens(p.output); }}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
              inputTokens === p.input && outputTokens === p.output
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300'
            }`}>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-zinc-500">{p.desc}</div>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <label className="text-sm text-zinc-400 block mb-2">Monthly Input Tokens</label>
          <input type="number" value={inputTokens} onChange={e => setInputTokens(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-lg font-mono focus:outline-none focus:border-emerald-500" />
          <div className="text-xs text-zinc-500 mt-1">{formatTokens(inputTokens)} tokens/month</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <label className="text-sm text-zinc-400 block mb-2">Monthly Output Tokens</label>
          <input type="number" value={outputTokens} onChange={e => setOutputTokens(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-lg font-mono focus:outline-none focus:border-emerald-500" />
          <div className="text-xs text-zinc-500 mt-1">{formatTokens(outputTokens)} tokens/month</div>
        </div>
      </div>

      {/* Savings Banner */}
      {savings > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4 mb-8 text-center">
          <div className="text-sm text-zinc-400">Potential monthly savings</div>
          <div className="text-3xl font-bold text-emerald-400">{formatPrice(savings)}/mo</div>
          <div className="text-sm text-zinc-500">
            by using <span className="text-white">{cheapest.model.name}</span> instead of {mostExpensive.model.name}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Model</th>
              <th className="px-4 py-3 text-left">Provider</th>
              <th className="px-4 py-3 text-right">Input Cost</th>
              <th className="px-4 py-3 text-right">Output Cost</th>
              <th className="px-4 py-3 text-right">Total/Month</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {results.map((r: CostResult, i: number) => (
              <tr key={r.model.id} className={`hover:bg-zinc-900/50 transition-colors ${i === 0 ? 'bg-emerald-500/5' : ''}`}>
                <td className="px-4 py-3 text-zinc-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium">
                  <a href={`/model/${r.model.id}`} className="hover:text-emerald-400 transition-colors">
                    {r.model.name}
                  </a>
                  {i === 0 && <span className="ml-2 text-xs text-emerald-400">💰 Cheapest</span>}
                </td>
                <td className="px-4 py-3 text-zinc-400">{r.model.provider}</td>
                <td className="px-4 py-3 text-right font-mono">{formatPrice(r.inputCost)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatPrice(r.outputCost)}</td>
                <td className={`px-4 py-3 text-right font-mono font-bold ${i === 0 ? 'text-emerald-400' : ''}`}>
                  {formatPrice(r.totalCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affiliate CTA */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">🎁 Get Free Cloud Credits</h3>
        <p className="text-sm text-zinc-400 mb-4">Start using AI APIs with free credits from major providers</p>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.values(AFFILIATE_LINKS).map(a => (
            <a key={a.label} href={a.url} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
              {a.label} — <span className="text-emerald-400">{a.credit} free</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
