import Link from "next/link";
import type { SanityProgram } from "@/types";

interface ComparisonTableProps {
  programs: SanityProgram[];
}

/**
 * ComparisonTable Component
 * Displays side-by-side program comparison
 * - Starting price comparison
 * - Number of benefits
 * - Links to detailed views
 * - Context7: Reusable, focused component
 */
export function ComparisonTable({ programs }: ComparisonTableProps) {
  return (
    <div className="mt-20">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          Quick Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                {programs.map((program) => (
                  <th
                    key={program._id}
                    className="px-4 py-4 text-center text-sm font-semibold text-gray-900"
                  >
                    {program.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  Starting Price
                </td>
                {programs.map((program) => (
                  <td
                    key={program._id}
                    className="px-4 py-4 text-center text-sm font-semibold text-blue-600"
                  >
                    {program.pricing.principal ||
                      program.pricing.annual ||
                      "Custom"}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  Number of Benefits
                </td>
                {programs.map((program) => (
                  <td
                    key={program._id}
                    className="px-4 py-4 text-center text-sm"
                  >
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-700 font-semibold">
                      {program.features.length}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  View Details
                </td>
                {programs.map((program) => (
                  <td key={program._id} className="px-4 py-4 text-center">
                    <Link
                      href={`/programs/${program.slug.current}`}
                      className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Learn More
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
