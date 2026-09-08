import HeroSection from "./home/HeroSection";
import { getHeroSettings } from "@/lib/heroSettings.server";
import { getOperatorsSectionData } from "@/lib/operators.server";
import { getProjects } from "@/lib/projects.server";
import AboutSection from "./home/AboutSection";
import InvestSection from "./home/InvestSection";
import SystemsSection from "./home/SystemsSection";
import VideoSection from "./home/VideoSection";
import ProjectsSection from "./home/ProjectsSection";
import OperatorsSection from "./home/OperatorsSection";
import ComplianceSection from "./home/ComplianceSection";
import FaqSection from "./home/FaqSection";
import ContactSection from "./home/ContactSection";

// Regenerate the cached HTML at most once a minute so the hero video URL is
// already in the markup (no client round-trip) while admin edits still land fast.
export const revalidate = 60;

export default async function HomePage() {
  const [heroSettings, operatorsData, projects] = await Promise.all([
    getHeroSettings(),
    getOperatorsSectionData(),
    getProjects(),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection initialSettings={heroSettings} />
      <AboutSection />
      <InvestSection />
      <SystemsSection />
      <VideoSection />
      <ProjectsSection initialProjects={projects} />
      <OperatorsSection initialData={operatorsData} />
      <ComplianceSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}





