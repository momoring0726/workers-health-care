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
        {/* Pricing Section */}
        <section className="mb-12 grid gap-8 md:grid-cols-2">
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
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Detailed Benefits
          </h2>
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
        </section>

        {/* Eligibility Schedule */}
        <section className="mb-12">
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

        {/* Accredited Hospitals Section */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Accredited Hospitals & Clinics
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* South Cotabato & Sultan Kudarat */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold">
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

            {/* General Santos City */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold">General Santos City</h3>
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
