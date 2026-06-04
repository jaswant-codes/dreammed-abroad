import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

const title = "Disclaimer";
const description =
  "Important disclaimer about DreamMed Abroad's role as an educational consultancy for MBBS abroad admission guidance and support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/disclaimer` },
  openGraph: {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    url: `${SITE_CONFIG.url}/disclaimer`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      updated="June 4, 2026"
      sections={[
        {
          title: "Educational Consultancy",
          body:
            "DreamMed Abroad is an educational consultancy that provides guidance and support for students interested in MBBS abroad. Our services include counselling, university selection, admission assistance, documentation support, visa guidance, and pre-departure support.",
        },
        {
          title: "What DreamMed Abroad Is Not",
          items: [
            "DreamMed Abroad is not a university, college, medical institution, embassy, consulate, government authority, or regulatory body.",
            "DreamMed Abroad does not issue degrees, diplomas, mark sheets, admission letters, visas, licenses, registrations, or government approvals.",
            "DreamMed Abroad does not directly grant admissions, scholarships, visas, medical registrations, or examination results.",
          ],
        },
        {
          title: "No Guarantees",
          items: [
            "DreamMed Abroad does not guarantee university admission.",
            "DreamMed Abroad does not guarantee visa approval.",
            "DreamMed Abroad does not guarantee scholarship approval.",
            "DreamMed Abroad does not guarantee FMGE, NExT, licensing exam, academic, internship, or career results.",
          ],
        },
        {
          title: "Final Decision Makers",
          body:
            "Final decisions belong to universities, admission departments, embassies, consulates, immigration authorities, regulatory bodies, medical councils, examination authorities, and other official institutions. DreamMed Abroad can assist with guidance and documentation but cannot control these decisions.",
        },
        {
          title: "Information Accuracy",
          body:
            "We try to keep website information accurate and current, but university fees, eligibility rules, recognition status, visa procedures, admission timelines, and regulations may change. Students should verify important details through official sources before making final decisions.",
        },
        {
          title: "Student Responsibility",
          body:
            "Students and parents are responsible for reviewing official guidelines, checking eligibility, providing accurate documents, meeting deadlines, and making informed decisions based on their academic, financial, and professional goals.",
        },
      ]}
    />
  );
}
