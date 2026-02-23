import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import type { SanityProgram } from "@/types";

interface ProgramCardProps {
  program: SanityProgram;
  isHighlighted: boolean;
}

/**
 * ProgramCard Component
 * Displays a single program as a card in the grid
 * - Shows program title, pricing, description
 * - Features 4 sample benefits with expand option
 * - Highlights popular plans with badge and styling
 * - Context7: Focused, single-responsibility component
 */
export function ProgramCard({ program, isHighlighted }: ProgramCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${isHighlighted
          ? "border-0 bg-slate-900 shadow-2xl shadow-indigo-900/20 ring-1 ring-indigo-500/30"
          : "border border-slate-200 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50"
        }`}
    >
      {/* Background glow effects for highlighted card */}
      {isHighlighted && (
        <>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px] transition-opacity duration-500 group-hover:bg-indigo-500/30"></div>
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-[60px]"></div>
        </>
      )}

      {/* Popular Badge */}
      {isHighlighted && (
        <div className="absolute left-0 top-0 z-10 w-full px-6 pt-6">
          <div className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 backdrop-blur-md">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
            <span className="text-xs font-bold tracking-wide text-indigo-300 uppercase">Most Popular</span>
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className={`relative z-10 px-8 pb-6 ${isHighlighted ? "pt-16" : "pt-8"}`}>
        <h2 className={`text-2xl font-bold tracking-tight ${isHighlighted ? "text-white" : "text-slate-900"}`}>
          {program.title}
        </h2>
        <div className="mt-4 flex items-baseline gap-2">
          <div className={`text-3xl font-extrabold tracking-tight ${isHighlighted ? "text-indigo-300" : "text-indigo-600"}`}>
            {program.pricing.principal || program.pricing.annual || "Custom"}
          </div>
          <div className={`text-sm font-medium ${isHighlighted ? "text-slate-400" : "text-slate-500"}`}>
            / starting
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={` relative z-10 flex flex-grow flex-col px-8 pb-8 ${isHighlighted ? "text-slate-300" : "text-slate-600"}`}>
        <p className="mb-8 text-sm leading-relaxed opacity-90">
          {program.description}
        </p>

        {/* Features List */}
        <div className="mb-8 space-y-4">
          <div className={`text-xs font-semibold uppercase tracking-wider ${isHighlighted ? "text-slate-400" : "text-slate-500"}`}>
            What's included
          </div>
          <ul className="space-y-3">
            {program.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isHighlighted ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className={`text-sm ${isHighlighted ? "text-slate-300" : "text-slate-700"}`}>{feature}</span>
              </li>
            ))}
            {program.features.length > 4 && (
              <li className={`text-sm font-medium ${isHighlighted ? "text-indigo-400" : "text-indigo-600"}`}>
                + {program.features.length - 4} additional benefits
              </li>
            )}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-2">
          <Button
            asChild
            className={`w-full group/btn relative overflow-hidden rounded-xl font-semibold transition-all duration-300 ${isHighlighted
                ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/25"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
          >
            <Link href={`/programs/${program.slug.current}`} className="flex items-center justify-center gap-2">
              <span>View Full Details</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
