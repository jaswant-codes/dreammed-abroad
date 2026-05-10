"use client";

import { WHY_CHOOSE_US } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  ShieldCheck,
  IndianRupee,
  Plane,
  Building,
  Route,
  UserCheck,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  IndianRupee,
  Plane,
  Building,
  Route,
  UserCheck,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Why DreamMed Abroad"
            title="Why Choose Us"
            subtitle="We don't just help you get admitted — we ensure your entire journey is smooth, transparent, and successful."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <AnimatedSection key={feature.title} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl border border-border-light bg-white hover:border-sky/30 hover:bg-sky-50/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-sky/10 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-sky" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
