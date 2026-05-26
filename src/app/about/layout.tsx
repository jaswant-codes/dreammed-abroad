import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us — Who We Are",
  description:
    "Learn about DreamMed Abroad — a premium MBBS abroad consultancy with 10+ years of experience helping Indian students achieve their medical career dreams.",
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
