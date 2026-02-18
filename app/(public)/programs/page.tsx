import React from "react";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import { ProgramsGrid } from "@/components/programs-grid";
import { ComparisonTable } from "@/components/comparison-table";
import { HelpSection } from "@/components/help-section";

export const revalidate = 60; // ISR revalidation for faster updates

async function getPrograms(): Promise<SanityProgram[]> {
  try {
    const programs = await publicClient.fetch(PROGRAMS_QUERY);
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
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="border-b border-blue-100 bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Our Health Care Plans
            </h1>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your health care needs. All plans
              include 24/7 customer support and access to our network of
              accredited hospitals.
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container mx-auto px-4 py-20">
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
