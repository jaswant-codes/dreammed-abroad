"use client";

import { ADMISSION_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function AdmissionProcess() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="How It Works"
            title="Admission Process"
            subtitle="From your first call to landing at the university — here's your step-by-step journey."
          />
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {ADMISSION_STEPS.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.1}>
              <div className="flex gap-4 sm:gap-6 mb-8 last:mb-0">
                {/* Timeline line + circle */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                    {step.step}
                  </div>
                  {i < ADMISSION_STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-navy/30 to-sky/10 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
