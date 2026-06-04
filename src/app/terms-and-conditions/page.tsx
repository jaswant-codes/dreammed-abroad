import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

const title = "Terms & Conditions";
const description =
  "Review the terms for using DreamMed Abroad's MBBS abroad counselling, university selection, admission assistance, documentation, visa guidance, and pre-departure support services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/terms-and-conditions` },
  openGraph: {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      updated="June 4, 2026"
      sections={[
        {
          title: "Nature of Services",
          body:
            "DreamMed Abroad provides educational consultancy services for MBBS abroad aspirants, including counselling, university selection, admission assistance, documentation support, visa guidance, and pre-departure support for destinations such as Uzbekistan, Kyrgyzstan, Kazakhstan, Russia, Georgia, and other approved destinations.",
        },
        {
          title: "No Guarantee of Outcomes",
          items: [
            "DreamMed Abroad does not guarantee university admission, because final admission decisions are made by universities and their authorized admission departments.",
            "DreamMed Abroad does not guarantee visa approval, because final visa decisions are made by embassies, consulates, immigration departments, and regulatory authorities.",
            "DreamMed Abroad does not guarantee scholarship approval, because scholarship decisions depend on university rules, eligibility, availability, and authority discretion.",
            "DreamMed Abroad does not guarantee FMGE, NExT, licensing exam, internship, registration, or future career success.",
          ],
        },
        {
          title: "User Responsibilities",
          items: [
            "You agree to provide true, complete, current, and verifiable information during counselling, admission, documentation, visa, and travel support.",
            "You are responsible for checking eligibility, NMC guidelines, university recognition, visa rules, and regulatory requirements before making final decisions.",
            "You must submit documents on time and cooperate with verification, translation, notarization, apostille, medical examination, embassy, and university processes when applicable.",
          ],
        },
        {
          title: "Accuracy of Information",
          body:
            "Website content, fees, university details, rankings, eligibility criteria, timelines, and destination information are provided for general guidance and may change without notice. Students should verify final details with official university, embassy, government, and regulatory sources before making payments or decisions.",
        },
        {
          title: "Payments and Service Fees",
          body:
            "Any counselling, service, documentation, processing, or partner fee will be communicated before payment wherever applicable. Payment of a fee does not guarantee admission, visa approval, scholarship approval, or examination success.",
        },
        {
          title: "Website Usage Rules",
          items: [
            "You may not misuse the website, submit false inquiries, attempt unauthorized access, copy content unlawfully, interfere with website operations, or use the site for fraudulent activity.",
            "You may not upload malicious files, scripts, spam, or content that violates law or third-party rights.",
          ],
        },
        {
          title: "Intellectual Property",
          body:
            "All website content, branding, text, design, graphics, page layouts, logos, and materials belong to DreamMed Abroad or its licensors unless otherwise stated. You may not reproduce, modify, distribute, or commercially use content without written permission.",
        },
        {
          title: "Limitation of Liability",
          body:
            "DreamMed Abroad will not be liable for losses arising from university decisions, visa refusals, regulatory changes, inaccurate information provided by users, third-party delays, currency changes, travel restrictions, examination outcomes, or events beyond reasonable control.",
        },
      ]}
    />
  );
}
