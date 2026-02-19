import { BackgroundEffects } from "@/components/shared/background-effects";
import { FloatingBubbles } from "@/components/shared/floating-bubbles";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/about/about-section";
import { ServicesSection } from "@/components/services/services-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <main className="relative w-full bg-background">
      <Navbar />
      <BackgroundEffects />
      <FloatingBubbles />
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
