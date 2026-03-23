import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  content: React.ReactNode;
}

const POSTS: Record<string, BlogPost> = {
  'claude-4-vs-gpt-5-pricing': {
    title: 'Claude 4 vs GPT-5 Pricing Comparison 2026',
    date: '2026-03-23',
    description: 'Detailed comparison of Claude Opus 4 and GPT-5 API pricing, performance, and best use cases.',
    content: (
      <article className="prose prose-invert prose-zinc max-w-none">
        <p>Choosing between Anthropic&apos;s Claude Opus 4 and OpenAI&apos;s GPT-5 comes down to your budget and use case. Let&apos;s break down the real costs.</p>

        <h2>Pricing at a Glance</h2>
        <p><strong>GPT-5:</strong> $10.00/1M input tokens, $30.00/1M output tokens</p>
        <p><strong>Claude Opus 4:</strong> $15.00/1M input tokens, $75.00/1M output tokens</p>
        <p>GPT-5 is significantly cheaper — roughly 60% less on output tokens. For output-heavy workloads (code generation, long-form writing), this adds up fast.</p>

        <h2>Monthly Cost Comparison</h2>
        <p>For a medium workload (10M input, 5M output tokens/month):</p>
        <ul>
          <li><strong>GPT-5:</strong> $100 + $150 = <strong>$250/month</strong></li>
          <li><strong>Claude Opus 4:</strong> $150 + $375 = <strong>$525/month</strong></li>
        </ul>
        <p>That&apos;s a $275/month difference — $3,300/year saved by choosing GPT-5.</p>

        <h2>But Price Isn&apos;t Everything</h2>
        <p>Claude Opus 4 offers a 200K context window and excels at nuanced, instruction-following tasks. GPT-5&apos;s 256K context window is slightly larger. Both are flagship models with different strengths.</p>

        <h2>Budget Alternatives</h2>
        <p>If neither fits your budget, consider mid-tier options like <a href="/model/gpt-4.1">GPT-4.1</a> ($2/$8 per 1M) or <a href="/model/claude-sonnet-4">Claude Sonnet 4</a> ($3/$15 per 1M) — often 90% of the quality at a fraction of the cost.</p>

        <p>Use our <a href="/calculator">cost calculator</a> to see exact numbers for your workload.</p>
      </article>
    ),
  },
  '5-cheapest-llm-apis-2026': {
    title: '5 Cheapest LLM APIs in 2026',
    date: '2026-03-23',
    description: 'Ranking the most affordable LLM APIs available in 2026, with real cost calculations.',
    content: (
      <article className="prose prose-invert prose-zinc max-w-none">
        <p>AI doesn&apos;t have to be expensive. Here are the 5 cheapest LLM APIs you can use right now, ranked by combined input + output cost.</p>

        <h2>1. GPT-4.1 Nano — $0.10 / $0.40</h2>
        <p>OpenAI&apos;s tiniest model punches above its weight. At just $0.50 per million combined tokens, it&apos;s perfect for classification, extraction, and simple chat. Plus, it supports a massive 1M token context window.</p>

        <h2>2. Mistral Small — $0.10 / $0.30</h2>
        <p>Even cheaper on output than Nano. Mistral Small is great for European language tasks and lightweight applications. The 32K context window is the main limitation.</p>

        <h2>3. Gemini 2.5 Flash — $0.15 / $0.60</h2>
        <p>Google&apos;s budget offering with a mind-blowing 1M token context window. Best value for long-document processing.</p>

        <h2>4. DeepSeek V3 — $0.27 / $1.10</h2>
        <p>Chinese AI lab DeepSeek offers impressive quality at budget prices. Great for coding tasks and general reasoning.</p>

        <h2>5. GPT-4.1 Mini — $0.40 / $1.60</h2>
        <p>The sweet spot between quality and cost. Mini handles most production use cases well and includes the full 1M context window.</p>

        <h2>The Bottom Line</h2>
        <p>For 10M tokens/month, the cheapest option (Mistral Small) costs just <strong>$4/month</strong>. The most expensive flagship (Claude Opus 4) costs <strong>$525/month</strong> for the same volume. That&apos;s a 130x difference.</p>

        <p><a href="/compare">See the full comparison table →</a></p>
      </article>
    ),
  },
  'reduce-ai-api-costs-80-percent': {
    title: 'How to Reduce Your AI API Costs by 80%',
    date: '2026-03-23',
    description: 'Practical strategies to drastically reduce your LLM API spending without sacrificing quality.',
    content: (
      <article className="prose prose-invert prose-zinc max-w-none">
        <p>Most teams overspend on AI APIs by 3-5x. Here are battle-tested strategies to cut your costs dramatically.</p>

        <h2>1. Right-Size Your Model</h2>
        <p>The #1 mistake: using GPT-5 or Claude Opus for everything. Most tasks (80%+) work great with mid-tier or budget models. Use our <a href="/calculator">calculator</a> to see the savings.</p>
        <ul>
          <li><strong>Classification, extraction, formatting:</strong> Use Nano/Small models</li>
          <li><strong>Chat, summarization, general tasks:</strong> Use Mini/Flash models</li>
          <li><strong>Complex reasoning, creative writing:</strong> Use flagship models</li>
        </ul>

        <h2>2. Implement Caching</h2>
        <p>If you&apos;re sending the same or similar prompts repeatedly, cache the responses. A simple Redis cache can cut API calls by 30-50%. Many providers also support prompt caching natively.</p>

        <h2>3. Optimize Your Prompts</h2>
        <p>Shorter prompts = fewer input tokens = lower cost. Remove unnecessary context, use concise system prompts, and avoid repeating instructions.</p>

        <h2>4. Batch Processing</h2>
        <p>Most providers offer 50% discounts for batch/async API calls. If you don&apos;t need real-time responses, batch everything.</p>

        <h2>5. Use a Model Router</h2>
        <p>Route easy queries to cheap models and hard queries to expensive ones. Tools like OpenRouter, LiteLLM, and custom routers can automate this.</p>

        <h2>Real Example</h2>
        <p>A team spending $2,000/month on Claude Opus 4 for everything switched to: Opus for 10% of queries, Sonnet for 30%, Haiku for 60%. New cost: <strong>$380/month</strong>. That&apos;s an 81% reduction.</p>

        <p><a href="/compare">Compare all model prices →</a></p>
      </article>
    ),
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return { title: `${post.title} | LLM Prices`, description: post.description };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <a href="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Back to blog</a>
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <div className="text-sm text-zinc-500 mb-8">{post.date}</div>
      {post.content}
    </div>
  );
}
