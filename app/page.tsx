"use client";

import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ProgramsSection } from "@/components/programs-section";
import { PptCarousel } from "@/components/ppt-carousel";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <PptCarousel />
      <ContactSection />
    </main>
  );
}
