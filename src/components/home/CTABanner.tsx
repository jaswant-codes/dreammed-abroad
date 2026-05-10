"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.3),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            Start Your Journey Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to Begin Your{" "}
            <span className="text-sky-light">Medical Career?</span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Get free expert counselling, compare universities, and secure your
            admission in a top NMC-approved university. Your dream of becoming a
            doctor starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-white text-navy hover:bg-white/90 rounded-full px-8 font-semibold text-base shadow-lg group"
              >
                Apply Now — It&apos;s Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 font-semibold text-base bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
