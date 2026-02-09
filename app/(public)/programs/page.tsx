"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/content";

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Our Health Care Plans
          </h1>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your health care needs
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Plan Header */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                  {program.title}
                </h2>
                <div className="text-lg font-semibold text-blue-600">
                  {program.id === 1 ? (
                    <div>
                      <p>Principal: {program.pricing.principal}</p>
                      <p className="text-sm text-gray-600">
                        + Family rates available
                      </p>
                    </div>
                  ) : (
                    <p>{program.pricing.annual}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-gray-600">{program.description}</p>

              {/* Features List */}
              <div className="mb-8 flex-grow">
                <h3 className="mb-4 font-semibold text-gray-900">
                  What's Included:
                </h3>
                <ul className="space-y-2 pl-0 list-none">
                  {program.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 leading-6"
                    >
                      <span className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <Button
                asChild
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <a href={`/programs/${program.id}`}>View Full Details</a>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Hospitals Directory CTA */}
      <div className="container mx-auto px-4 pb-16">
        <div className="rounded-lg bg-white p-8 shadow-md flex flex-col items-center text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Looking for accredited hospitals or clinics?
          </h2>
          <p className="mb-6 text-gray-600">
            View the full directory of our accredited hospitals, clinics, and
            doctors for your area.
          </p>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <a href="/hospitals">View all our accredited hospitals/clinics</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
