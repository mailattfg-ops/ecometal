import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import MarketSection from "./home/MarketSection";
import ProblemSection from "./home/ProblemSection";
import PlatformSection from "./home/PlatformSection";
import OperatorsSection from "./home/OperatorsSection";
import InvestSection from "./home/InvestSection";
import SustainSection from "./home/SustainSection";
import ComplianceSection from "./home/ComplianceSection";
import FaqSection from "./home/FaqSection";
import ContactSection from "./home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <MarketSection />
      <ProblemSection />
      <PlatformSection />
      <OperatorsSection />
      <InvestSection />
      <SustainSection />
      <ComplianceSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
