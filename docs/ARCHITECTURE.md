# Architecture

## Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for SEO, React for interactivity |
| Styling | Tailwind CSS | Rapid UI development |
| Language | TypeScript | Type safety for pricing data |
| Data | Static JSON | No DB costs, easy updates |
| Hosting | Vercel | Free tier, edge CDN |
| Updates | GitHub Actions | Weekly automated pricing scraper |

## Directory Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Landing — comparison table + calculator
│   ├── layout.tsx    # Root layout with meta
│   └── blog/         # SEO content pages
├── components/       # React components
│   ├── ComparisonTable.tsx
│   ├── CostCalculator.tsx
│   └── ProviderCard.tsx
├── data/             # Static pricing JSON
│   └── providers.json
├── lib/              # Utilities
│   └── calculator.ts # Cost calculation logic
└── types/            # TypeScript interfaces
    └── pricing.ts
```

## Data Schema

```typescript
interface Provider {
  id: string;
  name: string;
  url: string;
  models: Model[];
}

interface Model {
  id: string;
  name: string;
  inputPricePer1M: number;   // USD per 1M input tokens
  outputPricePer1M: number;  // USD per 1M output tokens
  contextWindow: number;
  category: 'flagship' | 'mid' | 'budget' | 'embedding';
  lastUpdated: string;       // ISO date
}
```

## SEO Strategy

- Static generation for all pages (perfect Lighthouse scores)
- Structured data (JSON-LD) for pricing comparison
- Target keywords: "LLM API pricing", "GPT vs Claude cost", "cheapest AI API"
- Blog posts for long-tail SEO
