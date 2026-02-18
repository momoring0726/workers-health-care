import { ProgramCard } from "./program-card";
import type { SanityProgram } from "@/types";

interface ProgramsGridProps {
  programs: SanityProgram[];
}

/**
 * ProgramsGrid Component
 * Renders responsive grid of program cards
 * - Responsive layout: 1 column mobile, 2 mobile-tablet, 4 desktop
 * - Maps through programs and renders ProgramCard for each
 * - Context7: Focused on layout composition
 */
export function ProgramsGrid({ programs }: ProgramsGridProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {programs.map((program) => {
        const isHighlighted = program.highlighted === true;
        return (
          <ProgramCard
            key={program._id}
            program={program}
            isHighlighted={isHighlighted}
          />
        );
      })}
    </div>
  );
}
