"use client";

import Link from "next/link";
import { countries } from "@/data/countries";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CountriesSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Study Destinations"
            title="Countries We Offer"
            subtitle="Explore top MBBS destinations with NMC-approved universities, affordable fees, and world-class education."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, i) => (
            <AnimatedSection key={country.slug} delay={i * 0.1}>
              <Link href={`/${country.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group-hover:-translate-y-1">
                  {/* Image placeholder with gradient */}
                  <div className="relative h-48 bg-gradient-to-br from-navy to-sky overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{country.flagEmoji}</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <div className="flex items-center gap-1.5 text-white/80 text-xs">
                        <MapPin className="w-3 h-3" />
                        {country.duration} • {country.medium} Medium
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-navy group-hover:text-sky transition-colors">
                      MBBS in {country.name}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                      {country.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-sky">
                        {country.tuitionRange}
                      </span>
                      <span className="text-xs font-medium text-navy flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/universities">
              <Button
                variant="outline"
                className="rounded-full px-6 border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                View All Universities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
