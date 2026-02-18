import React from "react";
import { aboutValues } from "@/lib/content";

export function AboutSection() {
  const values = aboutValues;

  return (
    <section id="about" className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* About Intro */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            About Workers Health Care
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We're committed to making quality healthcare accessible and
            affordable for every worker. For over a decade, we've been helping
            individuals and families protect what matters most.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="rounded-lg bg-white border border-gray-200 shadow-md p-8 transition-transform hover:scale-105 hover:shadow-lg"
              >
                <Icon className="mb-4 h-10 w-10 text-blue-600" />
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
