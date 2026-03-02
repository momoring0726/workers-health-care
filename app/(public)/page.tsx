import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ProgramsSection } from "@/components/programs-section";
import { PptCarousel } from "@/components/ppt-carousel";
import { ContactSection } from "@/components/contact-section";
import { NewsFeed } from "@/components/news-feed";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workers Health Care | Best HMO in General Santos City & South Cotabato",
  description: "Protect your health and future with the best HMO and health insurance plans for workers in General Santos City (Gensan), South Cotabato, and Sultan Kudarat.",
};

// ISR: Revalidate every hour for homepage
export const revalidate = 604800;

export default function Home() {
  return (
    <main>
      <Hero />
      <NewsFeed />
      <AboutSection />
      <ProgramsSection />
      <PptCarousel />
      <ContactSection />
    </main>
  );
}
