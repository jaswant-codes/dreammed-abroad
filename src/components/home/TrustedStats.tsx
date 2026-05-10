"use client";

import { STATS } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, GraduationCap, Globe, Award } from "lucide-react";

const icons = [Users, GraduationCap, Globe, Award];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-navy tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TrustedStats() {
  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-sky" />
                  </div>
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm text-text-secondary font-medium">
                    {stat.label}
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
