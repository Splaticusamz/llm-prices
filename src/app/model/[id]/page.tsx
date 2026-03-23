import { getAllModels, getModelById, formatPrice, formatContextWindow, AFFILIATE_LINKS } from '@/lib/pricing';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllModels().map(m => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const model = getModelById(id);
  if (!model) return {};
  return {
    title: `${model.name} API Pricing 2026 — Cost per Token | LLM Prices`,
    description: `${model.name} by ${model.provider}: $${model.inputPricePer1M}/1M input, $${model.outputPricePer1M}/1M output. ${formatContextWindow(model.contextWindow)} context window. Compare with other LLMs.`,
  };
}

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = getModelById(id);
  if (!model) notFound();

  const allModels = getAllModels();
  const similar = allModels
    .filter(m => m.id !== model.id && m.category === model.category)
    .sort((a, b) => (a.inputPricePer1M + a.outputPricePer1M) - (b.inputPricePer1M + b.outputPricePer1M))
    .slice(0, 4);

  const CATEGORY_COLORS: Record<string, string> = {
    budget: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    mid: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    flagship: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-4">
        <a href="/compare" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Back to comparison</a>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm text-zinc-500 mb-1">{model.provider}</div>
            <h1 className="text-3xl font-bold">{model.name}</h1>
            <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full border capitalize ${CATEGORY_COLORS[model.category]}`}>
              {model.category}
            </span>
          </div>
          <a href={model.providerUrl} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors">
            View on {model.provider} →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Input Price', value: `${formatPrice(model.inputPricePer1M)}/1M` },
            { label: 'Output Price', value: `${formatPrice(model.outputPricePer1M)}/1M` },
            { label: 'Context Window', value: formatContextWindow(model.contextWindow) },
            { label: 'Category', value: model.category },
          ].map(s => (
            <div key={s.label} className="bg-zinc-800/50 rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-1">{s.label}</div>
              <div className="text-xl font-bold text-emerald-400 capitalize">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Monthly cost examples */}
        <div className="mt-8">
          <h3 className="text-sm text-zinc-400 mb-3 uppercase tracking-wide">Monthly Cost Examples</h3>
          <div className="space-y-2">
            {[
              { name: 'Light (1M in / 500K out)', input: 1_000_000, output: 500_000 },
              { name: 'Medium (10M in / 5M out)', input: 10_000_000, output: 5_000_000 },
              { name: 'Heavy (100M in / 50M out)', input: 100_000_000, output: 50_000_000 },
            ].map(u => {
              const cost = (u.input / 1_000_000) * model.inputPricePer1M + (u.output / 1_000_000) * model.outputPricePer1M;
              return (
                <div key={u.name} className="flex justify-between items-center py-2 px-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-sm text-zinc-400">{u.name}</span>
                  <span className="font-mono font-bold">{formatPrice(cost)}/mo</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compare With */}
      {similar.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Compare With Similar Models</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {similar.map(m => (
              <a key={m.id} href={`/model/${m.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-zinc-500">{m.provider}</div>
                <div className="text-sm font-mono text-emerald-400 mt-2">
                  {formatPrice(m.inputPricePer1M)} / {formatPrice(m.outputPricePer1M)} per 1M
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <a href="/calculator" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors inline-block">
          Calculate Your Full Cost →
        </a>
      </div>
    </div>
  );
}
