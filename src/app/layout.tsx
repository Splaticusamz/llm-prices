import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Search from "@/components/Search";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLM Prices — Compare AI API Costs | Find the Cheapest LLM",
  description: "Compare LLM API pricing across OpenAI, Anthropic, Google, Mistral & DeepSeek. Calculate costs, find the cheapest model for your use case. Updated weekly.",
  keywords: ["LLM pricing", "GPT-5 API cost", "Claude vs GPT pricing", "cheapest LLM API", "AI API comparison", "token cost calculator"],
  openGraph: {
    title: "LLM Prices — Compare AI API Costs",
    description: "Find the cheapest LLM API for your project. Compare 13+ models across 5 providers.",
    type: "website",
    url: "https://llm-prices.vercel.app",
  },
  twitter: { card: "summary_large_image", title: "LLM Prices — Compare AI API Costs" },
  robots: { index: true, follow: true },
};

function Nav() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-emerald-400">⚡</span>
          <span>LLM Prices</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="/compare" className="text-zinc-400 hover:text-white transition-colors">Compare</a>
          <a href="/calculator" className="text-zinc-400 hover:text-white transition-colors">Calculator</a>
          <a href="/blog" className="text-zinc-400 hover:text-white transition-colors">Blog</a>
          <Search />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-zinc-500 space-y-2">
        <p>Prices updated weekly via automated scraper. Last update: March 2026.</p>
        <p className="text-zinc-600">
          Affiliate Disclosure: Some links may earn us a commission at no extra cost to you.
          This helps keep the site free and updated.
        </p>
        <p>© 2026 LLM Prices. Open source on <a href="https://github.com/Splaticusamz/llm-prices" className="text-indigo-400 hover:underline">GitHub</a>.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
