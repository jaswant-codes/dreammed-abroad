import type { Metadata } from "next";
import { getCountryBySlug } from "@/data/countries";
import { CountryPageContent } from "@/components/country/CountryPageContent";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";

const country = getCountryBySlug("mbbs-in-russia")!;

export const metadata: Metadata = {
  title: country.metaTitle,
  description: country.metaDescription,
  alternates: { canonical: `${SITE_CONFIG.url}/mbbs-in-russia` },
  openGraph: {
    title: country.metaTitle,
    description: country.metaDescription,
    url: `${SITE_CONFIG.url}/mbbs-in-russia`,
  },
};

export default function MBBSInRussia() {
  if (!country) return notFound();
  return <CountryPageContent country={country} />;
}
