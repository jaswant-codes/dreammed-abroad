import type { Metadata } from "next";
import { getCountryBySlug } from "@/data/countries";
import { CountryPageContent } from "@/components/country/CountryPageContent";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";

const country = getCountryBySlug("mbbs-in-kazakhstan")!;

export const metadata: Metadata = {
  title: country.metaTitle,
  description: country.metaDescription,
  alternates: { canonical: `${SITE_CONFIG.url}/mbbs-in-kazakhstan` },
  openGraph: {
    title: country.metaTitle,
    description: country.metaDescription,
    url: `${SITE_CONFIG.url}/mbbs-in-kazakhstan`,
  },
};

export default function MBBSInKazakhstan() {
  if (!country) return notFound();
  return <CountryPageContent country={country} />;
}
