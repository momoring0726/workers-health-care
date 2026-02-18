import React from "react";
import { Button } from "@/components/ui/button";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

// ISR: Revalidate every 60 seconds for programs
export const revalidate = 60;

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

export async function ProgramsSection() {
  const programs = await getPrograms();

  // Get the highlighted program and other programs
  const highlightedProgram = programs.find((p) => p.highlighted === true);
  const otherPrograms = programs
    .filter((p) => p.highlighted !== true)
    .slice(0, 2);

  return (
    <section className="relative bg-linear-to-b from-white to-blue-50 py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            HEALTH PLANS
          </span>
          <h2 className="mb-4 text-5xl font-bold text-gray-900">
            Plans Built for Your Health
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            From entry-level coverage to comprehensive protection, we have a
            plan designed for every healthcare need and budget
          </p>
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">
              Programs are currently unavailable. Please try again later.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Program (if exists) + Other Programs */}
            <div className="grid gap-8 mb-12">
              {highlightedProgram && (
                <div className="lg:col-span-full">
                  <div className="group relative rounded-2xl border-2 border-blue-300 bg-linear-to-br from-blue-50 via-blue-50 to-blue-100 p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute -top-5 left-8">
                      <span className="inline-block rounded-full bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg">
                        🌟 MOST POPULAR
                      </span>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 mt-6">
                      {/* Left: Title & Description */}
                      <div className="md:col-span-1">
                        <h3 className="mb-3 text-3xl font-bold text-gray-900">
                          {highlightedProgram.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {highlightedProgram.description}
                        </p>
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-600">
                            Starting from
                          </div>
                          <div className="text-3xl font-bold text-blue-600">
                            {highlightedProgram.pricing.principal ||
                              highlightedProgram.pricing.annual ||
                              "Custom"}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Benefits */}
                      <div className="md:col-span-1">
                        <h4 className="mb-4 font-bold text-gray-900">
                          Key Benefits
                        </h4>
                        <div className="space-y-3">
                          {highlightedProgram.features
                            .slice(0, 4)
                            .map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Check className="h-5 w-5 shrink-0 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-700">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          {highlightedProgram.features.length > 4 && (
                            <div className="text-sm font-semibold text-blue-600">
                              +{highlightedProgram.features.length - 4} more
                              benefits
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="md:col-span-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="inline-flex gap-2 mb-6">
                            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
                              {highlightedProgram.features.length} Benefits
                            </span>
                          </div>
                        </div>
                        <Button
                          asChild
                          className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-6 text-base"
                        >
                          <Link
                            href={`/programs/${highlightedProgram.slug.current}`}
                          >
                            Learn More <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Programs - Side by side */}
              {otherPrograms.length > 0 && (
                <div
                  className={`grid gap-8 ${
                    otherPrograms.length === 1
                      ? "lg:col-span-full"
                      : "md:grid-cols-2"
                  }`}
                >
                  {otherPrograms.map((program) => (
                    <div
                      key={program._id}
                      className="group relative rounded-xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="mb-6">
                        <h3 className="mb-3 text-2xl font-bold text-gray-900">
                          {program.title}
                        </h3>
                        <div className="text-2xl font-bold text-blue-600">
                          {program.pricing.principal ||
                            program.pricing.annual ||
                            "Custom"}
                        </div>
                      </div>

                      <p className="mb-6 text-sm text-gray-600">
                        {program.description}
                      </p>

                      <div className="mb-6">
                        <div className="space-y-2">
                          {program.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold"
                      >
                        <Link href={`/programs/${program.slug.current}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View All Programs CTA */}
            <div className="mt-16 text-center">
              <div className="rounded-xl bg-linear-to-r from-blue-600 to-blue-700 p-12 shadow-xl">
                <h3 className="mb-3 text-2xl font-bold text-white">
                  See All Our Plans
                </h3>
                <p className="mb-8 text-blue-100 text-lg">
                  Compare all {programs.length} plans with detailed benefits,
                  coverage amounts, and rates
                </p>
                <Button
                  asChild
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  <Link href="/programs">
                    View All Plans <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
