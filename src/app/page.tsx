import { HeroSection } from "@/components/home/HeroSection";
import { TrustedStats } from "@/components/home/TrustedStats";
import { CountriesSection } from "@/components/home/CountriesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AdmissionProcess } from "@/components/home/AdmissionProcess";
import { TopUniversities } from "@/components/home/TopUniversities";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedStats />
      <CountriesSection />
      <WhyChooseUs />
      <AdmissionProcess />
      <TopUniversities />
      <Testimonials />
      <FAQSection />
      <CTABanner />
    </>
  );
}
