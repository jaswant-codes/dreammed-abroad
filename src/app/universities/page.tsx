import type { Metadata } from "next";
import Link from "next/link";
import { universities } from "@/data/universities";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, Award, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Top NMC-Approved Universities for MBBS Abroad",
  description:
    "Explore top NMC-approved medical universities in Russia, Kazakhstan, Georgia, Kyrgyzstan, and Uzbekistan. Compare fees, rankings, and more.",
  alternates: { canonical: `${SITE_CONFIG.url}/universities` },
};

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative pb-12 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Partner Universities
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Top Medical Universities
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            All universities are NMC and WHO approved with proven track records of
            producing successful doctors.
          </p>
        </div>
      </section>

      {/* University Grid */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <Link
                key={uni.slug}
                href={`/universities/${uni.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl border border-border-light overflow-hidden hover:border-sky/30 transition-all duration-300 hover:-translate-y-1 card-shadow hover:card-shadow-hover h-full">
                  <div className="h-32 bg-gradient-to-br from-navy/90 to-sky/80 relative flex items-center justify-center p-4">
                    <h3 className="text-lg font-bold text-white text-center leading-tight">
                      {uni.name}
                    </h3>
                    <div className="absolute top-3 right-3 text-2xl">{uni.flagEmoji}</div>
                  </div>
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
                        <span className="font-semibold text-navy">{uni.tuitionFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Hostel + Mess</span>
                        <span className="font-medium text-text-primary">{uni.hostelFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Duration</span>
                        <span className="font-medium text-text-primary">{uni.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Est.</span>
                        <span className="font-medium text-text-primary">{uni.established}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-light">
                      <span className="text-sm font-medium text-sky flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
