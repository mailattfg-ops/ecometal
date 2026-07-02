import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import SystemsSection from "./home/SystemsSection";
import ProjectsSection from "./home/ProjectsSection";
import OperatorsSection from "./home/OperatorsSection";
import ContactSection from "./home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <SystemsSection />
      <ProjectsSection />
      <OperatorsSection />
      <ContactSection />
    </div>
  );
}
