import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle, Phone, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply Now — Free MBBS Abroad Counselling",
  description:
    "Apply for free MBBS abroad counselling with DreamMed Abroad. Get personalized university recommendations, fee comparison, and admission guidance.",
  alternates: { canonical: `${SITE_CONFIG.url}/apply` },
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
              Free Counselling
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Start Your MBBS Abroad Journey Today
            </h1>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Fill in your details and our expert counsellor will call you within
              24 hours with personalized university recommendations based on your
              NEET score, budget, and preferences.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-sky" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-sm">100% Confidential</h3>
                  <p className="text-xs text-text-secondary">
                    Your data is secure and will never be shared with third parties.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-sky" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-sm">Expert Callback</h3>
                  <p className="text-xs text-text-secondary">
                    Get a call from our senior counsellor within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-sm">Instant WhatsApp</h3>
                  <p className="text-xs text-text-secondary">
                    Need immediate help?{" "}
                    <Link href={WHATSAPP_URL} target="_blank" className="text-success font-medium underline">
                      Chat with us on WhatsApp
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow">
            <h2 className="text-xl font-bold text-navy mb-6">
              Fill Your Application
            </h2>
            <LeadForm source="apply-page" />
          </div>
        </div>
      </div>
    </div>
  );
}
