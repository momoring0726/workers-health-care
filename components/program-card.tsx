import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import type { SanityProgram } from "@/types";

interface ProgramCardProps {
  program: SanityProgram;
  isHighlighted: boolean;
}

interface PricingTier {
  label: string;
  key: keyof SanityProgram["pricing"];
}

const PRICING_TIERS: PricingTier[] = [
  { label: "Principal", key: "principal" },
  { label: "Spouse", key: "spouse" },
  { label: "Child", key: "child" },
  { label: "Parent", key: "parent" },
  { label: "Sibling", key: "sibling" },
];

export function ProgramCard({ program, isHighlighted }: ProgramCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
        isHighlighted
          ? "border-blue-500 bg-white shadow-lg shadow-blue-900/10"
          : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 ${isHighlighted ? "bg-blue-500" : "bg-slate-200"}`} />

      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Plan Info */}
        <div className="flex-1 p-6 lg:p-8 lg:border-r lg:border-slate-100">
          {/* Popular Badge */}
          {isHighlighted && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-700">Most Popular</span>
            </div>
          )}

          <h2 className={`text-2xl font-bold ${isHighlighted ? "text-blue-900" : "text-slate-900"}`}>
            {program.title}
          </h2>
          <p className="mt-2 text-slate-600">{program.description}</p>

          {/* Key Features Preview */}
          <div className="mt-6 space-y-2">
            {program.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className={`mt-0.5 h-4 w-4 ${isHighlighted ? "text-blue-500" : "text-slate-400"}`} />
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
            {program.features.length > 3 && (
              <p className={`text-sm font-medium ${isHighlighted ? "text-blue-600" : "text-slate-500"}`}>
                + {program.features.length - 3} more benefits
              </p>
            )}
          </div>
        </div>

        {/* Center Section - Family Pricing */}
        <div className="flex-1 border-t border-slate-100 bg-slate-50/50 p-6 lg:border-t-0 lg:p-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Monthly Pricing
          </h3>
          <div className="space-y-3">
            {PRICING_TIERS.map((tier) => {
              const price = program.pricing[tier.key];
              return (
                <div key={tier.key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{tier.label}</span>
                  <span className={`font-semibold ${isHighlighted ? "text-blue-700" : "text-slate-900"}`}>
                    {price || "—"}
                  </span>
                </div>
              );
            })}
          </div>
          
          {program.pricing.annual && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Annual (Principal)</span>
                <span className={`font-bold ${isHighlighted ? "text-blue-700" : "text-slate-900"}`}>
                  {program.pricing.annual}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section - CTA */}
        <div className="flex flex-col justify-center border-t border-slate-100 p-6 lg:border-t-0 lg:border-l lg:p-8 lg:text-center">
          <Button
            asChild
            className={`w-full lg:w-auto ${isHighlighted
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
          >
            <Link href={`/programs/${program.slug.current}`}>
              View Plan Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
