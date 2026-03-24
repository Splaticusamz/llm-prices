import { generateVSPairs, formatPrice, formatContextWindow } from '@/lib/pricing';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return generateVSPairs().map(p => ({ slug: p.slug }));
}

function findPair(slug: string) {
  return generateVSPairs().find(p => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pair = findPair(slug);
  if (!pair) return {};
  const { modelA, modelB } = pair;
  return {
    title: `${modelA.name} vs ${modelB.name} Pricing Comparison 2026 | LLM Prices`,
    description: `Compare ${modelA.name} ($${modelA.inputPricePer1M}/1M in) vs ${modelB.name} ($${modelB.inputPricePer1M}/1M in). Side-by-side pricing, context window, and cost analysis.`,
    openGraph: {
      title: `${modelA.name} vs ${modelB.name} — Which LLM API is Cheaper?`,
      description: `Head-to-head pricing comparison of ${modelA.name} and ${modelB.name}.`,
    },
  };
}

const USAGE_LEVELS = [
  { label: '100K tokens', input: 100_000, output: 50_000 },
  { label: '1M tokens', input: 1_000_000, output: 500_000 },
  { label: '10M tokens', input: 10_000_000, output: 5_000_000 },
  { label: '100M tokens', input: 100_000_000, output: 50_000_000 },
];

export default async function VSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = findPair(slug);
  if (!pair) notFound();
  const { modelA, modelB } = pair;

  const CATEGORY_COLORS: Record<string, string> = {
    budget: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    mid: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    flagship: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };

  const stats = [
    { label: 'Provider', a: modelA.provider, b: modelB.provider },
    { label: 'Input / 1M', a: formatPrice(modelA.inputPricePer1M), b: formatPrice(modelB.inputPricePer1M), lowerWins: true, aVal: modelA.inputPricePer1M, bVal: modelB.inputPricePer1M },
    { label: 'Output / 1M', a: formatPrice(modelA.outputPricePer1M), b: formatPrice(modelB.outputPricePer1M), lowerWins: true, aVal: modelA.outputPricePer1M, bVal: modelB.outputPricePer1M },
    { label: 'Context', a: formatContextWindow(modelA.contextWindow), b: formatContextWindow(modelB.contextWindow), lowerWins: false, aVal: modelA.contextWindow, bVal: modelB.contextWindow },
    { label: 'Category', a: modelA.category, b: modelB.category },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-4">
        <a href="/compare" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Back to comparison</a>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {modelA.name} <span className="text-zinc-500">vs</span> {modelB.name}
      </h1>
      <p className="text-zinc-400 mb-8">Head-to-head pricing comparison — updated March 2026</p>

      {/* Side-by-side comparison */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
        <div className="grid grid-cols-3 text-center">
          <div className="p-4 border-b border-zinc-800 bg-zinc-800/30">
            <a href={`/model/${modelA.id}`} className="font-bold text-lg hover:text-emerald-400 transition-colors">{modelA.name}</a>
            <div className="text-xs text-zinc-500">{modelA.provider}</div>
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[modelA.category]}`}>{modelA.category}</span>
          </div>
          <div className="p-4 border-b border-zinc-800 flex items-center justify-center">
            <span className="text-2xl font-bold text-zinc-600">VS</span>
          </div>
          <div className="p-4 border-b border-zinc-800 bg-zinc-800/30">
            <a href={`/model/${modelB.id}`} className="font-bold text-lg hover:text-emerald-400 transition-colors">{modelB.name}</a>
            <div className="text-xs text-zinc-500">{modelB.provider}</div>
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[modelB.category]}`}>{modelB.category}</span>
          </div>
        </div>
        {stats.map(s => {
          const aWin = s.lowerWins !== undefined && s.aVal !== undefined && s.bVal !== undefined
            ? (s.lowerWins ? s.aVal < s.bVal : s.aVal > s.bVal)
            : false;
          const bWin = s.lowerWins !== undefined && s.aVal !== undefined && s.bVal !== undefined
            ? (s.lowerWins ? s.bVal < s.aVal : s.bVal > s.aVal)
            : false;
          return (
            <div key={s.label} className="grid grid-cols-3 text-center border-b border-zinc-800/50 last:border-0">
              <div className={`p-3 font-mono ${aWin ? 'text-emerald-400' : 'text-zinc-300'}`}>{s.a}</div>
              <div className="p-3 text-xs text-zinc-500 flex items-center justify-center">{s.label}</div>
              <div className={`p-3 font-mono ${bWin ? 'text-emerald-400' : 'text-zinc-300'}`}>{s.b}</div>
            </div>
          );
        })}
      </div>

      {/* Cost comparison table */}
      <h2 className="text-xl font-bold mb-4">Cost at Different Usage Levels</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
        <div className="grid grid-cols-4 text-xs text-zinc-500 uppercase tracking-wide border-b border-zinc-800 bg-zinc-800/30">
          <div className="p-3">Usage</div>
          <div className="p-3 text-center">{modelA.name}</div>
          <div className="p-3 text-center">{modelB.name}</div>
          <div className="p-3 text-center">Savings</div>
        </div>
        {USAGE_LEVELS.map(u => {
          const costA = (u.input / 1e6) * modelA.inputPricePer1M + (u.output / 1e6) * modelA.outputPricePer1M;
          const costB = (u.input / 1e6) * modelB.inputPricePer1M + (u.output / 1e6) * modelB.outputPricePer1M;
          const cheaper = costA < costB ? 'A' : costB < costA ? 'B' : 'tie';
          const savings = Math.abs(costA - costB);
          const pct = cheaper !== 'tie' ? Math.round((savings / Math.max(costA, costB)) * 100) : 0;
          return (
            <div key={u.label} className="grid grid-cols-4 border-b border-zinc-800/50 last:border-0">
              <div className="p-3 text-sm text-zinc-400">{u.label}</div>
              <div className={`p-3 text-center font-mono text-sm ${cheaper === 'A' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                {formatPrice(costA)}
              </div>
              <div className={`p-3 text-center font-mono text-sm ${cheaper === 'B' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                {formatPrice(costB)}
              </div>
              <div className="p-3 text-center text-sm">
                {cheaper !== 'tie' ? (
                  <span className="text-emerald-400">{cheaper === 'A' ? modelA.name : modelB.name} saves {pct}%</span>
                ) : (
                  <span className="text-zinc-500">Tie</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <a href={`/model/${modelA.id}`} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
          {modelA.name} Details →
        </a>
        <a href={`/model/${modelB.id}`} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
          {modelB.name} Details →
        </a>
        <a href="/calculator" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm transition-colors">
          Calculate Your Cost →
        </a>
      </div>
    </div>
  );
}
