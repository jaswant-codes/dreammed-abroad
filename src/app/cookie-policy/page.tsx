import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_CONFIG } from "@/lib/constants";

const title = "Cookie Policy";
const description =
  "Learn how DreamMed Abroad uses cookies, local storage, analytics, Meta Pixel, Google Analytics, and performance tracking technologies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_CONFIG.url}/cookie-policy` },
  openGraph: {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    url: `${SITE_CONFIG.url}/cookie-policy`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title={title}
      description={description}
      updated="June 4, 2026"
      sections={[
        {
          title: "What Cookies Are",
          body:
            "Cookies are small files stored on your browser or device when you visit a website. Similar technologies such as local storage, pixels, tags, and analytics scripts may also be used to remember preferences, understand website usage, and improve performance.",
        },
        {
          title: "How We Use Cookies and Local Storage",
          items: [
            "To operate website features and remember temporary preferences, such as whether a homepage inquiry popup was recently shown.",
            "To understand page performance, traffic sources, user interactions, and popular content.",
            "To improve website speed, usability, forms, navigation, and counselling follow-up experience.",
            "To measure marketing performance when advertising or analytics tools are configured.",
          ],
        },
        {
          title: "Analytics and Performance Tracking",
          body:
            "DreamMed Abroad may use analytics tools, including Vercel Analytics and similar performance tracking tools, to understand aggregate website activity. These tools help us evaluate page visits, performance, device type, referral sources, and user interaction patterns.",
        },
        {
          title: "Google Analytics",
          body:
            "If Google Analytics is enabled, it may use cookies or similar identifiers to collect information about website usage, pages visited, session duration, device details, referral source, and approximate location. This information helps improve website content and service quality.",
        },
        {
          title: "Meta Pixel",
          body:
            "If Meta Pixel is enabled, it may help measure ad performance, understand visitor actions, and support remarketing on Meta platforms such as Facebook and Instagram. Meta may process this information according to its own policies.",
        },
        {
          title: "Managing Cookies",
          body:
            "You can control, block, or delete cookies through your browser settings. Some features may not work as intended if cookies, local storage, or scripts are disabled. You can also use browser privacy controls and platform-level ad settings to manage tracking preferences.",
        },
        {
          title: "Updates",
          body:
            "We may update this Cookie Policy when website features, analytics tools, advertising pixels, or legal requirements change. Continued use of the website means you accept the updated policy.",
        },
      ]}
    />
  );
}
