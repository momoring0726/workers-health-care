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
  // Determine grid columns and centering based on the number of programs
  const gridClasses =
    programs.length === 1 ? "max-w-md mx-auto" :
      programs.length === 2 ? "grid gap-8 lg:grid-cols-2 lg:gap-10 sm:grid-cols-1 max-w-4xl mx-auto items-stretch" :
        programs.length === 3 ? "grid gap-8 lg:grid-cols-3 md:grid-cols-2 lg:gap-10 sm:grid-cols-1 max-w-6xl mx-auto items-stretch" :
          "grid gap-8 lg:grid-cols-4 md:grid-cols-2 lg:gap-10 sm:grid-cols-1 items-stretch";

  return (
    <div className={gridClasses}>
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
