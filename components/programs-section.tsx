"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/content";

export function ProgramsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Programs Intro */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Our Health Care Plans
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose the plan that works best for you. Both plans offer
            comprehensive coverage with flexible options.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-12 shadow-sm transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                {program.title}
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                {program.description}
              </p>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a href={`/programs/${program.id}`}>View Full Plan</a>
              </Button>
            </div>
          ))}
        </div>

        {/* View All Programs Link */}
        <div className="mt-16">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-12 text-center border-2 border-blue-200 shadow-md">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Explore All Our Programs
            </h3>
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              Compare our comprehensive health care plans with detailed
              benefits, coverage amounts, and member rates. Find the perfect
              plan for your needs.
            </p>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold"
            >
              <a href="/programs">View All Plans →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
