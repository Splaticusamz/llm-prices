import { getProviders, formatPrice, formatContextWindow, AFFILIATE_LINKS } from '@/lib/pricing';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getProviders().map(p => ({ id: p.id }));
}

function findProvider(id: string) {
  return getProviders().find(p => p.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const provider = findProvider(id);
  if (!provider) return {};
  return {
    title: `${provider.name} API Pricing 2026 — All Models & Costs | LLM Prices`,
    description: `All ${provider.name} LLM API prices: ${provider.models.map(m => m.name).join(', ')}. Compare costs, context windows, and find the best model for your budget.`,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  budget: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  mid: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  flagship: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export default async function ProviderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = findProvider(id);
  if (!provider) notFound();

  const sorted = [...provider.models].sort((a, b) => a.inputPricePer1M - b.inputPricePer1M);
  const cheapest = sorted[0];
  const priciest = sorted[sorted.length - 1];
  const affiliate = AFFILIATE_LINKS[id as keyof typeof AFFILIATE_LINKS];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-4">
        <a href="/compare" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Back to comparison</a>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{provider.name}</h1>
          <p className="text-zinc-400 mt-1">{provider.models.length} models · Input range: {formatPrice(cheapest.inputPricePer1M)} – {formatPrice(priciest.inputPricePer1M)} / 1M tokens</p>
        </div>
        <a href={provider.url} target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
          Official Pricing →
        </a>
      </div>

      {affiliate && (
        <a href={affiliate.url} target="_blank" rel="noopener noreferrer"
          className="mb-8 flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-lg transition-colors shadow-lg shadow-emerald-500/20">
          Get {provider.name} API Key →{affiliate.credit ? ` — ${affiliate.credit} free credit` : ''}
        </a>
      )}

      <div className="space-y-3">
        {sorted.map(m => (
          <a key={m.id} href={`/model/${m.id}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-bold text-lg">{m.name}</span>
                <span className={`ml-3 text-xs px-2 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[m.category]}`}>{m.category}</span>
              </div>
              <div className="text-right">
                <div className="font-mono text-emerald-400">{formatPrice(m.inputPricePer1M)} <span className="text-zinc-500">in</span> / {formatPrice(m.outputPricePer1M)} <span className="text-zinc-500">out</span></div>
                <div className="text-xs text-zinc-500">per 1M tokens · {formatContextWindow(m.contextWindow)} context</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Internal comparison */}
      {provider.models.length > 1 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Quick Comparison</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="grid text-xs text-zinc-500 uppercase tracking-wide border-b border-zinc-800 bg-zinc-800/30"
              style={{ gridTemplateColumns: `2fr repeat(${3}, 1fr)` }}>
              <div className="p-3">Model</div>
              <div className="p-3 text-center">Input/1M</div>
              <div className="p-3 text-center">Output/1M</div>
              <div className="p-3 text-center">Context</div>
            </div>
            {sorted.map(m => (
              <div key={m.id} className="grid border-b border-zinc-800/50 last:border-0"
                style={{ gridTemplateColumns: `2fr repeat(${3}, 1fr)` }}>
                <div className="p-3 text-sm font-medium">{m.name}</div>
                <div className="p-3 text-center font-mono text-sm text-emerald-400">{formatPrice(m.inputPricePer1M)}</div>
                <div className="p-3 text-center font-mono text-sm text-emerald-400">{formatPrice(m.outputPricePer1M)}</div>
                <div className="p-3 text-center text-sm text-zinc-400">{formatContextWindow(m.contextWindow)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
