import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
  default: "MBBS Abroad Consultancy in India | DreamMed Abroad",
  template: `%s | DreamMed Abroad`,
},
  description:
  "DreamMed Abroad is a trusted MBBS abroad consultancy in India helping students get admission to NMC-approved medical universities in Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, and Georgia with complete admission and visa support.",
  keywords: [
  "MBBS Abroad",
  "Study MBBS Abroad",
  "MBBS Abroad Consultancy",
  "MBBS Abroad Consultancy India",
  "MBBS Admission Abroad",
  "Study MBBS in Russia",
  "Study MBBS in Kazakhstan",
  "Study MBBS in Kyrgyzstan",
  "Study MBBS in Uzbekistan",
  "Study MBBS in Georgia",
  "NMC Approved Medical Universities",
  "Medical Education Abroad",
  "Affordable MBBS Abroad",
  "DreamMed Abroad",
  "NEET MBBS Abroad",
  "MBBS Admission 2026",
],
 openGraph: {
  type: "website",
  locale: "en_IN",
  url: SITE_CONFIG.url,
  siteName: "DreamMed Abroad",
  title: "MBBS Abroad Consultancy in India | DreamMed Abroad",
  description:
    "Study MBBS Abroad with DreamMed Abroad. Get admission to NMC-approved medical universities in Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, and Georgia.",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "DreamMed Abroad",
    },
  ],
},
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Study MBBS Abroad`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head><meta name="google-site-verification" content="NfN4uOKuxeUoANMDnqXbeB1KtcXH2upzIACQ2kRnQhQ" /></head>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
