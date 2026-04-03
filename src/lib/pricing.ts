import providersData from '@/data/providers.json';

export interface Model {
  id: string;
  name: string;
  inputPricePer1M: number;
  outputPricePer1M: number;
  contextWindow: number;
  category: 'flagship' | 'mid' | 'budget';
  provider: string;
  providerId: string;
  providerUrl: string;
}

export interface CostResult {
  model: Model;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

export function getAllModels(): Model[] {
  return providersData.providers.flatMap(p =>
    p.models.map(m => ({
      ...m,
      category: m.category as Model['category'],
      provider: p.name,
      providerId: p.id,
      providerUrl: p.url,
    }))
  );
}

export function calculateCost(inputTokens: number, outputTokens: number, model: Model): CostResult {
  const inputCost = (inputTokens / 1_000_000) * model.inputPricePer1M;
  const outputCost = (outputTokens / 1_000_000) * model.outputPricePer1M;
  return { model, inputCost, outputCost, totalCost: inputCost + outputCost };
}

export function calculateAllCosts(inputTokens: number, outputTokens: number): CostResult[] {
  return getAllModels()
    .map(m => calculateCost(inputTokens, outputTokens, m))
    .sort((a, b) => a.totalCost - b.totalCost);
}

export function getCheapestModels(n: number): Model[] {
  return getAllModels()
    .sort((a, b) => (a.inputPricePer1M + a.outputPricePer1M) - (b.inputPricePer1M + b.outputPricePer1M))
    .slice(0, n);
}

export function getModelsByCategory(category: Model['category']): Model[] {
  return getAllModels().filter(m => m.category === category);
}

export function getModelById(id: string): Model | undefined {
  return getAllModels().find(m => m.id === id);
}

export function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(3)}`;
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function formatContextWindow(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(0)}M`;
  return `${(tokens / 1_000).toFixed(0)}K`;
}

const UTM = '?utm_source=llmprices&utm_medium=referral&utm_campaign=provider';

export const AFFILIATE_LINKS: Record<string, { url: string; label: string; credit?: string }> = {
  aws: { url: `https://aws.amazon.com/free/${UTM}`, label: 'AWS Free Tier', credit: '$300' },
  gcp: { url: `https://cloud.google.com/free${UTM}`, label: 'Google Cloud', credit: '$300' },
  azure: { url: `https://azure.microsoft.com/free/${UTM}`, label: 'Azure', credit: '$200' },
  openai: { url: `https://platform.openai.com/signup${UTM}`, label: 'OpenAI', credit: '$5' },
  anthropic: { url: `https://console.anthropic.com/${UTM}`, label: 'Anthropic', credit: '$5' },
  google: { url: `https://aistudio.google.com/${UTM}`, label: 'Google AI Studio', credit: 'Free tier' },
  mistral: { url: `https://console.mistral.ai/${UTM}`, label: 'Mistral AI', credit: '$5' },
  cohere: { url: `https://dashboard.cohere.com/welcome/register${UTM}`, label: 'Cohere', credit: 'Free tier' },
  together: { url: `https://api.together.xyz/signup${UTM}`, label: 'Together AI', credit: '$5' },
  fireworks: { url: `https://fireworks.ai/login${UTM}`, label: 'Fireworks AI', credit: '$1' },
  groq: { url: `https://console.groq.com/signup${UTM}`, label: 'Groq', credit: 'Free tier' },
  deepseek: { url: `https://platform.deepseek.com/sign_up${UTM}`, label: 'DeepSeek', credit: '$5' },
  perplexity: { url: `https://docs.perplexity.ai/${UTM}`, label: 'Perplexity', credit: '$5' },
  xai: { url: `https://console.x.ai/signup${UTM}`, label: 'xAI / Grok', credit: '$25' },
  amazon: { url: `https://aws.amazon.com/bedrock/${UTM}`, label: 'Amazon Bedrock', credit: '$300 AWS Free Tier' },
  meta: { url: `https://api.together.xyz/signup${UTM}`, label: 'Together AI (Llama)', credit: '$5' },
  replicate: { url: `https://replicate.com/signin${UTM}`, label: 'Replicate', credit: 'Free tier' },
  cerebras: { url: `https://cloud.cerebras.ai/signup${UTM}`, label: 'Cerebras', credit: 'Free tier' },
};

export function generateVSPairs(): { modelA: Model; modelB: Model; slug: string }[] {
  const models = getAllModels();
  const pairs: { modelA: Model; modelB: Model; slug: string }[] = [];
  for (let i = 0; i < models.length; i++) {
    for (let j = i + 1; j < models.length; j++) {
      const a = models[i], b = models[j];
      if (a.providerId !== b.providerId && a.category === b.category) {
        pairs.push({ modelA: a, modelB: b, slug: `${a.id}-vs-${b.id}` });
      }
    }
  }
  return pairs;
}

export function getProviders(): { id: string; name: string; url: string; models: Model[] }[] {
  const models = getAllModels();
  const map = new Map<string, { id: string; name: string; url: string; models: Model[] }>();
  for (const m of models) {
    if (!map.has(m.providerId)) {
      map.set(m.providerId, { id: m.providerId, name: m.provider, url: m.providerUrl, models: [] });
    }
    map.get(m.providerId)!.models.push(m);
  }
  return Array.from(map.values());
}

export const PRESETS = [
  { name: 'Light', input: 1_000_000, output: 500_000, desc: 'Small chatbot or prototype' },
  { name: 'Medium', input: 10_000_000, output: 5_000_000, desc: 'Production app' },
  { name: 'Heavy', input: 100_000_000, output: 50_000_000, desc: 'High-traffic service' },
  { name: 'Enterprise', input: 1_000_000_000, output: 500_000_000, desc: 'Large-scale deployment' },
];
