import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { publicClient } from "@/sanity/lib/client-public";
import {
  PROGRAM_BY_SLUG_QUERY,
  PROGRAM_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityProgramDetail } from "@/types";
import { Check, Shield, Heart, Zap, Users, ChevronDown } from "lucide-react";
import { REVALIDATION_CONFIG } from "@/lib/cache-config";

// ISR: Revalidate every 60 seconds for program details
export const revalidate = 604800;

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const slugs = await publicClient.fetch(
      PROGRAM_SLUGS_QUERY,
      {},
      {
        next: {
          tags: REVALIDATION_CONFIG.programs.tags,
        },
      },
    );
    return slugs.map((item: { slug: string }) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getProgram(slug: string): Promise<SanityProgramDetail | null> {
  try {
    const program = await publicClient.fetch(
      PROGRAM_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          tags: REVALIDATION_CONFIG.programs.tags,
        },
      },
    );
    return program;
  } catch (error) {
    console.error("Error fetching program:", error);
    return null;
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return {
      title: "Program Not Found | Workers Health Care",
    };
  }

  return {
    title: `${program.title} | Workers Health Care`,
    description: program.description,
    openGraph: {
      title: `${program.title} | Workers Health Care`,
      description: program.description,
      type: "website",
    },
  };
}

// Accordion Item Component
function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border-2 border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-200"
    >
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 md:px-6 md:py-5 font-semibold text-gray-900 list-none">
        <span className="text-base md:text-lg pr-4">{title}</span>
        <ChevronDown className="h-5 w-5 transform flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
      </summary>
      <div className="border-t border-gray-100 px-5 py-4 md:px-6 md:py-5 text-gray-700">
        {children}
      </div>
    </details>
  );
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-12 md:py-20">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        
        <div className="container relative mx-auto max-w-4xl">
          <Link href="/programs" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Programs</span>
          </Link>

          <h1 className="mb-3 text-3xl md:text-5xl font-bold text-white leading-tight">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            {program.description}
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold"
            >
              <Link href="/#contact">Contact Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 text-base font-semibold"
            >
              <a href="#details">View Details</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12 pb-24 md:pb-12">
        {/* Quick Stats */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Comprehensive",
              desc: "Full coverage",
            },
            {
              icon: Check,
              title: "Easy to Join",
              desc: "Quick enrollment",
            },
            {
              icon: Heart,
              title: "Quality Care",
              desc: "Premium network",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-xl bg-white p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <Icon className="mb-3 h-9 w-9 text-blue-600 mx-auto" />
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Accordion Sections */}
        <div id="details" className="space-y-4">
          {/* Overview Section */}
          <AccordionItem title="✓ What's Included" defaultOpen={true}>
            <div className="grid gap-3 sm:grid-cols-2">
              {program.features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </AccordionItem>

          {/* Pricing Section */}
          <AccordionItem title="💰 Membership Rates">
            {program.hospitalizationRates &&
              program.hospitalizationRates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {program.hospitalizationRates.map((rate, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                  >
                    <p className="mb-2 text-sm font-semibold text-gray-600 uppercase">
                      {rate.category}
                    </p>
                    {rate.monthly && (
                      <p className="text-2xl font-bold text-blue-600">
                        {rate.monthly}
                        <span className="text-xs text-gray-600 font-normal">
                          {" "}
                          /mo
                        </span>
                      </p>
                    )}
                    {rate.annual && (
                      <p className="text-lg font-semibold text-blue-600">
                        {rate.annual}
                        <span className="text-xs text-gray-600 font-normal">
                          {" "}
                          /yr
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(program.pricing).map(([key, value]) =>
                  value ? (
                    <div
                      key={key}
                      className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                    >
                      <p className="mb-2 text-sm font-semibold text-gray-600 uppercase">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {value}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </AccordionItem>

          {/* Detailed Benefits Section */}
          {program.benefits && program.benefits.length > 0 && (
            <AccordionItem title="⚡ Detailed Benefits">
              <div className="space-y-4">
                {program.benefits.map((benefit, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-bold text-gray-900">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionItem>
          )}

          {/* Hospitalization Rates Section */}
          {program.hospitalizationRates &&
            program.hospitalizationRates.length > 0 && (
              <AccordionItem title="📊 Coverage by Member Type">
                <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
                  <table className="w-full text-sm min-w-[280px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-3 py-3 text-left font-bold text-gray-900">
                          Member Type
                        </th>
                        <th className="px-3 py-3 text-left font-bold text-gray-900">
                          Monthly
                        </th>
                        <th className="px-3 py-3 text-left font-bold text-blue-600">
                          Annual
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {program.hospitalizationRates.map((rate, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3 font-semibold text-gray-900">
                            {rate.category}
                          </td>
                          <td className="px-3 py-3 text-gray-700">
                            {rate.monthly || "—"}
                          </td>
                          <td className="px-3 py-3 font-semibold text-blue-600">
                            {rate.annual || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
            )}

          {/* Eligibility Schedule Section */}
          {program.eligibilitySchedule &&
            program.eligibilitySchedule.length > 0 && (
              <AccordionItem title="📅 Benefit Build-up Schedule">
                <div className="space-y-3">
                  {program.eligibilitySchedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-lg bg-blue-50 p-3"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-semibold text-gray-900">
                          {schedule.period}
                        </p>
                        <p className="text-sm font-bold text-blue-600">
                          {schedule.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}

          {/* Network Section */}
          <AccordionItem title="🏥 Accredited Network">
            <div className="space-y-4">
              <p className="text-gray-700">
                Access to a wide network of accredited hospitals, clinics, and
                healthcare professionals nationwide.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/hospitals">View Our Network</Link>
              </Button>
            </div>
          </AccordionItem>
        </div>

        {/* CTA Section */}
        <section className="mt-10 md:mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:p-10 text-center text-white relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <h2 className="mb-3 text-2xl md:text-3xl font-bold">Ready to Join?</h2>
            <p className="mb-6 text-blue-100 max-w-md mx-auto">
              Start your journey to better healthcare with {program.title} today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-semibold">
                <Link href="/#contact">Contact Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3 text-base font-semibold"
              >
                <Link href="/programs">Compare Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-40 flex gap-3 shadow-lg">
        <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 py-3">
          <Link href="/#contact">Contact Now</Link>
        </Button>
        <Button asChild variant="outline" className="px-4 py-3 border-gray-300">
          <Link href="/programs">All Plans</Link>
        </Button>
      </div>
    </main>
  );
}
