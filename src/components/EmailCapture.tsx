'use client';

import { useState } from 'react';

export default function EmailCapture({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${variant === 'compact' ? 'p-4' : 'p-8'} bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center`}>
        <p className="text-emerald-400 font-semibold">✅ You&apos;re subscribed! We&apos;ll notify you when prices change.</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required
          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
        <button type="submit" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm transition-colors">
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-zinc-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">📬 Get Pricing Alerts</h2>
        <p className="text-zinc-400 mb-6">Get notified when LLM prices drop or new models launch. No spam, just savings.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-emerald-500" />
          <button type="submit" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors whitespace-nowrap">
            Get Alerts →
          </button>
        </form>
        {status === 'error' && <p className="text-red-400 text-sm mt-2">Something went wrong. Try again?</p>}
        <p className="text-zinc-600 text-xs mt-4">Join 0 developers saving on AI costs</p>
      </div>
    </section>
  );
}
