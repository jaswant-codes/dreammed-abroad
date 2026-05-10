"use client";

import Link from "next/link";
import { universities } from "@/data/universities";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ArrowRight, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopUniversities() {
  const featured = universities.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Our Partners"
            title="Top Universities"
            subtitle="Handpicked NMC-approved medical universities with proven track records and excellent infrastructure."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((uni, i) => (
            <AnimatedSection key={uni.slug} delay={i * 0.08}>
              <Link href={`/universities/${uni.slug}`} className="group block">
                <div className="bg-white rounded-2xl border border-border-light overflow-hidden hover:border-sky/30 transition-all duration-300 hover:-translate-y-1 card-shadow hover:card-shadow-hover">
                  {/* Header */}
                  <div className="h-32 bg-gradient-to-br from-navy/90 to-sky/80 relative flex items-center justify-center p-4">
                    <h3 className="text-lg font-bold text-white text-center leading-tight">
                      {uni.name}
                    </h3>
                    <div className="absolute top-3 right-3 text-2xl">
                      {uni.flagEmoji}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-3">
                      <MapPin className="w-3 h-3" />
                      {uni.country}
                      <span className="mx-1">•</span>
                      <Award className="w-3 h-3" />
                      {uni.ranking}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Tuition Fee</span>
                        <span className="font-semibold text-navy">
                          {uni.tuitionFee}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Duration</span>
                        <span className="font-medium text-text-primary">
                          {uni.duration}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Medium</span>
                        <span className="font-medium text-text-primary">
                          {uni.medium}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border-light">
                      <span className="text-sm font-medium text-sky flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
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
