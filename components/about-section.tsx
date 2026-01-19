"use client";

import React from "react";
import { CheckCircle2, Users, Heart, Target } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Comprehensive Care",
      description:
        "We provide coverage that protects you and your family with comprehensive health and wellness benefits.",
    },
    {
      icon: Users,
      title: "Worker Focused",
      description:
        "Our plans are designed with workers in mind, understanding the unique healthcare needs of the workforce.",
    },
    {
      icon: Target,
      title: "Affordable Plans",
      description:
        "Quality healthcare shouldn't break the bank. We offer competitive rates and flexible payment options.",
    },
    {
      icon: CheckCircle2,
      title: "Trusted Partner",
      description:
        "With years of experience, we've earned the trust of thousands of workers across the country.",
    },
  ];

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
