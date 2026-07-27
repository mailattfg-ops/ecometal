import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import InvestSection from "./home/InvestSection";
import SystemsSection from "./home/SystemsSection";
import VideoSection from "./home/VideoSection";
import ProjectsSection from "./home/ProjectsSection";
import OperatorsSection from "./home/OperatorsSection";
import ComplianceSection from "./home/ComplianceSection";
import FaqSection from "./home/FaqSection";
import ContactSection from "./home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <InvestSection />
      <SystemsSection />
      <VideoSection />
      <ProjectsSection />
      <OperatorsSection />
      <ComplianceSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}





