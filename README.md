# LLM Prices — AI API Price Comparison & Calculator

> PCPartPicker for AI APIs. Compare costs across every major LLM provider.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/botsix-workspace/llm-prices)

## What is this?

A fast, clean comparison site for LLM API pricing. Input your expected token usage, get instant cost breakdowns across all major providers (OpenAI, Anthropic, Google, Mistral, Meta, and more).

**Live at:** _TBD (Vercel deployment pending)_

## Architecture

```
┌─────────────────────────────────────────┐
│            Next.js 15 (App Router)       │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │ Compare  │  │   Cost   │  │  SEO   │ │
│  │  Table   │  │ Calcuator│  │ Pages  │ │
│  └─────────┘  └──────────┘  └────────┘ │
│         ▲            ▲           ▲       │
│         └────────────┼───────────┘       │
│              Static JSON Data            │
│         (providers, models, pricing)     │
└─────────────────────────────────────────┘
         ▲
         │ Weekly update
   GitHub Action Scraper
```

- **Framework:** Next.js 15 + TypeScript + Tailwind CSS
- **Data Layer:** Static JSON pricing files (no database needed)
- **Updates:** GitHub Action scraper runs weekly to pull latest pricing
- **Hosting:** Vercel (free tier)
- **SEO:** Static generation for all pages, structured data

## Revenue Model

| Channel | Timeline | Estimated Revenue |
|---------|----------|-------------------|
| Cloud credit affiliate links (AWS, GCP, Azure) | Month 3+ | $50–200/mo |
| API platform referral programs | Month 3+ | $20–100/mo |
| Google AdSense | Month 6+ | $50–200/mo |

**Target:** $200–500/mo passive income by month 6.

## Key Features (Planned)

- [ ] Provider comparison table (input/output per 1M tokens)
- [ ] Interactive cost calculator
- [ ] "Best for your use case" recommendations
- [ ] Blog/SEO pages (e.g., "Claude 4 vs GPT-5 pricing 2026")
- [ ] Pricing history charts
- [ ] API for programmatic access

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run lint    # Lint check
```

## Data Sources

Pricing data is sourced from official provider documentation and updated weekly:

- OpenAI: https://openai.com/pricing
- Anthropic: https://anthropic.com/pricing
- Google (Gemini): https://ai.google.dev/pricing
- Mistral: https://mistral.ai/pricing
- And more...

## License

MIT
