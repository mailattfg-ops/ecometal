import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import MarketSection from "./home/MarketSection";
import ProblemSection from "./home/ProblemSection";
import SystemsSection from "./home/SystemsSection";
import PlatformSection from "./home/PlatformSection";
import ProcessSection from "./home/ProcessSection";
import CompareSection from "./home/CompareSection";
import ProjectsSection from "./home/ProjectsSection";
import OperatorsSection from "./home/OperatorsSection";
import InvestSection from "./home/InvestSection";
import SustainSection from "./home/SustainSection";
import ComplianceSection from "./home/ComplianceSection";
import FaqSection from "./home/FaqSection";
import ResourcesSection from "./home/ResourcesSection";
import ContactSection from "./home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <MarketSection />
      <ProblemSection />
      <SystemsSection />
      <PlatformSection />
      <ProcessSection />
      <CompareSection />
      <ProjectsSection />
      <OperatorsSection />
      <InvestSection />
      <SustainSection />
      <ComplianceSection />
      <FaqSection />
      <ResourcesSection />
      <ContactSection />
    </div>
  );
}
