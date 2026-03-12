import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ProgramsSection } from "@/components/programs-section";
import { PptCarousel } from "@/components/ppt-carousel";
import { ContactSectionContent } from "@/components/contact-section-content";
import { NewsFeedContent } from "@/components/news-feed-content";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Workers Health Care | HMO in General Santos City (Gensan), South Cotabato, Sultan Kudarat",
  description:
    "Protect your health and future with the best HMO and health insurance plans for workers in General Santos City (Gensan), South Cotabato, and Sultan Kudarat.",
};

export const revalidate = 604800;

async function getPrograms(): Promise<SanityProgram[]> {
  try {
    const programs = await publicClient.fetch(
      PROGRAMS_QUERY,
      {},
      {
        next: {
          tags: REVALIDATION_CONFIG.programs.tags,
        },
      },
    );
    return programs || [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
}

export default async function Home() {
  const programs = await getPrograms();
  const highlightedProgram = programs.find((p) => p.highlighted === true) || null;

  return (
    <main>
      <Hero highlightedProgram={highlightedProgram} />
      <NewsFeedContent />
      <AboutSection />
      <ProgramsSection />
      <PptCarousel />
      <ContactSectionContent />
    </main>
  );
}
