"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { programDetails } from "@/lib/content";

export default function Plan7000Details() {
  const { benefits } = programDetails[2];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/programs">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-blue-700"
            >
              ← Back to Programs
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Plan 7000</h1>
          <p className="text-xl text-blue-100">
            Comprehensive coverage for broader protection
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Quick-jump bar */}
        <div className="mb-6">
          <nav className="flex gap-3 overflow-x-auto py-2">
            <a
              href="#pricing"
              className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
            >
              Pricing
            </a>
            <a
              href="#benefits"
              className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
            >
              Benefits
            </a>
            <a
              href="#eligibility"
              className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
            >
              Eligibility
            </a>
            <a
              href="#hospitals"
              className="whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
            >
              Hospitals
            </a>
          </nav>
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Annual Rate
            </h2>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-blue-600">₱7,000.00</p>
              <p className="text-gray-600">Per Year / Per Member</p>
              <p className="text-sm text-gray-500 mt-4">
                Affordable comprehensive coverage for the whole family with one
                annual payment
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Premium Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">Annual Maximum</p>
                  <p className="text-sm text-gray-600">₱70,000.00</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">Room & Board</p>
                  <p className="text-sm text-gray-600">
                    ₱1,000/day (Private Room)
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Drugs & Medicines
                  </p>
                  <p className="text-sm text-gray-600">₱12,000/confinement</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Unlimited Consultations
                  </p>
                  <p className="text-sm text-gray-600">Full medical support</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="mb-12">
          <details className="group rounded-lg border border-gray-200 bg-white p-0 shadow-sm overflow-hidden">
            <summary className="px-6 py-4 cursor-pointer text-3xl font-bold text-gray-900">
              Comprehensive Benefits
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>

        {/* Comparison Highlight */}
        <section className="mb-12 rounded-lg bg-green-50 p-8 border border-green-200">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Why Choose Plan 7000?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">
                Higher Coverage Limits
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ ₱10,000 higher annual maximum benefit</li>
                <li>✓ ₱400/day more for room and board</li>
                <li>✓ ₱6,000 more for drugs and medicines</li>
                <li>✓ ₱4,000 more for hospital services</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">
                Exclusive Benefits
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Advanced blood chemistry tests</li>
                <li>✓ Comprehensive cardiac evaluation</li>
                <li>✓ Complete health screening</li>
                <li>✓ Enhanced death benefits</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Network Section */}
        <section id="network" className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Accredited Healthcare Network
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-gray-700">
              Plan 7000 members have access to a comprehensive network of
              accredited hospitals, clinics, and specialists in:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  General Santos City
                </h3>
                <p className="text-sm text-gray-600">
                  25+ accredited hospitals and medical facilities
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  South Cotabato & Sultan Kudarat
                </h3>
                <p className="text-sm text-gray-600">
                  29+ accredited hospitals and medical facilities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accredited Hospitals Section (CTA) */}
        <section id="hospitals" className="mb-12">
          <div className="rounded-lg bg-white p-8 shadow-md text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Accredited Hospitals & Clinics
            </h2>
            <p className="mb-6 text-gray-600">
              We maintain a full directory of accredited hospitals, clinics, and
              doctors. View the complete list to find providers in your area.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/hospitals">View all our accredited hospitals/clinics</a>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg bg-blue-50 p-8 text-center border border-blue-200">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Upgrade Your Health Protection
          </h2>
          <p className="mb-6 text-gray-600">
            Join Plan 7000 and enjoy comprehensive healthcare coverage for your
            whole family
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/#contact">Enroll Now</a>
          </Button>
        </section>
      </div>
    </main>
  );
}
