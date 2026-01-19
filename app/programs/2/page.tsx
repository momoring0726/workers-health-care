"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Plan7000Details() {
  const benefits = [
    {
      title: "Annual Maximum Benefit (AMB)",
      description:
        "Seventy Thousand Pesos (₱70,000.00) - accumulated cost of availment for one year",
    },
    {
      title: "Room & Board",
      description:
        "Maximum of ₱1,000.00 per day of confinement in a Private Room, includes Emergency Room Fee",
    },
    {
      title: "Professional Fee",
      description:
        "Maximum of ₱1,000.00 per day of confinement on top of PhilHealth",
    },
    {
      title: "Drugs and Medicines",
      description:
        "Maximum coverage of ₱12,000.00 for every single period of confinement",
    },
    {
      title: "Other Hospital Services",
      description:
        "Maximum coverage of ₱8,000.00 for every single period of confinement including in-patient laboratory procedures and medically necessary services",
    },
    {
      title: "Out-Patient Consultation",
      description:
        "Unlimited out-of-hospital consultation services including medical check-up, laboratory, minor surgery, vaccination, and referral to accredited medical specialists",
    },
    {
      title: "Annual Physical Examination",
      description:
        "Blood chemistry (Fasting Blood Sugar, Creatinine, SGPT, Uric Acid), Electrocardiogram, Chest X-Ray, and complete medical history - EXCLUSIVE on top of AMB",
    },
    {
      title: "Maternity Services",
      description:
        "₱10,000.00 for Caesarean Section delivery; ₱5,000.00 for miscarriage; five (5) pre-natal and one (1) post-natal examination",
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
        "Death benefit of ₱5,000.00 for natural cause or ₱10,000.00 for accident - EXCLUSIVE on top of AMB",
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
              className="mb-4 text-white hover:bg-green-700"
            >
              ← Back to Programs
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Plan 7000</h1>
          <p className="text-xl text-green-100">
            Comprehensive coverage for extended benefits and family protection
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Pricing Section */}
        <section className="mb-12 grid gap-8 md:grid-cols-2">
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
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Comprehensive Benefits
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
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
        <section className="mb-12">
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

        {/* Accredited Hospitals Section */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Accredited Hospitals & Clinics
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* General Santos City */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-black-600">
                General Santos City
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• General Santos City Doctors' Hospital</li>
                <li>• St. Elizabeth Hospital</li>
                <li>• SOCSARGEN County Hospital</li>
                <li>• Mindanao Medical Center</li>
                <li>• GSC Medical Specialists Center Corporation</li>
                <li>• Sarangani Bay Specialists Medical Center</li>
                <li>• Dr. Jorge P. Royeca City Hospital</li>
                <li>• R.O. Diagan Cooperative</li>
                <li>• Auguis Clinic</li>
                <li>• Human Index Diagnostics and Wellness Solutions</li>
                <li>• Medzone Diagnostic Center</li>
                <li>• Smile and Shine Dental Clinic</li>
                <li className="font-semibold mt-4">
                  Physicians & Specialists:
                </li>
                <li>• Dr. Fidel P. Peñamante, MD</li>
                <li>• Dr. Darwisa N. Guiomala, MD</li>
                <li>• Dr. Amor Rosete, MD</li>
                <li>• Dr. Analyza M. Galia, MD</li>
                <li>• Dr. Emmanuel Leyva, MD</li>
                <li>• Dr. Ruth Peňaflorida, MD</li>
                <li>• Dr. Rocky Flores Undangan, MD</li>
                <li>• Dr. Norman D. Babar, MD</li>
                <li>• Dr. Krystle Marie Niñora, MD</li>
                <li>• Dr. Mayella Mae L. Japsay, MD</li>
                <li>• Dr. Lovebella B. Culanag, DDM</li>
                <li>• Dr. Charles Brent M. Buendicho, DDM</li>
                <li>• Dr. Lady Joane O. Nacional, DDM</li>
              </ul>
            </div>

            {/* South Cotabato & Sultan Kudarat */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-black-600">
                South Cotabato & Sultan Kudarat
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Allah Valley Medical Specialists Center, Inc.</li>
                <li>• Dr. Arturo P. Pingoy Medical Center</li>
                <li>• SOCOMEDICS Medical Center</li>
                <li>• Tapakan General Hospital</li>
                <li>• Heramil Hospital</li>
                <li>• St. Louise Hospital</li>
                <li>• Tomboc-Salayog Hospital</li>
                <li>• Moorehouse Mission Hospital</li>
                <li>• Lariosa Clinic and Hospital</li>
                <li>• Landero Clinic and Hospital</li>
                <li>• Surallah Community Hospital</li>
                <li>• Surallah Diagnostic Center</li>
                <li>• Koronadal Diagnostic Center</li>
                <li>• St. John Paul Diagnostic and Laboratory</li>
                <li>
                  • Exalt Emmanuel Medical Clinic, Pharmacy and Laboratory
                </li>
                <li>• Health Hub Laboratory and Medical Center</li>
                <li>• Quality Health Diagnostic Laboratory</li>
                <li>• Smile and Shine Dental Clinic</li>
                <li className="font-semibold mt-4">
                  Physicians & Specialists:
                </li>
                <li>• Dr. Vivian C. Suarez, DDM</li>
                <li>• Dr. Virgilio H. Adalin, DDM</li>
                <li>• Dr. Leo Bumatay, DDM</li>
                <li>• Dr. Zenaida Sandig, MD</li>
                <li>• Dr. Elna E. Martinez, MD</li>
                <li>• Dr. Nesie Hope Alim-Romero, MD</li>
                <li>• Dr. Gaudioso I. Amoroso II, MD</li>
                <li>• Dr. Allan D. Dideles, MD</li>
                <li>• Dr. Jesson G. Bendita, MD</li>
                <li>• Dr. Kay Kashmyra T. Chio-Buenaflor, M.D</li>
                <li>• Dr. John Reuel F. Magan, MD</li>
              </ul>
            </div>
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
