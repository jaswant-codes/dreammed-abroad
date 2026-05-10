"use client";

import { generalFaqs } from "@/data/faqs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  faqs?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Get answers to the most common questions about studying MBBS abroad.",
}: FAQSectionProps) {
  const faqData = faqs || generalFaqs;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading badge="FAQs" title={title} subtitle={subtitle} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border-light rounded-xl px-5 data-[state=open]:border-sky/30 data-[state=open]:bg-sky-50/30 transition-all"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-navy hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
