import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

const title = "Privacy Policy";
const description =
  "Read how DreamMed Abroad collects, uses, protects, and shares student information for MBBS abroad counselling, admission assistance, and communication.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/privacy-policy` },
  openGraph: {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    url: `${SITE_CONFIG.url}/privacy-policy`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      updated="June 4, 2026"
      sections={[
        {
          title: "Overview",
          body:
            "DreamMed Abroad is an MBBS abroad admission consultancy. This Privacy Policy explains how we handle information shared through our website, forms, calls, WhatsApp, email, counselling sessions, and admission support processes.",
        },
        {
          title: "Information We Collect",
          items: [
            "Name, phone number, email address, city, state, and other contact details.",
            "Academic details, including class 10 and 12 information, NEET score, preferred country, university preferences, budget range, and admission requirements.",
            "Uploaded or shared documents such as passports, mark sheets, NEET scorecards, photographs, identity documents, medical records, and other admission or visa-related files when required.",
            "Messages, counselling notes, inquiry details, source page, and communication preferences submitted through contact, popup, inquiry, counselling, registration, and application forms.",
            "Technical information such as browser, device, page usage, analytics events, referral source, and approximate location where analytics tools are enabled.",
          ],
        },
        {
          title: "Why We Collect Information",
          items: [
            "To provide MBBS abroad counselling and evaluate suitable country, university, and program options.",
            "To support university applications, admission documentation, visa guidance, and pre-departure coordination.",
            "To communicate with students and parents through phone, email, WhatsApp, SMS, or similar channels.",
            "To send relevant updates, reminders, offers, webinars, and marketing communication related to MBBS abroad services, subject to applicable law and opt-out choices.",
            "To improve website performance, user experience, service quality, and operational follow-up.",
          ],
        },
        {
          title: "Data Protection Measures",
          body:
            "We use reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, misuse, alteration, or disclosure. Access is limited to team members, service providers, and partners who need the information for counselling, admission, documentation, visa support, or legal compliance.",
        },
        {
          title: "Third-Party Sharing",
          items: [
            "We may share relevant student information with partner universities, authorized representatives, documentation providers, visa support partners, travel or accommodation coordinators, and technology vendors when required to deliver requested services.",
            "We may use tools such as Google Apps Script, analytics providers, hosting providers, communication platforms, and form handling systems to process or store inquiry data.",
            "We may disclose information when required by law, regulation, court order, government authority, university authority, embassy, or other lawful process.",
            "We do not sell student personal information as a standalone commercial product.",
          ],
        },
        {
          title: "Student Responsibilities",
          body:
            "Students and parents must provide accurate, current, and complete information. Incorrect or incomplete information may affect counselling, admission processing, document verification, visa processing, or university communication.",
        },
        {
          title: "Retention and Updates",
          body:
            "We retain information for as long as needed to provide services, maintain records, comply with legal obligations, resolve disputes, and improve operations. You may contact us to request correction or deletion of your information, subject to legal, contractual, and operational requirements.",
        },
        {
          title: "Contact",
          body:
            "For privacy questions or data requests, contact DreamMed Abroad at contact.dreammed@gmail.com or visit our office in Sikar, Rajasthan.",
        },
      ]}
    />
  );
}
