import type { Metadata } from "next";
import { getCountryBySlug } from "@/data/countries";
import { CountryPageContent } from "@/components/country/CountryPageContent";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";

const country = getCountryBySlug("mbbs-in-georgia")!;

export const metadata: Metadata = {
  title: country.metaTitle,
  description: country.metaDescription,
  alternates: { canonical: `${SITE_CONFIG.url}/mbbs-in-georgia` },
  openGraph: {
    title: country.metaTitle,
    description: country.metaDescription,
    url: `${SITE_CONFIG.url}/mbbs-in-georgia`,
  },
};

export default function MBBSInGeorgia() {
  if (!country) return notFound();
  return <CountryPageContent country={country} />;
}
