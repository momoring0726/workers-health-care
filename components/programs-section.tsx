import React from "react";
import { Button } from "@/components/ui/button";
import { publicClient } from "@/sanity/lib/client-public";
import { PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { SanityProgram } from "@/types";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

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

export async function ProgramsSection() {
  const programs = await getPrograms();

  // Get the highlighted program and other programs
  const highlightedProgram = programs.find((p) => p.highlighted === true);
  const otherPrograms = programs
    .filter((p) => p.highlighted !== true)
    .slice(0, 2);

  return (
    <section className="relative bg-slate-50 py-32 overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[20%] -top-32 h-[800px] w-[800px] rounded-full bg-indigo-50 opacity-50 blur-[120px]"></div>
        <div className="absolute -left-[10%] top-1/2 h-[600px] w-[600px] rounded-full bg-blue-50 opacity-50 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-indigo-600"></span>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Health Plans
            </span>
            <span className="h-px w-8 bg-indigo-600"></span>
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Plans Built for Your Health
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
            From entry-level coverage to comprehensive protection, we have a
            premium plan designed for every healthcare need and budget.
          </p>
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-white/50 p-12 text-center backdrop-blur-sm">
            <p className="text-lg text-slate-500">
              Programs are currently unavailable. Please check back later.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10">
              {/* Featured Program */}
              {highlightedProgram && (
                <div className="w-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-indigo-500/10 bg-slate-950 p-1 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>

                    <div className="relative z-10 flex h-full flex-col justify-between rounded-[22px] bg-slate-950/50 p-8 sm:p-10 backdrop-blur-xl">
                      <div>
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md">
                          <span className="mr-2 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                          <span className="text-xs font-bold tracking-wide text-indigo-300 uppercase">Premium Select</span>
                        </div>

                        <div className="grid gap-10 md:grid-cols-2">
                          <div>
                            <h3 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                              {highlightedProgram.title}
                            </h3>
                            <p className="mb-8 text-base leading-relaxed text-slate-400">
                              {highlightedProgram.description}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-extrabold text-indigo-300">
                                {highlightedProgram.pricing.principal ||
                                  highlightedProgram.pricing.annual ||
                                  "Custom"}
                              </span>
                              <span className="text-sm font-medium text-slate-500">/ starting</span>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
                              Signature Benefits
                            </h4>
                            <ul className="mb-6 space-y-4">
                              {highlightedProgram.features
                                .slice(0, 4)
                                .map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                                      <Check className="h-3 w-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm text-slate-300">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              {highlightedProgram.features.length > 4 && (
                                <li className="text-sm font-medium text-indigo-400 pl-8">
                                  + {highlightedProgram.features.length - 4} additional benefits
                                </li>
                              )}
                            </ul>

                            <Button
                              asChild
                              className="group/btn mt-auto w-full rounded-xl bg-indigo-500 py-6 text-base font-semibold text-white transition-all hover:bg-indigo-400 shadow-lg shadow-indigo-500/25"
                            >
                              <Link href={`/programs/${highlightedProgram.slug.current}`}>
                                Explore Premium Plan <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Programs Side-by-Side */}
              {otherPrograms.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2">
                  {otherPrograms.map((program) => (
                    <div
                      key={program._id}
                      className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/50 sm:p-8"
                    >
                      <div className="mb-4">
                        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
                          {program.title}
                        </h3>
                        <div className="text-2xl font-extrabold text-indigo-600">
                          {program.pricing.principal ||
                            program.pricing.annual ||
                            "Custom"}
                        </div>
                      </div>

                      <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
                        {program.description}
                      </p>

                      <ul className="mb-6 space-y-3 flex-grow">
                        {program.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </div>
                            <span className="line-clamp-1 text-sm text-slate-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                        {program.features.length > 3 && (
                          <li className="text-sm font-medium text-indigo-600 pl-8 pt-1">
                            + {program.features.length - 3} additional benefits
                          </li>
                        )}
                      </ul>

                      <Button
                        asChild
                        variant="outline"
                        className="group/link mt-auto w-full rounded-xl border-slate-200 text-slate-900 hover:bg-slate-50"
                      >
                        <Link href={`/programs/${program.slug.current}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4 text-slate-400 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-slate-900" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View All Programs CTA */}
            <div className="mt-16 text-center">
              <Button
                asChild
                variant="ghost"
                className="group/all inline-flex items-center gap-2 rounded-full px-8 py-6 text-base font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all"
              >
                <Link href="/programs">
                  Compare all {programs.length} plans
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/all:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
