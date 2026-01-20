"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Plan7000Details() {
  const benefits = [
    {
      title: "Annual Maximum Benefit (AMB)",
      description:
        "Total or accumulated cost of availment by a member for a period of one (1) year in the amount of SEVENTY THOUSAND PESOS (₱70,000.00), to include the cost for the basic hospital benefits such as Room and Board, Professional Fee, Drugs and Medicines, Other Hospital Services; Preventive Healthcare Benefits; and Other Benefits and Assistance.",
    },
    {
      title: "Room & Board",
      description:
        "Maximum of ₱1,000.00 per day of confinement in a Private Room on top of PhilHealth coverage up to AMB limit. The coverage includes Emergency Room Fee while awaiting for room confinement.",
    },
    {
      title: "Professional Fee",
      description:
        "Maximum of ₱1,000.00 per day of confinement on top of PhilHealth coverage up to AMB limit.",
    },
    {
      title: "Drugs & Medicines",
      description:
        "Maximum coverage of ₱12,000.00 for every single period of confinement up to AMB limit.",
    },
    {
      title: "Other Hospital Services",
      description:
        "Maximum coverage of ₱8,000.00 for every single period of confinement up to AMB limit. The services include in-patient laboratory procedures, tests, and examinations; and such other hospital charges and fees which are medically necessary.",
    },
    {
      title: "Out-Patient Consultation and/or Referral to Medical Specialist",
      description:
        "Unlimited out-of-hospital consultation services to members which includes medical check-up, laboratory, minor surgery, treatment of minor illness or injury, vaccination but excluding the prescribed vaccines, referral to accredited medical specialists, health education or counseling on diet, exercise, and family planning.",
    },
    {
      title: "Annual Physical Examination / Laboratory",
      description:
        "Blood chemistry for Fasting Blood Sugar, Creatinine, SGPT, and Uric Acid; Electrocardiogram (ECG), Chest X-Ray, and taking of complete medical history. These clinical procedures are exclusive, or on top, of the AMB of a member.",
    },
    {
      title: "Maternity Services",
      description:
        "Financial assistance of ₱10,000.00 for Caesarean Section delivery; ₱5,000.00 for miscarriage case; five (5) pre-natal examinations, and one (1) post-natal examination for any type of delivery.",
    },
    {
      title: "Out-Patient Dental Care Services",
      description:
        "Includes four (4) dental extractions per year, one (1) simple annual prophylaxis, two (2) temporary fillings, and treatment of oral pain, lesion and burn.",
    },
    {
      title:
        "Emergency Care Services in Non-Accredited Hospitals and/or Physicians",
      description:
        "Reimbursement or immediate cash settlement to health facility of eighty percent (80%) of the total hospital bills, to include room and board, professional fee, drugs and medicines, and other hospital services, subject to AMB limit and Program Description.",
    },
    {
      title: "Mortuary Assistance",
      description:
        "Death benefit of ₱5,000.00 in case death is due to natural cause or ₱10,000.00 if death is due to accident. This benefit is exclusive, or on top, of the AMB of a member.",
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
