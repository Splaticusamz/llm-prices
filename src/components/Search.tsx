'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  id: string;
  name: string;
  provider: string;
  providerId: string;
  type: 'model' | 'provider';
  href: string;
}

// Inline the data to avoid importing server-only module
import providersData from '@/data/providers.json';

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items = useMemo<SearchItem[]>(() => {
    const result: SearchItem[] = [];
    const seenProviders = new Set<string>();
    for (const p of providersData.providers) {
      if (!seenProviders.has(p.id)) {
        seenProviders.add(p.id);
        result.push({ id: p.id, name: p.name, provider: p.name, providerId: p.id, type: 'provider', href: `/provider/${p.id}` });
      }
      for (const m of p.models) {
        result.push({ id: m.id, name: m.name, provider: p.name, providerId: p.id, type: 'model', href: `/model/${m.id}` });
      }
    }
    return result;
  }, []);

  const filtered = useMemo(() => {
    if (!query) return items.slice(0, 10);
    const q = query.toLowerCase();
    return items.filter(i => i.name.toLowerCase().includes(q) || i.provider.toLowerCase().includes(q)).slice(0, 10);
  }, [query, items]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-400 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-xs bg-zinc-700 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-4 border-b border-zinc-800">
          <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search models and providers..."
            className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder-zinc-500"
            onKeyDown={e => { if (e.key === 'Enter' && filtered.length > 0) go(filtered[0].href); }}
          />
          <kbd className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && <div className="px-4 py-8 text-center text-sm text-zinc-500">No results found</div>}
          {filtered.map(item => (
            <button key={`${item.type}-${item.id}`} onClick={() => go(item.href)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 text-left transition-colors">
              <span className={`text-xs px-1.5 py-0.5 rounded ${item.type === 'provider' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {item.type === 'provider' ? 'Provider' : 'Model'}
              </span>
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                {item.type === 'model' && <div className="text-xs text-zinc-500">{item.provider}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
