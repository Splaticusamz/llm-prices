import { getAllModels } from '@/lib/pricing';
import type { MetadataRoute } from 'next';

const BASE = 'https://llm-prices.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const models = getAllModels();
  const blogs = ['claude-4-vs-gpt-5-pricing', '5-cheapest-llm-apis-2026', 'reduce-ai-api-costs-80-percent'];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...models.map(m => ({
      url: `${BASE}/model/${m.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...blogs.map(slug => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
