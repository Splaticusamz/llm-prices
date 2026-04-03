import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LLM Pricing Blog — AI API Cost Guides & Comparisons',
  description: 'Expert guides on LLM API pricing, cost optimization, and model comparisons. Save money on AI APIs.',
};

const POSTS = [
  {
    slug: 'cheapest-llm-api-2026',
    title: 'Cheapest LLM API in 2026: Full Ranking by Cost',
    excerpt: 'The definitive ranking of every cheap LLM API in 2026. Real prices, tier breakdowns, and monthly cost calculations to find the most affordable AI API for your use case.',
    date: '2026-04-03',
    readTime: '7 min',
  },
  {
    slug: 'best-llm-for-coding-2026',
    title: 'Best LLM for Coding in 2026: Ranked by Price & Performance',
    excerpt: 'Which LLM writes the best code per dollar? We benchmark Claude Opus 4, GPT-5, Gemini 2.5 Pro, DeepSeek V3, and more on real coding tasks.',
    date: '2026-04-02',
    readTime: '7 min',
  },
  {
    slug: 'llm-api-pricing-april-2026',
    title: 'LLM API Pricing in April 2026: Complete Guide',
    excerpt: 'The definitive guide to every LLM API price in April 2026. OpenAI, Anthropic, Google, open-source — all providers compared.',
    date: '2026-04-01',
    readTime: '8 min',
  },
  {
    slug: 'free-llm-apis-2026',
    title: 'Best Free LLM APIs in 2026: Complete List',
    excerpt: 'Every free LLM API tier available right now. Build AI apps without spending a dime — we list every free tier and credit offer.',
    date: '2026-04-01',
    readTime: '7 min',
  },
  {
    slug: 'openai-api-cost-calculator-2026',
    title: 'OpenAI API Cost Calculator: Estimate Your GPT-5 & GPT-4.1 Spend in 2026',
    excerpt: 'Free cost calculator for OpenAI API in 2026. Estimate monthly spend for GPT-5, GPT-4.1, Mini, Nano, o3, and o4-mini with real pricing.',
    date: '2026-04-01',
    readTime: '6 min',
  },
  {
    slug: 'claude-4-vs-gpt-5-pricing',
    title: 'Claude 4 vs GPT-5 Pricing Comparison 2026',
    excerpt: 'A detailed breakdown of Anthropic Claude 4 and OpenAI GPT-5 API costs, performance, and value for different use cases.',
    date: '2026-03-23',
    readTime: '5 min',
  },
  {
    slug: '5-cheapest-llm-apis-2026',
    title: '5 Cheapest LLM APIs in 2026',
    excerpt: 'Looking for the most affordable AI APIs? We rank the top 5 cheapest options with real cost calculations.',
    date: '2026-03-23',
    readTime: '4 min',
  },
  {
    slug: 'reduce-ai-api-costs-80-percent',
    title: 'How to Reduce Your AI API Costs by 80%',
    excerpt: 'Practical strategies to slash your LLM spending: model selection, caching, prompt optimization, and more.',
    date: '2026-03-23',
    readTime: '6 min',
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-zinc-400 mb-8">Guides, comparisons, and tips for optimizing your AI API costs.</p>
      <div className="space-y-4">
        {POSTS.map(post => (
          <a key={post.slug} href={`/blog/${post.slug}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-400">{post.title}</h2>
            <p className="text-sm text-zinc-400">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
