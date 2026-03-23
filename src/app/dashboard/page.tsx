'use client';

import { useState, useEffect } from 'react';

const STATUS = {
  phase: 'Build Phase',
  overall: 65,
  launched: false,
  repoUrl: 'https://github.com/Splaticusamz/llm-prices',
  startDate: '2026-03-23',
};

const TASKS = [
  { name: 'Project Scaffold (Next.js + Tailwind)', status: 'done' },
  { name: 'Pricing Data JSON (5 providers, 13 models)', status: 'done' },
  { name: 'GitHub Repo + Vercel Config', status: 'done' },
  { name: 'Discord Channel (#💰llm-prices)', status: 'done' },
  { name: 'Documentation (README, CHANGELOG)', status: 'done' },
  { name: 'Comparison Table Component', status: 'in-progress' },
  { name: 'Cost Calculator Component', status: 'in-progress' },
  { name: 'Landing Page + SEO Meta', status: 'pending' },
  { name: 'Affiliate Links Integration', status: 'pending' },
  { name: 'Deploy to Vercel (Production)', status: 'pending' },
  { name: 'Pricing Scraper (GitHub Action)', status: 'pending' },
  { name: 'SEO Blog Pages', status: 'pending' },
];

const REVENUE_TIMELINE = [
  { month: 'Mar 2026', min: 0, max: 0, label: 'Launch & Index' },
  { month: 'Apr 2026', min: 0, max: 10, label: 'SEO Ramp' },
  { month: 'May 2026', min: 10, max: 50, label: 'Early Traffic' },
  { month: 'Jun 2026', min: 50, max: 150, label: 'Affiliate Revenue Starts' },
  { month: 'Sep 2026', min: 150, max: 300, label: 'Steady Growth' },
  { month: 'Dec 2026', min: 200, max: 500, label: 'Target Cruise' },
];

const STATS = {
  providers: 5,
  models: 13,
  categories: 3,
  contextWindowMax: '1M tokens',
  cheapestInput: '$0.10/1M (Nano/Mistral Small)',
  mostExpensiveOutput: '$75/1M (Claude Opus 4)',
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    pending: 'bg-zinc-500/20 text-zinc-500 border-zinc-500/30',
  };
  const icons: Record<string, string> = { done: '✓', 'in-progress': '⟳', pending: '○' };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

function ProgressBar({ value, color = 'emerald' }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full rounded-full bg-${color}-500 transition-all duration-1000`}
        style={{ width: `${value}%`, background: color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#6366f1' }}
      />
    </div>
  );
}

function MermaidDiagram() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 font-mono text-sm">
      <h3 className="text-indigo-400 font-bold mb-4 font-sans text-lg">🔄 How It Works</h3>
      <pre className="text-zinc-300 leading-relaxed overflow-x-auto">{`
┌─────────────────────────────────────────────────────────┐
│                    USER JOURNEY                         │
│                                                         │
│  Google Search ──→ Landing Page ──→ Compare Prices      │
│  "cheapest LLM"     (SEO)           (Table View)        │
│                                                         │
│                        │                                │
│                        ▼                                │
│                  Cost Calculator                        │
│              (Input token count)                        │
│                        │                                │
│                        ▼                                │
│            ┌───────────────────────┐                    │
│            │  Affiliate CTA Links  │ ◄── 💰 Revenue    │
│            │  AWS / GCP / Azure    │                    │
│            │  Credit Signup Pages  │                    │
│            └───────────────────────┘                    │
└─────────────────────────────────────────────────────────┘
      `}</pre>
    </div>
  );
}

function AutomationFlow() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 font-mono text-sm">
      <h3 className="text-cyan-400 font-bold mb-4 font-sans text-lg">⚙️ Automation Pipeline</h3>
      <pre className="text-zinc-300 leading-relaxed overflow-x-auto">{`
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  GitHub       │     │  GitHub      │     │  Vercel      │
  │  Action       │────▶│  Commit      │────▶│  Auto        │
  │  (Weekly)     │     │  Prices JSON │     │  Deploy      │
  └──────────────┘     └──────────────┘     └──────────────┘
        │                                          │
        ▼                                          ▼
  ┌──────────────┐                          ┌──────────────┐
  │  Scrape       │                          │  CDN Edge    │
  │  Provider     │                          │  (Global)    │
  │  Pricing Pages│                          │  Fast Load   │
  └──────────────┘                          └──────────────┘

  ──────────────────────────────────────────────────────────
  Result: Prices always fresh. Zero manual work after setup.
      `}</pre>
    </div>
  );
}

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const doneCount = TASKS.filter(t => t.status === 'done').length;
  const inProgressCount = TASKS.filter(t => t.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-emerald-400">💰</span> LLM Prices — Hustle Dashboard
            </h1>
            <p className="text-zinc-500 mt-1">Private project tracker • Last updated: {now.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-amber-400 font-semibold">{STATUS.phase}</span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-2xl font-bold text-emerald-400">{STATUS.overall}%</span>
          </div>
          <ProgressBar value={STATUS.overall} />
          <div className="flex gap-6 mt-4 text-sm text-zinc-400">
            <span>✅ {doneCount} done</span>
            <span>🔄 {inProgressCount} in progress</span>
            <span>⏳ {TASKS.length - doneCount - inProgressCount} pending</span>
          </div>
        </div>

        {/* Diagrams Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MermaidDiagram />
          <AutomationFlow />
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
                <span className="w-20 text-sm text-zinc-500 shrink-0">{r.month}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-800 rounded-full h-6 overflow-hidden relative">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (r.max / 500) * 100)}%`,
                          background: `linear-gradient(90deg, #6366f1, #10b981)`,
                          opacity: r.max === 0 ? 0.2 : 1,
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        ${r.min}–${r.max}/mo
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 w-40 text-right shrink-0">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dev Status Tracker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🛠 Development Tracker</h2>
          <div className="space-y-2">
            {TASKS.map((task, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                <span className={task.status === 'done' ? 'text-zinc-500 line-through' : ''}>{task.name}</span>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🏗 Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js 15', 'React 19', 'Tailwind CSS', 'Vercel', 'GitHub Actions', 'TypeScript'].map(t => (
              <span key={t} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-300">{t}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600 py-4">
          🔒 Private Dashboard — LLM Prices Project — Started {STATUS.startDate}
          <br />
          <a href={STATUS.repoUrl} className="text-indigo-500 hover:underline">{STATUS.repoUrl}</a>
        </div>
      </div>
    </div>
  );
}
