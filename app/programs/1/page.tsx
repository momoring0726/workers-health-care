"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Plan300Details() {
  const hospitalRates = {
    principal: { monthly: "₱300.00", annual: "₱3,600.00" },
    spouse: { monthly: "₱290.00", annual: "₱3,480.00" },
    child: { monthly: "₱240.00", annual: "₱2,880.00" },
    parent: { monthly: "₱350.00", annual: "₱4,200.00" },
    sibling: { monthly: "₱290.00", annual: "₱3,480.00" },
  };

  const benefits = [
    {
      title: "Annual Maximum Benefit (AMB)",
      description:
        "Sixty Thousand Pesos (₱60,000.00) - accumulated cost of availment for one year",
    },
    {
      title: "Room & Board",
      description:
        "Maximum of ₱600.00 per day of confinement on top of PhilHealth",
    },
    {
      title: "Professional Fee",
      description:
        "Maximum of ₱600.00 per day of confinement on top of PhilHealth",
    },
    {
      title: "Drugs and Medicines",
      description:
        "Maximum coverage of ₱6,000.00 for every single period of confinement",
    },
    {
      title: "Other Hospital Services",
      description:
        "Maximum coverage of ₱4,000.00 for every single period of confinement",
    },
    {
      title: "Out-Patient Consultation",
      description:
        "Unlimited out-of-hospital consultation services including medical check-up, laboratory, minor surgery, vaccination, and referral to accredited medical specialists",
    },
    {
      title: "Physical Examination/Laboratory",
      description:
        "Chest X-Ray, Complete Blood Count, Urinalysis, Fecalysis, Electrocardiogram, Uric Acid, Fasting Blood Sugar, Pap Smear (35+), and complete medical history",
    },
    {
      title: "Maternity Services",
      description:
        "₱10,000.00 for caesarian section; ₱5,000.00 for miscarriage; five (5) pre-natal and one (1) post-natal examination",
    },
    {
      title: "Out-Patient Dental Care",
      description:
        "Four (4) dental extractions per year, one (1) annual prophylaxis, two (2) temporary fillings, and treatment of oral pain",
    },
    {
      title: "Emergency Care Services",
      description:
        "80% reimbursement of hospital bills in non-accredited hospitals, subject to AMB limit",
    },
    {
      title: "Mortuary Assistance",
      description:
        "Death benefit of ₱5,000.00 for natural cause or ₱10,000.00 for accident",
    },
  ];

  const eligibilitySchedule = [
    {
      period: "Start of effectivity to 3rd month",
      benefit: "₱0.00 (Waiting period)",
    },
    {
      period: "4th to 6th month",
      benefit: "₱6,000.00",
    },
    {
      period: "7th to 9th month",
      benefit: "₱9,000.00",
    },
    {
      period: "10th to 11th month",
      benefit: "₱12,000.00",
    },
    {
      period: "12th month",
      benefit: "₱15,000.00",
    },
    {
      period: "First year and continuous",
      benefit: "₱60,000.00 (Full AMB)",
    },
  ];

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
          <h1 className="text-4xl font-bold mb-2">Plan 300</h1>
          <p className="text-xl text-blue-100">
            Basic coverage plan for essential health protection
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
              Membership Rates
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Principal Member</p>
                <p className="text-gray-600">
                  {hospitalRates.principal.monthly} / month
                </p>
                <p className="text-sm text-gray-500">
                  {hospitalRates.principal.annual} / year
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Dependent Spouse</p>
                <p className="text-gray-600">
                  {hospitalRates.spouse.monthly} / month
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Dependent Child</p>
                <p className="text-gray-600">
                  {hospitalRates.child.monthly} / month
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Dependent Parent</p>
                <p className="text-gray-600">
                  {hospitalRates.parent.monthly} / month
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dependent Sibling</p>
                <p className="text-gray-600">
                  {hospitalRates.sibling.monthly} / month
                </p>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Key Highlights
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">Annual Maximum</p>
                  <p className="text-sm text-gray-600">₱60,000.00</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">Room & Board</p>
                  <p className="text-sm text-gray-600">
                    ₱600/day (Private Room)
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Drugs & Medicines
                  </p>
                  <p className="text-sm text-gray-600">₱6,000/confinement</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Unlimited Consultations
                  </p>
                  <p className="text-sm text-gray-600">Out-patient services</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="mb-12">
          <details className="group rounded-lg border border-gray-200 bg-white p-0 shadow-sm overflow-hidden">
            <summary className="px-6 py-4 cursor-pointer text-3xl font-bold text-gray-900">
              Detailed Benefits
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((benefit, index) => (
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

        {/* Eligibility Schedule */}
        <section id="eligibility" className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Eligibility Schedule & Benefit Build-up
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      Membership Period
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      Available Benefit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {eligibilitySchedule.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-3 text-gray-700">{row.period}</td>
                      <td className="px-6 py-3 font-semibold text-blue-600">
                        {row.benefit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            *Benefits increase progressively during the first year of membership
          </p>
        </section>

        {/* Accredited Hospitals Section (replaced with CTA) */}
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
        <section className="rounded-lg bg-blue-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mb-6 text-gray-600">
            Join thousands of satisfied members with Plan 300
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/#contact">Contact Us Today</a>
          </Button>
        </section>
      </div>
    </main>
  );
}
