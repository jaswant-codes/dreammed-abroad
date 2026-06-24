import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guidesData, getGuideBySlug } from "@/data/guides";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, MessageCircle, ArrowRight, ChevronRight, List } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guidesData.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuideBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/guides/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_CONFIG.url}/guides/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/* ─── Inline Markdown Helpers ─── */

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
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
    } else if (match[6]) {
      // Italic: *text*
      nodes.push(<em key={key++} className="text-text-secondary italic">{match[7]}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

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
  const isSeparator = (row: string) => /^\|?[\s\-:\|]+\|?$/.test(row);
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

    if (trimmed.match(/^##\s.*FAQ/i) || trimmed.match(/^##\s.*Frequently Asked/i)) {
      inFaqSection = true;
      continue;
    }

    if (inFaqSection && trimmed.startsWith("## ") && !trimmed.match(/FAQ/i) && !trimmed.match(/Frequently/i)) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      inFaqSection = false;
      continue;
    }

    if (!inFaqSection) continue;

    const qMatch = trimmed.match(/^###\s+Q\d*:\s*(.+)/) || trimmed.match(/^###\s+Q:\s*(.+)/);
    if (qMatch) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      currentQuestion = qMatch[1].trim();
      currentAnswer = [];
      continue;
    }

    if (trimmed.startsWith("### ")) continue;

    if (currentQuestion && trimmed) {
      currentAnswer.push(trimmed);
    }
  }

  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
  }

  return faqs;
}

/* ─── Content Renderer ─── */

function renderContent(content: string, slug: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === "[MID_CTA]") {
      const isRussia = slug === "mbbs-in-russia-2026";
      elements.push(
        <div key={`mid-cta-${i}`} className="my-10 p-8 rounded-2xl bg-surface border border-sky-200 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-navy mb-2">Need Expert Guidance?</h3>
            <p className="text-text-secondary">Get a fully transparent, customized fee estimate and university selection help.</p>
          </div>
          <Link href={isRussia ? "/apply" : WHATSAPP_URL} target={isRussia ? "_self" : "_blank"} rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap">
            {isRussia ? "Apply for Free MBBS Counselling" : "WhatsApp Us"}
          </Link>
        </div>
      );
      i++;
      continue;
    }

    // Image block
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      elements.push(
        <figure key={i} className="my-10">
          <img src={src} alt={alt} loading="lazy" className="w-full max-h-[500px] rounded-2xl shadow-lg object-cover" />
          {alt && <figcaption className="text-center text-sm text-text-secondary mt-3 italic">{alt}</figcaption>}
        </figure>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
      const text = trimmed.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      elements.push(
        <h2 key={i} id={id} className="mt-12 mb-4 text-2xl md:text-3xl font-bold text-navy scroll-mt-28">
          {parseInline(text)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4);
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-navy">
          {parseInline(text)}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      const text = trimmed.slice(5);
      elements.push(
        <h4 key={i} className="mt-6 mb-2 text-lg font-semibold text-navy">
          {parseInline(text)}
        </h4>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i].trim());
        i++;
      }
      elements.push(<div key={`table-${i}`}>{renderMarkdownTable(tableRows)}</div>);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      elements.push(
        <p key={i} className="flex items-start gap-2 text-text-secondary text-base py-1">
          <span className="text-sky mt-1 shrink-0">•</span>
          <span>{parseInline(trimmed.slice(2))}</span>
        </p>
      );
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        elements.push(
          <p key={i} className="flex items-start gap-2 text-text-secondary text-base py-1 ml-1">
            <span className="text-sky font-semibold shrink-0">{numMatch[1]}.</span>
            <span>{parseInline(numMatch[2])}</span>
          </p>
        );
      }
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="text-text-secondary leading-relaxed mb-4 text-base md:text-lg">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

/* ─── Main Page Component ─── */

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getGuideBySlug(slug);
  if (!post) return notFound();

  const relatedPosts = guidesData
    .filter((g) => g.slug !== slug)
    .slice(0, 3);

  const headings = extractHeadings(post.content);
  const faqs = extractFAQs(post.content);
  const showTOC = headings.length >= 5;

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
      "@id": `${SITE_CONFIG.url}/guides/${slug}`,
    },
  };

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
        "name": "Guides",
        "item": `${SITE_CONFIG.url}/guides`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${SITE_CONFIG.url}/guides/${slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-36 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-text-secondary">
              <li>
                <Link href="/" className="hover:text-navy transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li>
                <span className="text-text-secondary">Guides</span>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-navy font-medium truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

          <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-navy transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-10">
            <Badge variant="secondary" className="bg-sky-50 text-sky hover:bg-sky-50 mb-4 px-3 py-1">
              {post.category}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary bg-surface p-4 rounded-xl border border-border-light">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-sky" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky" /> {post.readTime}
              </span>
            </div>
          </div>

          {showTOC && (
            <div className="mb-12 p-6 md:p-8 bg-surface rounded-2xl border border-border-light shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-navy uppercase tracking-wider mb-4">
                <List className="w-5 h-5 text-sky" />
                Table of Contents
              </h2>
              <nav>
                <ol className="space-y-2.5">
                  {headings.map((h, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${h.id}`}
                        className="text-base text-text-secondary hover:text-sky transition-colors flex items-start gap-3"
                      >
                        <span className="text-sky font-semibold shrink-0 bg-sky-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">{idx + 1}</span>
                        <span className="mt-0.5">{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          )}

          <div className="prose prose-slate max-w-none prose-headings:text-navy prose-h2:text-3xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-a:text-sky prose-strong:text-navy prose-li:text-text-secondary">
            {renderContent(post.content, post.slug)}
          </div>

          {/* End of Article Lead Capture & CTA */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl hero-gradient text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-sky/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                {post.slug === "mbbs-in-russia-2026" ? "Ready for MBBS in Russia?" : "Ready to Begin Your MBBS Journey?"}
              </h3>
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of successful Indian doctors. Get free, transparent, and expert counselling to find the perfect NMC-approved university.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button className="w-full bg-white text-navy hover:bg-sky-50 rounded-full px-8 py-6 h-auto text-lg font-bold shadow-lg transition-all hover:scale-105">
                    {post.slug === "mbbs-in-russia-2026" ? "Talk to DreamMed Abroad Russia Expert" : "Apply Now"} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 h-auto text-lg font-bold bg-transparent transition-all hover:scale-105">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Related Guides */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-navy mb-8 border-b border-border-light pb-4">Read Next</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/guides/${rp.slug}`} className="group block h-full">
                    <div className="bg-surface rounded-2xl p-6 md:p-8 h-full border border-border-light hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <Badge variant="secondary" className="bg-sky-50 text-sky hover:bg-sky-50 text-xs mb-4 font-semibold px-3 py-1">
                        {rp.category}
                      </Badge>
                      <h4 className="text-xl font-bold text-navy group-hover:text-sky transition-colors mb-3 leading-snug">
                        {rp.title}
                      </h4>
                      <p className="text-sm text-text-secondary flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky" /> {rp.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-border-light shadow-[0_-4px_10px_rgba(0,0,0,0.05)] sm:hidden z-50 flex gap-3">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl">
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
        <Link href="/apply" className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold py-3 rounded-xl">
          Apply Now
        </Link>
      </div>
    </>
  );
}
