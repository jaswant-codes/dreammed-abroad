"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { CTABanner } from "@/components/home/CTABanner";
import { Target, Heart, Users, Headphones, ShieldCheck, GraduationCap, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Dr. Vishal",
    role: "Founder & CEO",
    line2: "Executive Head – Delhi",
  },
  {
    name: "Dr. Dinesh",
    role: "RML Hospital, Delhi",
    line2: "Executive Head – Ganaur, Sonipat, Haryana",
  },
  {
    name: "Dr. Sukhdev Pooniya",
    role: "RBTB Hospital, New Delhi",
    line2: "Executive Head – Balotra, Jodhpur & Barmer, Rajasthan",
  },
  {
    name: "Dr. Avni",
    role: "Sanjay Gandhi Hospital, Delhi",
    line2: "Executive Head – Ahmedabad, Gujarat",
  },
  {
    name: "Dr. Ajay Singh",
    role: "Senior Student Counsellor",
    line2: "Providing personalised counselling and career guidance to students.",
  },
  {
    name: "Dr. Prince",
    role: "Documentation & Visa Specialist",
    line2: "Specialised in international student documentation and visa support.",
  },
  {
    name: "Dr. Sakeel Mohammad",
    role: "Safdarjung Hospital, New Delhi",
    line2: "Executive Head – Bharatpur & Alwar, Rajasthan",
  },
  {
    name: "Dr. Ravi Pooniya",
    role: "Executive Head",
    line2: "Churu & Jhunjhunu, Rajasthan",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Your Trusted Partner in
            <br />
            <span className="text-sky-light">Medical Education</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            DreamMed Abroad is a premium international medical education consultancy helping
            Indian students pursue MBBS at world-class universities.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-sky-50/50 rounded-2xl p-8 border border-sky/10">
              <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-sky" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed">
                To make quality medical education accessible and affordable for every
                deserving Indian student. We believe that financial constraints should
                never be a barrier to becoming a doctor, and we work tirelessly to
                connect students with the best NMC-approved universities abroad.
              </p>
            </div>
            <div className="bg-sky-50/50 rounded-2xl p-8 border border-sky/10">
              <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-sky" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-3">Our Vision</h2>
              <p className="text-text-secondary leading-relaxed">
                To become India&apos;s most trusted medical education consultancy,
                known for transparency, integrity, and genuine care for students.
                We envision a world where every aspiring doctor has the opportunity
                to receive world-class education regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">What Sets Us Apart</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "10+ Years Experience", desc: "Over a decade of guiding students to top medical universities" },
              { icon: Globe, title: "5+ Countries", desc: "Strong university partnerships across Russia, Kazakhstan, Georgia & more" },
              { icon: ShieldCheck, title: "NMC Approved Only", desc: "We only recommend NMC and WHO recognized universities" },
              { icon: Award, title: "1500+ Success Stories", desc: "Thousands of students successfully placed and studying abroad" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 card-shadow text-center hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-sky" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
                Student Support
              </span>
              <h2 className="text-3xl font-bold text-navy mb-4">
                With You at Every Step
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                From the moment you contact us to the day you graduate, DreamMed Abroad
                provides comprehensive support. Our team ensures that you never feel lost
                or alone in a foreign country.
              </p>
              <ul className="space-y-3">
                {[
                  "Free initial counselling and university recommendation",
                  "Complete documentation and admission processing",
                  "Visa application support with high success rate",
                  "Pre-departure orientation and travel guidance",
                  "Airport pickup and university settling-in support",
                  "Ongoing support throughout your MBBS program",
                  "FMGE/NExT exam preparation guidance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center shrink-0 mt-0.5 text-success text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Dedicated Team", value: "20+" },
                { icon: Headphones, label: "Support Hours", value: "24/7" },
                { icon: Globe, label: "Countries", value: "5+" },
                { icon: GraduationCap, label: "Students Placed", value: "1500+" },
              ].map((stat, i) => (
                <div key={i} className="bg-sky-50/50 rounded-2xl p-6 text-center border border-sky/10">
                  <stat.icon className="w-8 h-8 text-sky mx-auto mb-2" />
                  <p className="text-2xl font-bold text-navy">{stat.value}</p>
                  <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team — Meet the Experts */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionVariants}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">Meet the Experts</h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-lg">
              Our experienced team of medical professionals and education experts is committed to
              guiding students toward successful medical careers abroad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name + i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                className="bg-white rounded-[18px] border border-border-light p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(10,36,99,0.10)] flex flex-col h-full"
              >
                {/* Decorative top accent */}
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-sky to-navy mx-auto mb-5" />

                <h3 className="font-bold text-lg text-navy leading-snug">{member.name}</h3>
                <p className="text-sky font-semibold text-sm mt-2">{member.role}</p>
                <p className="text-text-secondary text-sm mt-3 leading-relaxed flex-1">{member.line2}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
