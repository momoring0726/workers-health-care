"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      title: "Plan 300",
      description:
        "Basic coverage plan designed for essential health protection with affordable premiums.",
      features: [
        "Annual Maximum Benefit (AMB): ₱60,000.00",
        "Room & Board: ₱600/day",
        "Professional Fee: ₱600/day",
        "Drugs and Medicines: ₱6,000/confinement",
        "Out-Patient Consultation & Specialist Referral",
        "Annual Physical Examination",
        "Maternity Services",
        "Out-Patient Dental Care",
        "Emergency Care Services",
        "Mortuary Assistance",
      ],
      pricing: {
        principal: "₱300/month",
        spouse: "₱290/month",
        child: "₱240/month",
        parent: "₱350/month",
        sibling: "₱290/month",
      },
    },
    {
      id: 2,
      title: "Plan 7000",
      description:
        "Comprehensive coverage plan offering extended benefits and enhanced protection for you and your family.",
      features: [
        "Annual Maximum Benefit (AMB): ₱70,000.00",
        "Room & Board: ₱1,000/day (Private Room)",
        "Professional Fee: ₱1,000/day",
        "Drugs and Medicines: ₱12,000/confinement",
        "Other Hospital Services: ₱8,000/confinement",
        "Unlimited Out-Patient Consultation & Specialist Referral",
        "Compulsory Annual Physical Examination",
        "Maternity Services",
        "Out-Patient Dental Care",
        "Emergency Care Services",
        "Mortuary Assistance",
      ],
      pricing: {
        annual: "₱7,000/year",
      },
    },
  ];

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
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="mr-3 mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                      {feature}
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
    </main>
  );
}
