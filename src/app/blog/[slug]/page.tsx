import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, MessageCircle, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return notFound();

  const relatedPosts = blogPosts
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="bg-sky-50 text-sky hover:bg-sky-50 mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:text-navy prose-h2:text-2xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-semibold prose-a:text-sky prose-strong:text-navy prose-li:text-text-secondary">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("## "))
              return <h2 key={i} className="mt-8 mb-4">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("### "))
              return <h3 key={i} className="mt-6 mb-3">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("#### "))
              return <h4 key={i} className="mt-4 mb-2 text-base font-semibold text-navy">{trimmed.slice(5)}</h4>;
            if (trimmed.startsWith("- [ ] "))
              return <p key={i} className="flex items-center gap-2 text-text-secondary text-sm py-0.5">☐ {trimmed.slice(6)}</p>;
            if (trimmed.startsWith("- "))
              return <p key={i} className="flex items-start gap-2 text-text-secondary text-sm py-0.5"><span className="text-sky mt-0.5">•</span> {trimmed.slice(2)}</p>;
            if (trimmed.startsWith("1. ") || /^\d+\.\s/.test(trimmed))
              return <p key={i} className="text-text-secondary text-sm py-0.5 ml-4">{trimmed}</p>;
            if (trimmed.startsWith("|"))
              return <p key={i} className="text-text-secondary text-sm font-mono py-0.5">{trimmed}</p>;
            return <p key={i} className="text-text-secondary leading-relaxed mb-4">{trimmed}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl hero-gradient text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Need Personalized Guidance?
          </h3>
          <p className="text-white/70 text-sm mb-6">
            Get free expert counselling for your MBBS abroad journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/apply">
              <Button className="bg-white text-navy hover:bg-white/90 rounded-full px-6 font-semibold">
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 font-semibold bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-navy mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                <div className="bg-surface rounded-xl p-5 hover:-translate-y-1 transition-all">
                  <Badge variant="secondary" className="bg-sky-50 text-sky hover:bg-sky-50 text-xs mb-2">
                    {rp.category}
                  </Badge>
                  <h4 className="text-sm font-semibold text-navy group-hover:text-sky transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-2">{rp.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
