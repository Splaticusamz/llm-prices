'use client';

// Placeholder for analytics. Uncomment one:
// - Google Analytics: replace GA_ID
// - Plausible: uncomment the script tag

export default function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} /> */}
      {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} /> */}

      {/* Plausible */}
      {/* <script defer data-domain="llm-prices.vercel.app" src="https://plausible.io/js/script.js" /> */}
    </>
  );
}
