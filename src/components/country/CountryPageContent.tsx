"use client";

import { Country } from "@/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CTABanner } from "@/components/home/CTABanner";
import { FAQSection } from "@/components/home/FAQSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/universities";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  Home,
  Award,
  MapPin,
  Clock,
  BookOpen,
  Briefcase,
} from "lucide-react";

export function CountryPageContent({ country }: { country: Country }) {
  const countryUniversities = universities.filter(
    (u) => u.countrySlug === country.slug
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl">{country.flagEmoji}</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold">
                  Study Destination
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                MBBS in {country.name}
              </h1>
              <p className="mt-4 text-lg text-white/70 max-w-xl">
                {country.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { icon: Clock, label: country.duration },
                  { icon: BookOpen, label: country.medium + " Medium" },
                  { icon: Award, label: country.tuitionRange },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {country.recognition.map((r) => (
                  <span key={r} className="px-3 py-1 rounded-full bg-success/20 text-success-light text-xs font-medium">
                    ✓ {r} Approved
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <Link href="/apply">
                  <Button size="lg" className="bg-white text-navy hover:bg-white/90 rounded-full px-8 font-semibold shadow-lg group">
                    Apply Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading badge="Overview" title={`Why Study MBBS in ${country.name}?`} centered={false} />
            <p className="text-text-secondary leading-relaxed max-w-4xl">{country.overview}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading badge="Advantages" title={`Benefits of MBBS in ${country.name}`} />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {country.benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 card-shadow hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-sky" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-text-secondary">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading badge="Universities" title={`Top Medical Universities in ${country.name}`} />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryUniversities.map((uni, i) => (
              <AnimatedSection key={uni.slug} delay={i * 0.1}>
                <Link href={`/universities/${uni.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-border-light overflow-hidden hover:border-sky/30 card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1">
                    <div className="h-28 bg-gradient-to-br from-navy/90 to-sky/80 flex items-center justify-center p-4">
                      <h3 className="text-base font-bold text-white text-center">{uni.name}</h3>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Ranking</span>
                        <span className="font-medium text-navy">{uni.ranking}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Tuition</span>
                        <span className="font-semibold text-sky">{uni.tuitionFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Duration</span>
                        <span className="font-medium text-text-primary">{uni.duration}</span>
                      </div>
                      <div className="pt-3 border-t border-border-light">
                        <span className="text-sm font-medium text-sky flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading badge="Fees" title={`Fee Structure — MBBS in ${country.name}`} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl card-shadow overflow-hidden">
              {country.feeStructure.map((fee, i) => (
                <div key={i} className={`flex justify-between items-center px-6 py-4 ${i !== country.feeStructure.length - 1 ? "border-b border-border-light" : "bg-navy text-white"}`}>
                  <span className={`font-medium text-sm ${i === country.feeStructure.length - 1 ? "text-white font-bold" : "text-text-primary"}`}>{fee.item}</span>
                  <span className={`font-semibold text-sm ${i === country.feeStructure.length - 1 ? "text-sky-light text-lg" : "text-sky"}`}>{fee.cost}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <SectionHeading badge="Eligibility" title="Eligibility Criteria" centered={false} />
              <ul className="space-y-3">
                {country.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <GraduationCap className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                    {e}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <SectionHeading badge="Documents" title="Documents Required" centered={false} />
              <ul className="space-y-3">
                {country.documentsRequired.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <FileText className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading badge="Process" title="Admission Process" />
          </AnimatedSection>
          <div className="max-w-2xl mx-auto">
            {country.admissionProcess.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < country.admissionProcess.length - 1 && (
                      <div className="w-0.5 flex-1 bg-navy/10 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-text-secondary pb-6">{step}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel & Food */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <SectionHeading badge="Living" title="Hostel & Food" centered={false} />
              <p className="text-text-secondary leading-relaxed">{country.hostelAndFood}</p>
              <div className="flex items-center gap-2 mt-4">
                <Home className="w-5 h-5 text-sky" />
                <span className="text-sm text-navy font-medium">Comfortable accommodation with all amenities</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SectionHeading badge="Career" title="Career After MBBS" centered={false} />
              <ul className="space-y-3">
                {country.careerOpportunities.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Briefcase className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        faqs={country.faqs}
        title={`FAQs — MBBS in ${country.name}`}
        subtitle={`Common questions about studying medicine in ${country.name}.`}
      />

      {/* Lead Form */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <SectionHeading badge="Apply" title={`Get Admission in ${country.name}`} centered={false} />
              <p className="text-text-secondary leading-relaxed mb-6">
                Fill in your details and our {country.name} education expert will guide
                you through the entire admission process — for free.
              </p>
              <div className="space-y-3 text-sm text-text-secondary">
                <p>✓ Free counselling and university recommendation</p>
                <p>✓ Complete admission and visa assistance</p>
                <p>✓ No hidden fees or charges</p>
                <p>✓ 24-hour response guaranteed</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow">
                <LeadForm source={`country-${country.slug}`} country={country.name} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
