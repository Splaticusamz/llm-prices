import { getAllModels, getCheapestModels, formatPrice, formatContextWindow, AFFILIATE_LINKS } from '@/lib/pricing';

export default function Home() {
  const models = getAllModels();
  const cheapest = getCheapestModels(5);
  const providers = new Set(models.map(m => m.provider));

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10" />
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-16 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Stop overpaying for{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                AI APIs
              </span>
            </h1>
            <p className="mt-6 text-xl text-zinc-400 leading-relaxed">
              Compare pricing across {providers.size} providers and {models.length} models.
              Find the cheapest LLM for your use case in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/calculator" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors">
                Calculate Your Cost →
              </a>
              <a href="/compare" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                View All Models
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Providers', value: providers.size.toString() },
            { label: 'Models', value: models.length.toString() },
            { label: 'Cheapest Input', value: `${formatPrice(Math.min(...models.map(m => m.inputPricePer1M)))}/1M` },
            { label: 'Updated', value: 'Weekly' },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cheapest Models */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">🏆 Top 5 Cheapest Models</h2>
        <div className="grid gap-3">
          {cheapest.map((m, i) => (
            <a key={m.id} href={`/model/${m.id}`}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-zinc-600 w-8">#{i + 1}</span>
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-zinc-500">{m.provider} · {formatContextWindow(m.contextWindow)} context</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-mono font-bold">{formatPrice(m.inputPricePer1M)} / {formatPrice(m.outputPricePer1M)}</div>
                <div className="text-xs text-zinc-500">input / output per 1M tokens</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📊', title: 'Compare Prices', desc: 'See all LLM API prices side-by-side, sortable and filterable.' },
            { icon: '🧮', title: 'Calculate Costs', desc: 'Enter your expected token usage and see monthly costs across every model.' },
            { icon: '💰', title: 'Save Money', desc: 'Switch to cheaper models or providers — same quality, lower bills.' },
          ].map(s => (
            <div key={s.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud Credits CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 border border-zinc-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">🎁 Free Cloud Credits</h2>
          <p className="text-zinc-400 mb-6">Get started with free credits from major cloud providers</p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.values(AFFILIATE_LINKS).slice(0, 3).map(a => (
              <a key={a.label} href={a.url} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm">
                {a.label} — <span className="text-emerald-400">{a.credit} free</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
