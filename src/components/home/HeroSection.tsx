"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle, ArrowRight, Sparkles, Globe2, Stethoscope, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <Stethoscope className="w-8 h-8 text-white/30" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[20%] w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <Globe2 className="w-7 h-7 text-white/30" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[5%] w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <BookOpen className="w-6 h-6 text-white/30" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] left-[15%] w-12 h-12 rounded-full bg-sky/10 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white/30" />
        </motion.div>

        {/* Background circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Trusted by 1500+ students across India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            Your Gateway to a{" "}
            <span className="text-sky-light">Global Medical</span>{" "}
            Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl"
          >
            Expert counselling for MBBS admission in top NMC-approved
            universities across Russia, Kazakhstan, Georgia & more. Affordable
            fees, end-to-end guidance, and a future you deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-white text-navy hover:bg-white/90 rounded-full px-8 font-semibold text-base shadow-lg hover:shadow-xl transition-all group"
              >
                Apply Now
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
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-12"
          >
            {["NMC Approved", "WHO Listed", "10+ Years", "1500+ Students"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-medium"
                >
                  ✓ {badge}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
