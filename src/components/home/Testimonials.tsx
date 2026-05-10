"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const next = () => setCurrent((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            badge="Success Stories"
            title="What Our Students Say"
            subtitle="Hear from students and parents who trusted us with their medical education journey."
          />
        </AnimatedSection>

        {/* Carousel Controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-text-primary disabled:hover:border-border-light"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-text-primary disabled:hover:border-border-light"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * (100 / itemsPerView + 2)}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-[calc(100%)] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] shrink-0"
              >
                <div className="bg-white rounded-2xl p-6 card-shadow h-full flex flex-col">
                  <Quote className="w-8 h-8 text-sky/20 mb-3" />
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-border-light">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                        {t.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-navy">{t.name}</p>
                        <p className="text-xs text-text-secondary">
                          {t.university}, {t.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 mt-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${
                            j < t.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-text-secondary ml-1">
                        {t.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                current === i ? "bg-navy w-6" : "bg-navy/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
