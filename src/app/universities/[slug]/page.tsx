import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { universities, getUniversityBySlug } from "@/data/universities";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { UniversityGallery } from "@/components/university/UniversityGallery";
import {
  ArrowRight,
  Award,
  MapPin,
  Clock,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Building,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return {};
  return {
    title: uni.metaTitle,
    description: uni.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/universities/${slug}` },
    openGraph: {
      title: uni.metaTitle,
      description: uni.metaDescription,
      url: `${SITE_CONFIG.url}/universities/${slug}`,
    },
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">{uni.flagEmoji}</span>
              <Link
                href={`/${uni.countrySlug}`}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                MBBS in {uni.country}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {uni.name}
            </h1>

            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { icon: Award, label: uni.ranking },
                { icon: Clock, label: `Est. ${uni.established}` },
                { icon: BookOpen, label: uni.medium + " Medium" },
                { icon: MapPin, label: uni.country },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-navy hover:bg-white/90 rounded-full px-8 font-semibold shadow-lg group">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 font-semibold bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-4">About {uni.name}</h2>
          <p className="text-text-secondary leading-relaxed max-w-4xl">{uni.overview}</p>
        </div>
      </section>

      <UniversityGallery universityName={uni.name} images={uni.gallery ?? []} />

      {/* Fee & Recognition */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fees */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="text-lg font-bold text-navy mb-4">Fee Structure</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-sm text-text-secondary">Tuition Fee</span>
                  <span className="font-semibold text-sky">{uni.tuitionFee}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border-light">
                  <span className="text-sm text-text-secondary">Hostel + Mess</span>
                  <span className="font-semibold text-navy">{uni.hostelFee}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-text-secondary">Duration</span>
                  <span className="font-semibold text-navy">{uni.duration}</span>
                </div>
              </div>
            </div>

            {/* Recognition */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="text-lg font-bold text-navy mb-4">Recognition</h3>
              <div className="space-y-3">
                {uni.recognition.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm text-text-primary font-medium">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Admission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky" /> Eligibility
              </h3>
              <ul className="space-y-3">
                {uni.eligibility.map((e, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-sky shrink-0" /> {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-sky" /> Admission Process
              </h3>
              <ul className="space-y-3">
                {uni.admissionProcess.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-sky" /> Campus Facilities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {uni.facilities.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center card-shadow">
                <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-2" />
                <p className="text-xs font-medium text-text-primary">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy">
              Apply to {uni.name}
            </h2>
            <p className="text-text-secondary mt-2">
              Fill the form below and our counsellor will guide you through the admission process.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-6 sm:p-8">
            <LeadForm source={`university-${uni.slug}`} country={uni.country} />
          </div>
        </div>
      </section>
    </div>
  );
}
