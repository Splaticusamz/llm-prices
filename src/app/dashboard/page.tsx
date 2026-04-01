'use client';

import { useState, useEffect } from 'react';

const STATUS = {
  phase: 'Live — Growth Phase',
  overall: 100,
  launched: true,
  liveUrl: 'https://llm-prices.vercel.app',
  repoUrl: 'https://github.com/Splaticusamz/llm-prices',
  startDate: '2026-03-23',
  launchDate: '2026-03-23',
};

const TASKS = [
  { name: 'Project Scaffold (Next.js + Tailwind)', status: 'done', date: 'Mar 23' },
  { name: 'Pricing Data JSON (10 providers, 25 models)', status: 'done', date: 'Mar 23' },
  { name: 'GitHub Repo + Vercel Config', status: 'done', date: 'Mar 23' },
  { name: 'Discord Channel (#💰llm-prices)', status: 'done', date: 'Mar 23' },
  { name: 'Documentation (README, CHANGELOG)', status: 'done', date: 'Mar 23' },
  { name: 'Comparison Table (sort/filter)', status: 'done', date: 'Mar 23' },
  { name: 'Cost Calculator (4 presets)', status: 'done', date: 'Mar 23' },
  { name: 'Landing Page + SEO Meta', status: 'done', date: 'Mar 23' },
  { name: 'Affiliate Links Integration', status: 'done', date: 'Mar 23' },
  { name: 'Individual Model Pages (25 pages)', status: 'done', date: 'Mar 23' },
  { name: 'Blog Posts (3 SEO articles)', status: 'done', date: 'Mar 23' },
  { name: 'Sitemap + robots.txt', status: 'done', date: 'Mar 23' },
  { name: 'Pricing Scraper (GitHub Action weekly)', status: 'done', date: 'Mar 23' },
  { name: 'Analytics Placeholder', status: 'done', date: 'Mar 23' },
  { name: 'Deploy to Vercel (Production)', status: 'done', date: 'Mar 23' },
  { name: 'Expand to 10 providers / 25 models', status: 'done', date: 'Mar 23' },
  { name: '38 Static Pages Generated', status: 'done', date: 'Mar 23' },
  { name: 'Google Search Console Submit', status: 'pending', date: '' },
  { name: 'Analytics Integration (Plausible/GA)', status: 'pending', date: '' },
  { name: 'Backlink Outreach Campaign', status: 'pending', date: '' },
  { name: 'AdSense Application', status: 'pending', date: '' },
];

const REVENUE_TIMELINE = [
  { month: 'Mar 2026', min: 0, max: 0, label: '🚀 Launch & Index', active: true },
  { month: 'Apr 2026', min: 0, max: 10, label: 'SEO Ramp-up', active: true },
  { month: 'May 2026', min: 10, max: 50, label: 'Early Organic Traffic', active: false },
  { month: 'Jun 2026', min: 50, max: 150, label: 'Affiliate Revenue Starts', active: false },
  { month: 'Sep 2026', min: 150, max: 300, label: 'Steady Growth', active: false },
  { month: 'Dec 2026', min: 200, max: 500, label: '🎯 Target Cruise', active: false },
];

const STATS = {
  providers: 10,
  models: 25,
  staticPages: 38,
  blogPosts: 3,
  affiliateLinks: '10+',
  contextWindowMax: '1M tokens',
};

const PROVIDERS = [
  'OpenAI', 'Anthropic', 'Google', 'Mistral', 'Meta/Together',
  'xAI', 'Cohere', 'Amazon', 'DeepSeek', 'AI21',
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pending: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  };
  const icons: Record<string, string> = { done: '✓', 'in-progress': '⟳', pending: '○' };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

function ProgressBar({ value, gradient = false }: { value: number; gradient?: boolean }) {
  return (
    <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${value}%`,
          background: gradient
            ? 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)'
            : '#10b981',
        }}
      />
    </div>
  );
}

function MermaidDiagram() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 font-mono text-xs sm:text-sm">
      <h3 className="text-indigo-400 font-bold mb-4 font-sans text-lg">🔄 How the Hustle Works</h3>
      <pre className="text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">{`
┌─────────────────────────────────────────────────────────────┐
│                     TRAFFIC FUNNEL                          │
│                                                             │
│   🔍 Google Search                                          │
│   "cheapest LLM API"  ──┐                                   │
│   "Claude vs GPT cost"  ├──→  Landing Page (SEO-optimized)  │
│   "LLM pricing 2026"   ──┘         │                        │
│                                     ▼                        │
│                        ┌────────────────────────┐            │
│                        │  Compare 25 Models     │            │
│                        │  Sort · Filter · Search│            │
│                        └──────────┬─────────────┘            │
│                                   ▼                          │
│                        ┌────────────────────────┐            │
│                        │  Cost Calculator        │            │
│                        │  "How much will I pay?" │            │
│                        └──────────┬─────────────┘            │
│                                   ▼                          │
│                        ┌────────────────────────┐            │
│                 💰 ──▶ │  Affiliate CTA Links   │ ◀── 💰     │
│                        │  AWS · GCP · Azure     │            │
│                        │  Cloud Credit Signups  │            │
│                        └────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘`}</pre>
    </div>
  );
}

function AutomationFlow() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 font-mono text-xs sm:text-sm">
      <h3 className="text-cyan-400 font-bold mb-4 font-sans text-lg">⚙️ Automation Pipeline</h3>
      <pre className="text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">{`
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │  GitHub      │    │  Commit      │    │  Vercel      │
  │  Action      │───▶│  Updated     │───▶│  Auto-Deploy │
  │  (Weekly)    │    │  prices.json │    │  (< 60s)     │
  └──────┬───────┘    └──────────────┘    └──────┬───────┘
         │                                       │
         ▼                                       ▼
  ┌──────────────┐                        ┌──────────────┐
  │  Scrape 10   │                        │  CDN Edge    │
  │  Provider    │                        │  Global      │
  │  API Pages   │                        │  < 100ms     │
  └──────────────┘                        └──────────────┘

  ┌─────────────────────────────────────────────────────┐
  │  📈 SEO LOOP (passive income engine)                │
  │                                                     │
  │  Fresh Data → Better Rankings → More Traffic        │
  │       ▲              │              │               │
  │       │              ▼              ▼               │
  │  Weekly Update  Google Index   Affiliate Clicks     │
  │       ▲                             │               │
  │       └────── Zero Manual Work ◀────┘               │
  └─────────────────────────────────────────────────────┘`}</pre>
    </div>
  );
}

function DaysSince(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const doneCount = TASKS.filter(t => t.status === 'done').length;
  const pendingCount = TASKS.filter(t => t.status === 'pending').length;
  const daysSinceLaunch = DaysSince(STATUS.launchDate);

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-emerald-400">💰</span> LLM Prices — Hustle Dashboard
            </h1>
            <p className="text-zinc-500 mt-1">
              Private project tracker • Updated: {now.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{STATUS.phase}</span>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-800/50 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-emerald-400">LIVE ✅</div>
            <div className="text-xs text-zinc-400 mt-1">Production Status</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/40 to-zinc-900 border border-indigo-800/50 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-indigo-400">{daysSinceLaunch}</div>
            <div className="text-xs text-zinc-400 mt-1">Days Since Launch</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-zinc-900 border border-purple-800/50 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-purple-400">38</div>
            <div className="text-xs text-zinc-400 mt-1">Static Pages</div>
          </div>
          <div className="bg-gradient-to-br from-amber-900/40 to-zinc-900 border border-amber-800/50 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-amber-400">$0</div>
            <div className="text-xs text-zinc-400 mt-1">Revenue (SEO ramp)</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">MVP Completion</h2>
            <span className="text-2xl font-bold text-emerald-400">100%</span>
          </div>
          <ProgressBar value={100} gradient />
          <div className="flex gap-6 mt-4 text-sm text-zinc-400">
            <span>✅ {doneCount} done</span>
            <span>⏳ {pendingCount} growth tasks remaining</span>
          </div>
        </div>

        {/* Diagrams Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MermaidDiagram />
          <AutomationFlow />
        </div>

        {/* Provider Coverage */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🏢 Provider Coverage ({PROVIDERS.length} providers)</h2>
          <div className="flex flex-wrap gap-2">
            {PROVIDERS.map(p => (
              <span key={p} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-sm text-indigo-300">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">📊 Data Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(STATS).map(([key, val]) => (
              <div key={key} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">{val}</div>
                <div className="text-xs text-zinc-500 mt-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Timeline */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">💸 Revenue Timeline</h2>
          <div className="space-y-3">
            {REVENUE_TIMELINE.map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className={`w-20 text-sm shrink-0 ${r.active ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                  {r.month}
                </span>
                <div className="flex-1">
                  <div className="flex-1 bg-zinc-800 rounded-full h-7 overflow-hidden relative">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(4, (r.max / 500) * 100)}%`,
                        background: r.active
                          ? 'linear-gradient(90deg, #10b981, #34d399)'
                          : 'linear-gradient(90deg, #6366f1, #818cf8)',
                        opacity: r.max === 0 ? 0.3 : 1,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      ${r.min}–${r.max}/mo
                    </span>
                  </div>
                </div>
                <span className={`text-xs w-44 text-right shrink-0 ${r.active ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  {r.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-300">
            📈 Expected breakeven: Month 3-4 (affiliate revenue vs $0 hosting cost on Vercel free tier)
          </div>
        </div>

        {/* Dev Status Tracker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🛠 Development Tracker</h2>
          <div className="space-y-1">
            {TASKS.map((task, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={task.status === 'done' ? 'text-zinc-500' : 'text-zinc-200'}>{task.name}</span>
                  {task.date && <span className="text-xs text-zinc-600">{task.date}</span>}
                </div>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🏗 Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js 15', 'React 19', 'Tailwind CSS', 'TypeScript', 'Vercel (Free)', 'GitHub Actions', 'Static Generation'].map(t => (
              <span key={t} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-300">{t}</span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🔗 Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a href={STATUS.liveUrl} target="_blank" rel="noopener" className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-colors">
              <span className="text-xl">🌐</span>
              <div>
                <div className="text-sm font-semibold text-emerald-400">Live Site</div>
                <div className="text-xs text-zinc-500">llm-prices.vercel.app</div>
              </div>
            </a>
            <a href={STATUS.repoUrl} target="_blank" rel="noopener" className="flex items-center gap-2 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/20 transition-colors">
              <span className="text-xl">📦</span>
              <div>
                <div className="text-sm font-semibold text-indigo-400">GitHub Repo</div>
                <div className="text-xs text-zinc-500">Splaticusamz/llm-prices</div>
              </div>
            </a>
            <a href={`${STATUS.liveUrl}/calculator`} target="_blank" rel="noopener" className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors">
              <span className="text-xl">🧮</span>
              <div>
                <div className="text-sm font-semibold text-purple-400">Calculator</div>
                <div className="text-xs text-zinc-500">Cost estimator tool</div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600 py-4">
          🔒 Private Dashboard — LLM Prices Project — Launched {STATUS.launchDate} — Day {daysSinceLaunch}
        </div>
      </div>
    </div>
  );
}
