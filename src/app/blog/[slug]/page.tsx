import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import Link from "next/link";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, MessageCircle, ArrowRight, ChevronRight, List } from "lucide-react";

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

/* ─── Inline Markdown Helpers ─── */

/** Parse inline markdown (bold + links) and return React nodes */
function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Regex matches: **bold**, [text](url)
  const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold: **text**
      nodes.push(<strong key={key++} className="text-navy font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      // Link: [text](url)
      const linkText = match[4];
      const href = match[5];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        nodes.push(
          <Link key={key++} href={href} className="text-sky hover:text-navy underline underline-offset-2 transition-colors">
            {linkText}
          </Link>
        );
      } else {
        nodes.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-sky hover:text-navy underline underline-offset-2 transition-colors">
            {linkText}
          </a>
        );
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/* ─── Table Renderer ─── */

function renderMarkdownTable(rows: string[]): React.ReactNode {
  if (rows.length < 2) return null;

  const parseRow = (row: string) =>
    row.split("|").map((cell) => cell.trim()).filter((cell) => cell.length > 0);

  const headers = parseRow(rows[0]);

  // Skip separator row (row index 1 with --- patterns)
  const isSeparator = (row: string) => /^\|?[\s\-:|]+\|?$/.test(row);

  const dataRows = rows.filter((_, idx) => idx > 0 && !isSeparator(rows[idx]));

  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-border-light shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-white">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                {parseInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rIdx) => {
            const cells = parseRow(row);
            return (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-surface"}>
                {cells.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-text-secondary border-t border-border-light whitespace-nowrap">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Extract TOC Headings ─── */

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
      const text = trimmed.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      headings.push({ id, text, level: 2 });
    }
  }
  return headings;
}

/* ─── Extract FAQ pairs for schema ─── */

function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  let currentQuestion = "";
  let currentAnswer: string[] = [];
  let inFaqSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect FAQ section
    if (trimmed.match(/^##\s.*FAQ/i) || trimmed.match(/^##\s.*Frequently Asked/i)) {
      inFaqSection = true;
      continue;
    }

    // End FAQ section on next ## heading
    if (inFaqSection && trimmed.startsWith("## ") && !trimmed.match(/FAQ/i) && !trimmed.match(/Frequently/i)) {
      // Save last FAQ
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      inFaqSection = false;
      continue;
    }

    if (!inFaqSection) continue;

    // Match ### Q: Question? format
    const qMatch = trimmed.match(/^###\s+Q:\s*(.+)/);
    if (qMatch) {
      // Save previous FAQ if exists
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      currentQuestion = qMatch[1].trim();
      currentAnswer = [];
      continue;
    }

    // Skip ### headings that aren't Q: format (within FAQ section)
    if (trimmed.startsWith("### ")) continue;

    // Accumulate answer lines
    if (currentQuestion && trimmed) {
      currentAnswer.push(trimmed);
    }
  }

  // Save last FAQ
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
  }

  return faqs;
}

/* ─── Content Renderer ─── */

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    
    // Image
    if (trimmed.startsWith('![')) {
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        elements.push(
          <figure key={i} className="my-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={imgMatch[2]} 
                alt={imgMatch[1] || 'DreamMed Abroad'} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {imgMatch[1] && (
              <figcaption className="text-center text-sm text-text-secondary mt-3 italic">
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
      }
      i++;
      continue;
    }


    // MID_CTA
    if (trimmed === '[MID_CTA]') {
      elements.push(
        <div key={`mid-cta-${i}`} className="my-10 p-8 rounded-2xl bg-surface border border-sky-200 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-navy mb-2">Get Free MBBS Abroad Counselling</h4>
            <p className="text-text-secondary">Speak with our experts to find the perfect NMC approved university within your budget.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/apply">
              <Button className="bg-sky text-white hover:bg-sky-600 px-6 py-6 rounded-full font-bold w-full sm:w-auto shadow-md">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-sky text-sky hover:bg-sky-50 px-6 py-6 rounded-full font-bold w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // H1 (from markdown, render as H2 for SEO)
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      const text = trimmed.slice(2);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={i} id={id} className="mt-12 mb-6 text-3xl font-extrabold text-navy scroll-mt-28">
          {parseInline(text)}
        </h2>
      );
      i++;
      continue;
    }

    // H2
    if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
      const text = trimmed.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={i} id={id} className="mt-10 mb-4 text-2xl font-bold text-navy scroll-mt-28">
          {parseInline(text)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4);
      elements.push(
        <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-navy">
          {parseInline(text)}
        </h3>
      );
      i++;
      continue;
    }

    // H4
    if (trimmed.startsWith("#### ")) {
      const text = trimmed.slice(5);
      elements.push(
        <h4 key={i} className="mt-4 mb-2 text-base font-semibold text-navy">
          {parseInline(text)}
        </h4>
      );
      i++;
      continue;
    }

    // Table block: collect consecutive lines starting with |
    if (trimmed.startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i].trim());
        i++;
      }
      elements.push(<div key={`table-${i}`}>{renderMarkdownTable(tableRows)}</div>);
      continue;
    }

    // Checkbox item
    if (trimmed.startsWith("- [ ] ")) {
      elements.push(
        <p key={i} className="flex items-center gap-2 text-text-secondary text-sm py-0.5">
          ☐ {parseInline(trimmed.slice(6))}
        </p>
      );
      i++;
      continue;
    }

    // Bullet list item
    if (trimmed.startsWith("- ")) {
      elements.push(
        <p key={i} className="flex items-start gap-2 text-text-secondary text-sm py-0.5">
          <span className="text-sky mt-0.5 shrink-0">•</span>
          <span>{parseInline(trimmed.slice(2))}</span>
        </p>
      );
      i++;
      continue;
    }

    // Numbered list item
    if (/^\d+\.\s/.test(trimmed)) {
      const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        elements.push(
          <p key={i} className="flex items-start gap-2 text-text-secondary text-sm py-0.5 ml-1">
            <span className="text-sky font-semibold shrink-0">{numMatch[1]}.</span>
            <span>{parseInline(numMatch[2])}</span>
          </p>
        );
      }
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-text-secondary leading-relaxed mb-4">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

/* ─── Main Page Component ─── */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return notFound();

  const relatedPosts = blogPosts
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const headings = extractHeadings(post.content);
  const faqs = extractFAQs(post.content);
  const showTOC = headings.length >= 5;

  // Estimate word count
  const wordCount = post.content.split(/\s+/).length;
  const isLongArticle = wordCount > 2000;

  // JSON-LD: Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },
  };

  // JSON-LD: FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  // JSON-LD: Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_CONFIG.url}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${SITE_CONFIG.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-text-secondary">
              <li>
                <Link href="/" className="hover:text-navy transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li>
                <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-navy font-medium truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

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

          {/* Table of Contents */}
          {showTOC && (
            <div className="mb-10 p-6 bg-surface rounded-2xl border border-border-light">
              <h2 className="flex items-center gap-2 text-sm font-bold text-navy uppercase tracking-wider mb-4">
                <List className="w-4 h-4" />
                Table of Contents
              </h2>
              <nav>
                <ol className="space-y-2">
                  {headings.map((h, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${h.id}`}
                        className="text-sm text-text-secondary hover:text-sky transition-colors flex items-start gap-2"
                      >
                        <span className="text-sky font-semibold shrink-0">{idx + 1}.</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-slate max-w-none prose-headings:text-navy prose-h2:text-2xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-semibold prose-a:text-sky prose-strong:text-navy prose-li:text-text-secondary">
            {renderContent(post.content)}
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
    </>
  );
}
