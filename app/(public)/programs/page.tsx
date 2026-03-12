import React from "react";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import { ProgramsGrid } from "@/components/programs-grid";
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
      {/* Hero Section - Corporate Professional */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 lg:py-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-200">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              Trusted by 10,000+ Workers
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Health Plans Built for{" "}
              <span className="text-blue-400">Every Budget</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-blue-100/80">
              Comprehensive HMO coverage for you and your family. Choose from
              flexible plans designed to protect what matters most.
            </p>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-200/70">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>50+ Network Hospitals</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instant Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container relative z-20 mx-auto px-4 py-12 lg:py-16">
        {programs.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-center">
            <p className="text-lg text-yellow-800">
              No programs available at this time. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <p className="text-lg font-semibold text-blue-600">
                {programs.length} Plan{programs.length !== 1 ? "s" : ""}{" "}
                Available
              </p>
              <p className="mt-2 text-slate-600">
                Select a plan that fits your family's needs
              </p>
            </div>

            {/* Programs Grid - Stacked Horizontal Cards */}
            <ProgramsGrid programs={programs} />

            {/* Help Section */}
            <HelpSection />
          </>
        )}
      </div>
    </main>
  );
}
