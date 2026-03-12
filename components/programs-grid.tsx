import { ProgramCard } from "./program-card";
import type { SanityProgram } from "@/types";

interface ProgramsGridProps {
  programs: SanityProgram[];
}

export function ProgramsGrid({ programs }: ProgramsGridProps) {
  return (
    <div className="space-y-6">
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
