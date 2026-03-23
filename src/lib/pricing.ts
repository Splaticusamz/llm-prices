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

export const AFFILIATE_LINKS = {
  aws: { url: 'https://aws.amazon.com/free/', label: 'AWS Free Tier', credit: '$300' },
  gcp: { url: 'https://cloud.google.com/free', label: 'Google Cloud', credit: '$300' },
  azure: { url: 'https://azure.microsoft.com/free/', label: 'Azure', credit: '$200' },
  openai: { url: 'https://platform.openai.com/signup', label: 'OpenAI', credit: '$5' },
  anthropic: { url: 'https://console.anthropic.com/', label: 'Anthropic', credit: '$5' },
};

export const PRESETS = [
  { name: 'Light', input: 1_000_000, output: 500_000, desc: 'Small chatbot or prototype' },
  { name: 'Medium', input: 10_000_000, output: 5_000_000, desc: 'Production app' },
  { name: 'Heavy', input: 100_000_000, output: 50_000_000, desc: 'High-traffic service' },
  { name: 'Enterprise', input: 1_000_000_000, output: 500_000_000, desc: 'Large-scale deployment' },
];
