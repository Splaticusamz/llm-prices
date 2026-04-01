'use client';

import { useState, useMemo } from 'react';
import { getAllModels, formatPrice, formatContextWindow, AFFILIATE_LINKS, type Model } from '@/lib/pricing';

type SortKey = 'name' | 'provider' | 'inputPricePer1M' | 'outputPricePer1M' | 'contextWindow' | 'category';
type SortDir = 'asc' | 'desc';

const CATEGORY_COLORS: Record<string, string> = {
  budget: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  mid: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  flagship: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export default function ComparePage() {
  const allModels = getAllModels();
  const providers = [...new Set(allModels.map(m => m.provider))];
  const categories: Model['category'][] = ['budget', 'mid', 'flagship'];

  const [sortKey, setSortKey] = useState<SortKey>('inputPricePer1M');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedProviders, setSelectedProviders] = useState<Set<string>>(new Set(providers));
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(categories));

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const toggleProvider = (p: string) => {
    setSelectedProviders(prev => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  };

  const toggleCategory = (c: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let models = allModels.filter(m => selectedProviders.has(m.provider) && selectedCategories.has(m.category));
    models.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return models;
  }, [allModels, selectedProviders, selectedCategories, sortKey, sortDir]);

  const minInput = Math.min(...allModels.map(m => m.inputPricePer1M));
  const minOutput = Math.min(...allModels.map(m => m.outputPricePer1M));

  const SortHeader = ({ k, label }: { k: SortKey; label: string }) => (
    <th className="px-4 py-3 text-left cursor-pointer hover:text-white transition-colors select-none"
      onClick={() => toggleSort(k)}>
      {label} {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : ''}
    </th>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Compare LLM API Prices</h1>
      <p className="text-zinc-400 mb-8">All prices per 1 million tokens. Click headers to sort. Updated weekly.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wide">Providers</div>
          <div className="flex flex-wrap gap-2">
            {providers.map(p => (
              <button key={p} onClick={() => toggleProvider(p)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  selectedProviders.has(p) ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wide">Category</div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => toggleCategory(c)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors capitalize ${
                  selectedCategories.has(c) ? CATEGORY_COLORS[c] : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400 text-xs uppercase tracking-wide">
            <tr>
              <SortHeader k="provider" label="Provider" />
              <SortHeader k="name" label="Model" />
              <SortHeader k="inputPricePer1M" label="Input $/1M" />
              <SortHeader k="outputPricePer1M" label="Output $/1M" />
              <SortHeader k="contextWindow" label="Context" />
              <SortHeader k="category" label="Category" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-zinc-900/50 transition-colors">
                <td className="px-4 py-3 text-zinc-400">
                  {m.provider}
                  {AFFILIATE_LINKS[m.providerId] && (
                    <a href={AFFILIATE_LINKS[m.providerId].url} target="_blank" rel="noopener noreferrer"
                      className="ml-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                      Get Key
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">
                  <a href={`/model/${m.id}`} className="hover:text-emerald-400 transition-colors">{m.name}</a>
                </td>
                <td className={`px-4 py-3 font-mono ${m.inputPricePer1M === minInput ? 'text-emerald-400 font-bold' : ''}`}>
                  {formatPrice(m.inputPricePer1M)}
                </td>
                <td className={`px-4 py-3 font-mono ${m.outputPricePer1M === minOutput ? 'text-emerald-400 font-bold' : ''}`}>
                  {formatPrice(m.outputPricePer1M)}
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatContextWindow(m.contextWindow)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${CATEGORY_COLORS[m.category]}`}>
                    {m.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-600 mt-4">Showing {filtered.length} of {allModels.length} models. Green = cheapest in column.</p>
    </div>
  );
}
