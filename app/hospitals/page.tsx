"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Entry = {
  name: string;
  type: "Hospital" | "Clinic" | "Doctor";
  location?: string;
  notes?: string;
};

const DATA: Entry[] = [
  {
    name: "Allah Valley Medical Specialists Center, Inc.",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Dr. Arturo P. Pingoy Medical Center",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "SOCOMEDICS Medical Center",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Tapakan General Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Heramil Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "St. Louise Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Tomboc-Salayog Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Moorehouse Mission Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Lariosa Clinic and Hospital",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Landero Clinic and Hospital",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Surallah Community Hospital",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Surallah Diagnostic Center",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Koronadal Diagnostic Center",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "St. John Paul Diagnostic and Laboratory",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Exalt Emmanuel Medical Clinic, Pharmacy and Laboratory",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Health Hub Laboratory and Medical Center",
    type: "Hospital",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Quality Health Diagnostic Laboratory",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },
  {
    name: "Smile and Shine Dental Clinic",
    type: "Clinic",
    location: "South Cotabato & Sultan Kudarat",
  },

  {
    name: "General Santos City Doctors' Hospital",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "St. Elizabeth Hospital",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "SOCSARGEN County Hospital",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "Mindanao Medical Center",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "GSC Medical Specialists Center Corporation",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "Sarangani Bay Specialists Medical Center",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "R.O. Diagan Cooperative",
    type: "Clinic",
    location: "General Santos City",
  },
  { name: "Auguis Clinic", type: "Clinic", location: "General Santos City" },
  {
    name: "Human Index Diagnostics and Wellness Solutions",
    type: "Clinic",
    location: "General Santos City",
  },
  {
    name: "Medzone Diagnostic Center",
    type: "Clinic",
    location: "General Santos City",
  },

  // Additional providers found in program pages
  {
    name: "Dr. Jorge P. Royeca City Hospital",
    type: "Hospital",
    location: "General Santos City",
  },
  {
    name: "Dr. Gaudioso I. Amoroso II, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Allan D. Dideles, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Jesson G. Bendita, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Kay Kashmyra T. Chio-Buenaflor, M.D",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. John Reuel F. Magan, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Rocky Flores Undangan, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Norman D. Babar, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Krystle Marie Niñora, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Mayella Mae L. Japsay, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Lovebella B. Culanag, DDM",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Charles Brent M. Buendicho, DDM",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Lady Joane O. Nacional, DDM",
    type: "Doctor",
    location: "General Santos City",
  },

  // Selected physicians from lists
  {
    name: "Dr. Vivian C. Suarez, DDM",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Virgilio H. Adalin, DDM",
    type: "Doctor",
    location: "South Cotabato",
  },
  { name: "Dr. Leo Bumatay, DDM", type: "Doctor", location: "South Cotabato" },
  {
    name: "Dr. Zenaida Sandig, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Elna E. Martinez, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Nesie Hope Alim-Romero, MD",
    type: "Doctor",
    location: "South Cotabato",
  },
  {
    name: "Dr. Fidel P. Peñamante, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Darwisa N. Guiomala, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Amor Rosete, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Analyza M. Galia, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Emmanuel Leyva, MD",
    type: "Doctor",
    location: "General Santos City",
  },
  {
    name: "Dr. Ruth Peňaflorida, MD",
    type: "Doctor",
    location: "General Santos City",
  },
];

export default function HospitalsIndex() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | Entry["type"]>("All");
  const [locationFilter, setLocationFilter] = useState<"All" | string>("All");
  // Only expose two high-level location filters to users
  const locations = useMemo(
    () => ["All", "General Santos City", "South Cotabato & Sultan Kudarat"],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = DATA.filter((d) => {
      if (typeFilter !== "All" && d.type !== typeFilter) return false;
      if (locationFilter !== "All") {
        const loc = (d.location || "").toLowerCase();
        if (locationFilter === "General Santos City") {
          if (!loc.includes("general santos city")) return false;
        } else if (locationFilter === "South Cotabato & Sultan Kudarat") {
          if (
            !(
              loc.includes("south cotabato") ||
              loc.includes("sultan kudarat") ||
              loc.includes("&")
            )
          )
            return false;
        }
      }
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        (d.location || "").toLowerCase().includes(q) ||
        (d.notes || "").toLowerCase().includes(q)
      );
    });

    return filtered;
  }, [query, typeFilter, locationFilter]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Accredited Hospitals, Clinics & Doctors
          </h1>
          <p className="text-blue-100 mt-1">
            Search the full directory of accredited providers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hospitals, clinics or doctors..."
              className="flex-1 rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Hospital">Hospitals</option>
              <option value="Clinic">Clinics</option>
              <option value="Doctor">Doctors</option>
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="rounded-lg bg-white p-0 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Provider
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {results.map((r, i) => (
                <tr key={`${r.name}-${i}`}>
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    {r.notes && (
                      <div className="text-sm text-gray-600 mt-1">
                        {r.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    {r.type}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    {r.location || "—"}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <Link
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
