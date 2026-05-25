"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";

// Dynamic loading for client-only components
import GlobalCanvas from "@/components/hero/GlobalCanvas";
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const EducationSection = dynamic(() => import("@/components/sections/EducationSection"));
const CertificationsSection = dynamic(() => import("@/components/sections/CertificationsSection"));
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <main>
      <GlobalCanvas />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
