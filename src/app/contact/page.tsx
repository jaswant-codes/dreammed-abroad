import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG, WHATSAPP_URL } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DreamMed Abroad for MBBS abroad counselling. Call, email, WhatsApp, or visit our office.",
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky text-xs font-semibold uppercase tracking-wider mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            Have questions about MBBS abroad? We&apos;re here to help. Reach out via
            any channel below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {SITE_CONFIG.phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="group block bg-white rounded-2xl p-6 card-shadow hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky/10 transition-colors">
                  <Phone className="w-5 h-5 text-sky" />
                </div>
                <h3 className="font-semibold text-navy">Call Us</h3>
                <p className="text-sm text-text-secondary mt-1">{phone}</p>
              </a>
            ))}

            <a href={`mailto:${SITE_CONFIG.email}`} className="group block bg-white rounded-2xl p-6 card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky/10 transition-colors">
                <Mail className="w-5 h-5 text-sky" />
              </div>
              <h3 className="font-semibold text-navy">Email Us</h3>
              <p className="text-sm text-text-secondary mt-1">{SITE_CONFIG.email}</p>
            </a>

            <Link href={WHATSAPP_URL} target="_blank" className="group block bg-white rounded-2xl p-6 card-shadow hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center mb-4 group-hover:bg-success/10 transition-colors">
                <MessageCircle className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-navy">WhatsApp</h3>
              <p className="text-sm text-text-secondary mt-1">Instant response</p>
            </Link>

            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-sky" />
              </div>
              <h3 className="font-semibold text-navy">Office Address</h3>
              <p className="text-sm text-text-secondary mt-1">{SITE_CONFIG.address}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-sky" />
              </div>
              <h3 className="font-semibold text-navy">Office Hours</h3>
              <p className="text-sm text-text-secondary mt-1">Mon - Sat: 9 AM - 7 PM IST</p>
            </div>
          </div>

          {/* Form + Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 card-shadow">
              <h2 className="text-xl font-bold text-navy mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden card-shadow h-64 sm:h-80">
              <iframe
                src={SITE_CONFIG.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DreamMed Abroad Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
