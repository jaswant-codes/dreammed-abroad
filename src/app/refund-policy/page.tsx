import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

const title = "Refund Policy";
const description =
  "Understand DreamMed Abroad's refund policy for counselling fees, service fees, documentation fees, admission assistance, and processing timelines.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/refund-policy` },
  openGraph: {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    url: `${SITE_CONFIG.url}/refund-policy`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      updated="June 4, 2026"
      sections={[
        {
          title: "Overview",
          body:
            "This Refund Policy applies to fees paid to DreamMed Abroad for MBBS abroad counselling, university selection, admission assistance, documentation support, visa guidance, pre-departure support, and related consultancy services.",
        },
        {
          title: "Counselling Fee Policy",
          body:
            "If a counselling fee is charged, it may be non-refundable once a counselling session, profile evaluation, university shortlisting, or personalized guidance has been delivered. Free counselling services do not create any refund obligation.",
        },
        {
          title: "Service Fee Policy",
          body:
            "Service fees for admission assistance, coordination, follow-up, and support may be non-refundable once work has started, documents have been reviewed, university communication has begun, or a service milestone has been completed.",
        },
        {
          title: "Documentation Fee Policy",
          body:
            "Documentation, translation, notarization, apostille, courier, application, embassy, university, payment gateway, and third-party charges are generally non-refundable after they have been paid to or initiated with the relevant vendor, authority, or institution.",
        },
        {
          title: "Refund Eligibility",
          items: [
            "Refund requests must be submitted in writing with payment proof, student details, service details, and reason for the request.",
            "Approved refunds, if any, will be limited to the refundable portion of fees paid directly to DreamMed Abroad after deducting work already completed, third-party charges, taxes, bank charges, and payment gateway fees.",
            "No refund will be available for delays, refusals, or decisions caused by universities, embassies, government authorities, regulatory bodies, incomplete documents, false information, missed deadlines, or student withdrawal after work has begun.",
          ],
        },
        {
          title: "Processing Timelines",
          body:
            "Refund requests are usually reviewed within 7 to 15 working days after receiving complete details. Approved refunds may take an additional 7 to 21 working days to reflect depending on the bank, payment gateway, or payment method.",
        },
        {
          title: "Professional Refund Disclaimer",
          body:
            "Payment of any fee does not guarantee admission, visa approval, scholarship approval, travel clearance, regulatory approval, or examination success. Refund decisions are made according to the service stage, written agreement if any, third-party costs, and applicable law.",
        },
      ]}
    />
  );
}
