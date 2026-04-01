export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LLM Prices',
    url: 'https://llm-prices.vercel.app',
    description: 'Compare LLM API pricing across all major providers. Calculate costs, find the cheapest model.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://llm-prices.vercel.app/compare?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function DatasetJsonLd({ modelCount, providerCount }: { modelCount: number; providerCount: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'LLM API Pricing Database',
    description: `Pricing data for ${modelCount} LLM models across ${providerCount} providers, updated weekly.`,
    url: 'https://llm-prices.vercel.app',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    temporalCoverage: '2026/..',
    creator: { '@type': 'Organization', name: 'LLM Prices' },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ModelJsonLd({ name, provider, inputPrice, outputPrice, description }: {
  name: string; provider: string; inputPrice: number; outputPrice: number; description: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name} API`,
    brand: { '@type': 'Brand', name: provider },
    description,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min(inputPrice, outputPrice).toFixed(2),
      highPrice: Math.max(inputPrice, outputPrice).toFixed(2),
      offerCount: 2,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FAQJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
