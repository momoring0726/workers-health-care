import React from "react";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import { ProgramsGrid } from "@/components/programs-grid";
import { ComparisonTable } from "@/components/comparison-table";
import { HelpSection } from "@/components/help-section";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "HMO plans | General Santos City (Gensan), South Cotabato, Sultan Kudarat",
  description:
    "Explore comprehensive health insurance programs and plans for workers in General Santos City (Gensan), South Cotabato, and Sultan Kudarat.",
};

// ISR: Revalidate every 60 seconds for programs
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

/**
 * ProgramsPage
 * Displays all available health care plans
 * - Server component fetching from Sanity CMS
 * - Responsive grid layout with program cards
 * - Side-by-side comparison table
 * - Support/enrollment information
 * Context7: Clean composition with extracted sub-components
 */
export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Premium Dark Aesthetic */}
      <div className="relative overflow-hidden bg-slate-950 py-24 pb-32 lg:py-32 lg:pb-40">
        {/* Abstract Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[100px]"></div>

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              2026 Health coverage options
            </span>
            <h1 className="mb-6 bg-linear-to-b from-white to-slate-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Elevate Your Healthcare
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl">
              Discover unparalleled protection with our expertly crafted health
              plans. Premium coverage, 24/7 concierge support, and access to
              world-class medical networks.
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container relative z-20 mx-auto px-4 py-16">
        {programs.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-center">
            <p className="text-lg text-yellow-800">
              No programs available at this time. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-lg font-semibold text-blue-600">
                {programs.length} Plan{programs.length !== 1 ? "s" : ""}{" "}
                Available
              </p>
            </div>

            {/* Programs Grid - Responsive */}
            <ProgramsGrid programs={programs} />

            {/* Comparison Table */}
            <ComparisonTable programs={programs} />

            {/* Help Section */}
            <HelpSection />
          </>
        )}
      </div>
    </main>
  );
}
