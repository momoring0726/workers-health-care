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
      className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
        isHighlighted
          ? "border-blue-400 bg-linear-to-br from-blue-50 to-blue-100 shadow-xl ring-2 ring-blue-200"
          : "border-gray-200 bg-white shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Popular Badge */}
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="border-b border-gray-100 p-6 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">{program.title}</h2>
        <div className="mt-3">
          <div className="text-sm text-gray-600">Starting from</div>
          <div className="text-2xl font-bold text-blue-600">
            {program.pricing.principal ||
              program.pricing.annual ||
              "Custom Pricing"}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="mb-6 text-sm text-gray-600 leading-relaxed">
          {program.description}
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {program.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
          {program.features.length > 4 && (
            <div className="text-sm text-blue-600 font-medium">
              +{program.features.length - 4} more benefits
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto border-t border-gray-100 p-6 pt-6">
        <Button
          asChild
          className={`w-full font-semibold transition-all ${
            isHighlighted
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <Link href={`/programs/${program.slug.current}`}>
            View Full Details →
          </Link>
        </Button>
      </div>
    </div>
  );
}
