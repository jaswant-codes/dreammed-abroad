import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog — MBBS Abroad Insights & Guides",
  description:
    "Read expert articles on MBBS abroad, NEET updates, visa guides, student life, FMGE preparation, and university comparisons.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative pb-12 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            MBBS Abroad Insights
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Expert articles, guides, and updates to help you make informed
            decisions about your medical education journey.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList />
        </div>
      </section>
    </div>
  );
}
